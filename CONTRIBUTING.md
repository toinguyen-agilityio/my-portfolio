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
- **Description:** fill in every section of the [PR template](.github/pull_request_template.md). Do not delete the headings.
- **Linked issue:** write `Closes #<number>` so the issue closes on merge. Write `None` if there is no issue.
- **Size:** keep one story or one fix per PR.
- **Review:** at least one approval before merge. Changes covered by `.github/CODEOWNERS` need the repo owner's approval.

## Working with Claude

Claude follows this file through `CLAUDE.md`. To create a branch, commit or open a PR with Claude, run `/git-workflow` or just ask, for example "commit this" or "open a PR for issue 12".
