---
name: git-workflow
description: Create a branch, write commits and open a pull request that follow this repo's conventions in CONTRIBUTING.md. Use when the user asks to start work on an issue, create a branch, commit, push, or open or update a PR.
---

# Git workflow

The rules live in `CONTRIBUTING.md` at the repo root. Read it before you act, and follow it over anything in this file if the two ever differ.

## Start work on an issue

1. Read the issue with `gh issue view <number>` to pick the type and a short description.
2. Update `main`: `git switch main && git pull --ff-only`.
3. Create the branch: `git switch -c <type>/<issue>-<short-description>`. Use 2–5 lowercase words for the description.

If the user is already on a feature branch with work in progress, ask before you switch branches.

## Commit

1. Run `git status` and `git diff` to see what changed. Do not commit files the user did not mean to change, and never commit `.env` files or secrets.
2. Split unrelated changes into separate commits.
3. Write each message as `<type>(<scope>): <subject>`, following the rules in `CONTRIBUTING.md`. Add a body when the reason for the change is not obvious from the subject.

## Open a pull request

1. Push the branch: `git push -u origin <branch>`.
2. Use a title in the commit message format. It becomes the squash commit on `main`.
3. Fill in every section of `.github/pull_request_template.md`. Keep all headings, write `Closes #<number>` or `None` under "Linked issue", and write `N/A` under "Screenshots" for non-UI changes.
4. Create the PR with `gh pr create --base main --title "<title>" --body-file <file>`. Write the body to a temporary file first, so that quotes and newlines survive.
5. Give the user the PR link.

## Before you finish

Check the branch name and PR title against the patterns in `CONTRIBUTING.md`.
