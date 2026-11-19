# Labels and status flow

Create missing labels with `gh api repos/<owner>/<repo>/labels -X POST`. Every ticket gets exactly one priority and one size label, plus one or more area labels. Each ticket also goes into the GitHub milestone for its plan milestone, for example `M1 – Local v1`.

| Label | Color | Meaning |
|---|---|---|
| `priority: P0` | `b60205` | Critical path. Blocks other tickets, so do it first |
| `priority: P1` | `d93f0b` | Required for the milestone, can run in parallel |
| `priority: P2` | `fbca04` | Required for the milestone, but nothing waits on it |
| `size: XS` | `ededed` | Up to 2 hours |
| `size: S` | `d4c5f9` | Up to half a day |
| `size: M` | `bfd4f2` | About one day. Anything bigger must be split |
| `area: <part>` | `c5def5` | Part of the codebase: `setup`, `design-system`, `content`, `test`, `ci`, `docs`, `theme`, `layout`, `about`, `projects`, `skills`, `contact`, `seo`, `a11y`, `qa` |

## Status flow

There is no project board. Status is open or closed on the issue itself, not in labels (see "Issue status" in `CONTRIBUTING.md`).

1. The TeamLead creates every ticket as an open issue.
2. A dev picks a ticket and assigns themselves.
3. Pick-up rules: highest priority first. Only take a ticket whose "Blocked by" tickets are all merged. Follow `CONTRIBUTING.md` for the branch and PR, and put `Refs #<n>` under `Refer`.
4. After the PR is merged, the dev closes the ticket with a comment that links the PR. QA only tests at a release.
