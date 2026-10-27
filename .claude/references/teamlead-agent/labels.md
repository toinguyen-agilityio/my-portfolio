# Labels and status flow

Create missing labels with `gh api -X POST repos/<owner>/<repo>/labels`. Every ticket gets exactly one priority, one size and one status label, plus one or more area labels. Each ticket also goes into the GitHub milestone for its plan milestone, for example `M1 – Local v1`.

| Label | Color | Meaning |
|---|---|---|
| `priority: P0` | `b60205` | Critical path. Blocks other tickets, so do it first |
| `priority: P1` | `d93f0b` | Required for the milestone, can run in parallel |
| `priority: P2` | `fbca04` | Required for the milestone, but nothing waits on it |
| `size: XS` | `ededed` | Up to 2 hours |
| `size: S` | `d4c5f9` | Up to half a day |
| `size: M` | `bfd4f2` | About one day. Anything bigger must be split |
| `area: <part>` | `c5def5` | Part of the codebase: `setup`, `design-system`, `content`, `test`, `ci`, `docs`, `theme`, `layout`, `about`, `projects`, `skills`, `contact`, `seo`, `a11y`, `qa` |
| `status: backlog` | `d4d4d4` | Groomed and ready, not picked up yet |
| `status: todo` | `0e8a16` | Picked up by a dev. Replaces `status: backlog` |

## Status flow

1. The TeamLead creates every ticket with `status: backlog`.
2. A dev picks a ticket, swaps the label to `status: todo` and assigns themselves.
3. Pick-up rules: highest priority first. Only take a ticket whose "Blocked by" tickets are all merged. Follow `CONTRIBUTING.md` for the branch and PR, and put `Closes #<n>` in the PR.
4. The PR closes the ticket on merge.
