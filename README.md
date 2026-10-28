<div align="center">

# My Portfolio

**A clean, minimal, single-page personal portfolio, deployed to a public URL on Vercel.**

Demo: _TBD_ · [Report a bug](https://github.com/toinguyen-agilityio/my-portfolio/issues) · [Request a feature](https://github.com/toinguyen-agilityio/my-portfolio/issues)

</div>

---

## 📑 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Configuration](#-configuration)
- [Project Structure](#-project-structure)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Content Placeholders](#-content-placeholders)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🧐 About

A personal portfolio that introduces the owner, shows their projects and skills, and gives visitors an easy way to get in touch. It is a single English page, hosted on Vercel's default URL.

Scope and requirements come from the plan in [#3](https://github.com/toinguyen-agilityio/my-portfolio/issues/3).

<!-- Add a screenshot once the first version is deployed. -->

## ✨ Features

- 🚧 **Sections:** About, Projects, Skills, Contact.
- 🚧 **Language:** English only.
- 🚧 **Dark mode:** manual toggle. Follows the system preference on first visit, remembers the choice across reloads, and shows no flash of the wrong theme on load.
- 🚧 **Contact:** visible email address with a `mailto:` link, plus GitHub and LinkedIn links that open in a new tab. No contact form.
- 🚧 **Responsive:** works from 320px wide, with no horizontal scroll.
- 🚧 **Accessibility and SEO:** keyboard navigation, acceptable contrast, alt text, accessible link names, page title, meta description and a 404 page.

**Supported browsers:** the last 2 versions of Chrome, Safari and Firefox, plus iOS Safari and Android Chrome.

## 🛠 Tech Stack

| Layer     | Technology                                                  |
|-----------|-------------------------------------------------------------|
| Framework | [Next.js](https://nextjs.org) (App Router, static export) with TypeScript |
| Styling   | [Tailwind CSS](https://tailwindcss.com) v4, colors as CSS variables |
| Testing   | [Playwright](https://playwright.dev) with [axe-core](https://github.com/dequelabs/axe-core) |
| Hosting   | Vercel                                                      |

## 🚀 Getting Started

### Prerequisites

- Node.js 22 (see `.nvmrc`)
- [pnpm](https://pnpm.io) (the exact version is pinned in `packageManager` in `package.json`; `corepack enable` installs it)

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/toinguyen-agilityio/my-portfolio.git
cd my-portfolio

# 2. Install dependencies
pnpm install
```

### Run it

```bash
pnpm dev     # dev server with hot reload
pnpm build   # production build, written to out/
pnpm start   # serve out/ (run pnpm build first)
```

Open <http://localhost:3000> and you should see the portfolio page.

**Check it on your phone (optional).** Run `pnpm dev --hostname 0.0.0.0` and open `http://<your-computer-ip>:3000` on a phone on the same Wi-Fi.

## ⚙️ Configuration

_TBD. List environment variables here if the app needs any._

| Variable | Required | Default | Description |
|----------|:--------:|---------|-------------|
| TBD      |          |         |             |

> ⚠️ Never commit your `.env` file.

## 📁 Project Structure

```text
my-portfolio/
├── .claude/       # shared Claude Code config (see .claude/README.md)
├── .github/       # workflows and CODEOWNERS
├── src/
│   ├── app/       # Next.js App Router: layout, page, global CSS, icons
│   ├── components/ # React components
│   └── content.ts # all copy, links and image references
├── tests/         # Playwright tests and helpers
└── README.md
```

## 🧪 Testing

```bash
pnpm lint            # ESLint
pnpm format:check    # Prettier (pnpm format fixes it)
pnpm typecheck       # tsc --noEmit
pnpm exec playwright install --with-deps   # once: download the browsers
pnpm test:e2e        # build, serve out/ and run the Playwright tests
pnpm exec playwright show-report           # open the HTML report of the last run
```

`pnpm test:e2e` runs against the production build in `out/` on Chromium, WebKit, Firefox and two mobile emulations.

## 📦 Deployment

Deployed to Vercel on the default Vercel URL. _Setup steps to be added._

```bash
# TBD   # build
```

## 🏷 Content Placeholders

v1 ships with placeholder text, images and links. Every placeholder is marked with `[PLACEHOLDER]`, including image alt text, the page title, the meta description and link targets.

Before launch, search the repo for `[PLACEHOLDER]`. Launch requires the search to return nothing.

## 🗺 Roadmap

**v1**

- [ ] Project setup and Vercel deploy
- [ ] Layout and dark mode
- [ ] About, Projects, Skills and Contact sections
- [ ] Accessibility, page title and meta, 404 page
- [ ] Placeholder audit and QA
- [ ] Launch on a public Vercel URL

**Phase 2**

- [ ] Experience and Education sections
- [ ] Contact form
- [ ] Vietnamese version
- [ ] Custom domain
- [ ] Open Graph social preview
- [ ] Performance budget

See [open issues](https://github.com/toinguyen-agilityio/my-portfolio/issues) for the full list.

## 🤝 Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md) before you start. It sets the format for branch names, commit messages and pull requests.

1. Pick a story from the [issues](https://github.com/toinguyen-agilityio/my-portfolio/issues).
2. Create a branch from `main`, for example `git switch -c feat/12-dark-mode-toggle`.
3. Commit with [Conventional Commits](https://www.conventionalcommits.org) messages and push the branch.
4. Open a pull request to `main` and fill in the PR template.

With Claude Code, run `/git-workflow` to do these steps in the right format.

Mention `@claude` on a PR or issue to ask Claude for help or a review (allowed users only).

## 📄 License

_TBD._
