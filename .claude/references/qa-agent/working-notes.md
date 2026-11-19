# Working notes for qa-agent

Things learned on this repo. Update this file when one of them stops being true.

## Environment failures on Windows (not app bugs)

- `pnpm format:check` fails on most files when `core.autocrlf` turns line endings into CRLF. The files in git are LF. Confirm with `pnpm exec prettier --check --end-of-line auto .`.
- The skip-link tests fail on the WebKit and iPhone 13 projects, because WebKit on Windows does not move focus with Tab by default. They fail on the previous `main` too. Real Safari stays ⏳ for a person.
- An axe check can fail once while the theme is switching. Run it again with `--repeat-each=3` before you call it a bug.
- On a new machine, the first `pnpm test:e2e` fails hundreds of tests if Firefox and WebKit are missing. Run `pnpm exec playwright install firefox webkit` once.
- Port 4173 (the Playwright web server) may already be taken by another session. Serve your own build on another port.

## Issues

- There is no project board. Status is open or closed on the issue itself, and devs close their own issues after the PR merges (see "Issue status" in `CONTRIBUTING.md`). Do not add `status: ...` labels.
- When the CI workflow is disabled, a merged commit has no `ci` check run. Say so in the comment instead of counting it as green.
