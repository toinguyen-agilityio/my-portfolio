#!/usr/bin/env bash
# Move an issue to one status label and remove every other `status: ...` label.
# Used by the issue-status workflow and by Claude through the git-workflow skill.
#
# Usage: set-issue-status.sh <issue-number> "<status: label>"
set -euo pipefail

issue="${1:?issue number required}"
new="${2:?status label required}"

case "$new" in
  "status: backlog" | "status: todo" | "status: in progress" | "status: in review" | "status: qa" | "status: done") ;;
  *) echo "Unknown status label: $new" >&2; exit 1 ;;
esac

args=(--add-label "$new")
while IFS= read -r label; do
  [ -n "$label" ] && [ "$label" != "$new" ] && args+=(--remove-label "$label")
done < <(gh issue view "$issue" --json labels --jq '.labels[].name | select(startswith("status: "))')

gh issue edit "$issue" "${args[@]}"
echo "#$issue -> $new"
