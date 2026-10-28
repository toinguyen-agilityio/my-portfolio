#!/usr/bin/env bash
# Moves issues back to the "QA" status, and reopens them, when they reach Done
# without a QA comment that has an image or a video.
#
# Env: GH_TOKEN (needs repo + project scopes), PROJECT_OWNER, PROJECT_NUMBER,
#      REPO (owner/name), DRY_RUN=1 to only print what would change.
set -euo pipefail

: "${PROJECT_OWNER:?}" "${PROJECT_NUMBER:?}" "${REPO:?}"
MARKER='<!-- qa-gate -->'
SKIP_LABELS='^(epic|plan)$'
MEDIA_RE='user-attachments/(assets|files)/|!\[[^]]*\]\(|<img|<video|\.(png|jpe?g|gif|webp|mp4|mov|webm)([?)[:space:]]|$)'

project=$(gh api graphql -F login="$PROJECT_OWNER" -F num="$PROJECT_NUMBER" -f query='
query($login: String!, $num: Int!) {
  user(login: $login) { projectV2(number: $num) {
    id
    field(name: "Status") { ... on ProjectV2SingleSelectField { id options { id name } } }
  } }
}')
project_id=$(jq -r '.data.user.projectV2.id' <<<"$project")
field_id=$(jq -r '.data.user.projectV2.field.id' <<<"$project")
qa_option=$(jq -r '.data.user.projectV2.field.options[] | select(.name == "QA") | .id' <<<"$project")

# One JSON object per line for every issue item in this repo
items=$(gh api graphql --paginate -F login="$PROJECT_OWNER" -F num="$PROJECT_NUMBER" -f query='
query($login: String!, $num: Int!, $endCursor: String) {
  user(login: $login) { projectV2(number: $num) {
    items(first: 50, after: $endCursor) {
      pageInfo { hasNextPage endCursor }
      nodes {
        id
        status: fieldValueByName(name: "Status") { ... on ProjectV2ItemFieldSingleSelectValue { name } }
        content { ... on Issue {
          number state stateReason
          repository { nameWithOwner }
          labels(first: 20) { nodes { name } }
          comments(last: 100) { nodes { body } }
        } }
      }
    }
  } }
}' --jq '.data.user.projectV2.items.nodes[] | select(.content.number != null)')

has_evidence() {
  # A comment counts when it mentions QA and contains an image or a video
  jq -r '.content.comments.nodes[].body | @base64' <<<"$1" | while read -r b64; do
    body=$(base64 -d <<<"$b64")
    if grep -qiw 'qa' <<<"$body" && grep -qiE "$MEDIA_RE" <<<"$body"; then
      echo yes
      break
    fi
  done
}

while read -r item; do
  [ -z "$item" ] && continue
  [ "$(jq -r '.content.repository.nameWithOwner' <<<"$item")" = "$REPO" ] || continue
  jq -r '.content.labels.nodes[].name' <<<"$item" | grep -qE "$SKIP_LABELS" && continue

  number=$(jq -r '.content.number' <<<"$item")
  status=$(jq -r '.status.name // ""' <<<"$item")
  state=$(jq -r '.content.state' <<<"$item")
  reason=$(jq -r '.content.stateReason // ""' <<<"$item")

  # Gate items marked Done, and issues closed as completed that are not yet past Done
  if [ "$status" != "Done" ] && ! { [ "$state" = CLOSED ] && [ "$reason" = COMPLETED ] && [ "$status" != "Released" ] && [ "$status" != "QA" ]; }; then
    continue
  fi
  [ -n "$(has_evidence "$item")" ] && continue

  echo "#$number: no QA image or video (status '$status', $state) -> QA"
  [ "${DRY_RUN:-}" = 1 ] && continue

  gh project item-edit --project-id "$project_id" --id "$(jq -r '.id' <<<"$item")" \
    --field-id "$field_id" --single-select-option-id "$qa_option" >/dev/null
  [ "$state" = CLOSED ] && gh issue reopen "$number" --repo "$REPO" >/dev/null
  if ! jq -r '.content.comments.nodes[].body' <<<"$item" | grep -qF "$MARKER"; then
    gh issue comment "$number" --repo "$REPO" --body "$MARKER
Moved back to **QA**: a ticket can only be Done after a comment that mentions QA and includes a screenshot or a video. Add that comment, then close the issue again."
  fi
done <<<"$items"
