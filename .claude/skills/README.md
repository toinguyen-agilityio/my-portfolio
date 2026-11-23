# Skills

Reusable workflows that Claude can run on request or pick up on its own.

| Skill | What it does |
|-------|--------------|
| `git-workflow` | Creates branches, commits and PRs in the format from `CONTRIBUTING.md` |
| `my-qa-release-report` | Builds the one-page HTML QA release report (cases by issue, expected vs actual, screenshot evidence) from a `report.json` and publishes it |

## Add a skill

1. Create a folder in kebab-case: `.claude/skills/<skill-name>/`.
2. Add `SKILL.md` with frontmatter:

   ```markdown
   ---
   name: <skill-name>
   description: <what it does and when to use it>
   ---

   # <Skill name>

   <steps Claude follows>
   ```

3. Put templates and long checklists in `.claude/skills/<skill-name>/references/` and link them from `SKILL.md`.
4. Open a PR. See `CLAUDE.md` for the rules.
