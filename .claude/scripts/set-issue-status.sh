#!/usr/bin/env bash
# Sets the Status of an issue on the "my-portfolio" project board: set-issue-status.sh <issue-number> "<status>"
set -euo pipefail

OWNER=toinguyen-agilityio
PROJECT=3
issue=${1:?usage: set-issue-status.sh <issue-number> "<status>"}
status=${2:?usage: set-issue-status.sh <issue-number> "<status>"}

repo=$(gh repo view --json nameWithOwner -q .nameWithOwner)
project_id=$(gh project view "$PROJECT" --owner "$OWNER" --format json -q .id)
read -r field_id option_id < <(gh project field-list "$PROJECT" --owner "$OWNER" --format json \
  -q ".fields[] | select(.name == \"Status\") | \"\(.id) \(.options[] | select(.name == \"$status\") | .id)\"") || true
if [ -z "${option_id:-}" ]; then
  echo "Unknown status '$status'" >&2
  exit 1
fi

# item-add returns the existing item when the issue is already on the board
item_id=$(gh project item-add "$PROJECT" --owner "$OWNER" --url "https://github.com/$repo/issues/$issue" --format json -q .id)
gh project item-edit --project-id "$project_id" --id "$item_id" --field-id "$field_id" --single-select-option-id "$option_id" >/dev/null
echo "#$issue -> $status"
