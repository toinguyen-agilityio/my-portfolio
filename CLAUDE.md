# CLAUDE.md

Shared instructions for Claude Code in this repo. Project context lives in `README.md`.

## Claude config layout

Shared files are committed and reviewed through PRs. Personal files are gitignored.

```
CLAUDE.md                  # shared: project rules for Claude (this file)
CLAUDE.local.md            # personal, gitignored
.mcp.json                  # shared MCP servers, if any (no secrets)
.claude/
├── settings.json          # shared: permissions, hooks, non-secret env
├── settings.local.json    # personal, gitignored
├── agents/                # subagents, one file per role (ba-agent.md, po-agent.md)
├── references/<agent>/    # templates and formats an agent reads on demand
├── skills/<name>/         # reusable workflows: SKILL.md + references/
├── rules/                 # rules scoped to parts of the codebase
└── hooks/                 # scripts that settings.json hooks call
```

## Rules for changing Claude config

- Put anything the whole team relies on in the shared files. Put personal preferences, machine paths and keys in `*.local.*` files or `~/.claude/`.
- Never commit secrets. Use GitHub secrets for workflows and environment variables (for example `${GITHUB_TOKEN}`) in `.mcp.json`.
- Name agents and skills in kebab-case, one job each, with a `description` that says when to use it.
- Keep agent files short. Move templates and long formats to `.claude/references/<agent>/` and link them from the agent.
- Open a PR for every change under `.claude/`, `CLAUDE.md`, `.mcp.json` or the Claude workflow. `CODEOWNERS` requires the repo owner's review.
