# Contributing

Every dev, and every Claude session, follows these rules. Reviewers check branch names, PR titles and PR descriptions before they approve.

## Types

Branches, commits and PR titles share one list of types:

| Type | Use for |
|------|---------|
| `feat` | A new feature or user-visible behavior |
| `fix` | A bug fix |
| `docs` | Documentation only |
| `style` | Formatting or visual polish with no logic change |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `test` | Adding or fixing tests |
| `chore` | Tooling, config, dependencies, Claude config |
| `ci` | GitHub Actions and other CI config |

## Branch names

```
<type>/<issue>-<short-description>
```

- Lowercase kebab-case, for example `feat/12-dark-mode-toggle` or `fix/18-contact-link-target`.
- Include the issue number when there is one. Without an issue, use `<type>/<short-description>`, for example `chore/update-readme`.
- Always branch from the latest `main`.

Branches made by the Claude GitHub Action (`claude/...`) and Dependabot (`dependabot/...`) are exempt.

## Commit messages

Follow [Conventional Commits](https://www.conventionalcommits.org):

```
<type>(<optional-scope>): <subject>

<optional body: what changed and why>
```

- The subject is in the imperative mood, starts with a lowercase letter, has no trailing period, and the whole first line is at most 72 characters.
- The scope is the area you touched, in lowercase kebab-case, for example `contact`, `layout` or `agents`.
- Add `!` after the type or scope for a breaking change, for example `feat(layout)!: drop legacy grid`.

Examples:

```
feat(contact): add mailto link and visible email
fix(theme): prevent flash of wrong theme on load
docs: add install steps to README
chore(agents): move BA templates into reference files
```

## Pull requests

- **Title:** uses the commit message format above. PRs are squash-merged, so the title becomes the commit on `main`.
- **Description:** follow the [PR template](.github/pull_request_template.md): `Why`, `Summary`, `Evidence`, `How to test` and `Refer`. Do not delete the headings.
- **Evidence:** show that the change works, for example test output or screenshots. If something was not checked, say so and say why.
- **Refer:** write `Refs #<number>` under `Refer` so the workflow can move the issue. Do not use `Closes`: the issue stays open for QA after merge. Delete that line if there is no issue.
- **Size:** keep one story or one fix per PR.
- **Review:** at least one approval before merge. Changes covered by `.github/CODEOWNERS` need the repo owner's approval.

## Issue status

Every issue has exactly one `status: ...` label. Moving to a new status removes the old one.

| Status | When | Who moves it |
|--------|------|--------------|
| `status: backlog` | Groomed, not planned yet | PO |
| `status: todo` | Planned for the current work | PO or dev |
| `status: in progress` | A dev picks up a `backlog` or `todo` issue and assigns themselves | Dev, or Claude when it starts work on the issue |
| `status: in review` | A PR that refers to the issue is open and not a draft | `issue-status` workflow |
| `status: qa` | The PR is merged | `issue-status` workflow |
| `status: done` | QA has checked the change on `main` | QA; the workflow then closes the issue |

If QA finds a problem, move the issue back to `status: in progress`.

To change a status by hand, use the GitHub UI or:

```
bash .github/scripts/set-issue-status.sh <issue> "status: in progress"
```

## Working with Claude

Claude follows this file through `CLAUDE.md`. To create a branch, commit or open a PR with Claude, run `/git-workflow` or just ask, for example "commit this" or "open a PR for issue 12".
