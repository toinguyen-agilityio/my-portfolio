// All copy, links and image references live here. Every value except the
// owner's name is a placeholder marked with [PLACEHOLDER] until M3 content replacement.

export type Profile = {
  name: string;
  greeting: string;
  headline: string;
  bio: string;
  portraitAlt: string;
};

export type ThumbnailKind = "kanban" | "dashboard" | "components";

export type Project = {
  title: string;
  description: string;
  tags: readonly string[];
  demoUrl: string;
  sourceUrl: string;
  thumbnail: ThumbnailKind;
  thumbnailAlt: string;
};

export type SkillGroup = {
  name: string;
  items: readonly string[];
};

export type Contact = {
  email: string;
  mailtoHref: string;
  intro: string;
};

export type Social = {
  label: string;
  href: string;
};

export type Seo = {
  title: string;
  description: string;
};

export const profile = {
  name: "Huy Pham",
  greeting: "[PLACEHOLDER] Hi, I am Huy Pham",
  headline: "[PLACEHOLDER] Frontend engineer building fast, accessible web apps",
  bio: "[PLACEHOLDER] I design and build web products with React and TypeScript. Right now I am focused on performance, accessibility and clean design systems that teams enjoy using.",
  portraitAlt: "[PLACEHOLDER] Portrait of Huy Pham",
} satisfies Profile;

export const projects = [
  {
    title: "[PLACEHOLDER] Task Flow",
    description:
      "[PLACEHOLDER] A kanban board with drag and drop, keyboard shortcuts and offline sync. I built the whole frontend.",
    tags: ["[PLACEHOLDER] React", "[PLACEHOLDER] TypeScript", "[PLACEHOLDER] Vite"],
    demoUrl: "https://example.com/?ph=[PLACEHOLDER]",
    sourceUrl: "https://example.com/?ph=[PLACEHOLDER]",
    thumbnail: "kanban",
    thumbnailAlt: "[PLACEHOLDER] Screenshot of Task Flow",
  },
  {
    title: "[PLACEHOLDER] Weather Now",
    description:
      "[PLACEHOLDER] A fast weather dashboard with hourly charts and a clean mobile layout. Scores 100 on Lighthouse.",
    tags: ["[PLACEHOLDER] Next.js", "[PLACEHOLDER] Tailwind", "[PLACEHOLDER] Charts"],
    demoUrl: "https://example.com/?ph=[PLACEHOLDER]",
    sourceUrl: "https://example.com/?ph=[PLACEHOLDER]",
    thumbnail: "dashboard",
    thumbnailAlt: "[PLACEHOLDER] Screenshot of Weather Now",
  },
  {
    title: "[PLACEHOLDER] Kit UI",
    description:
      "[PLACEHOLDER] An open source component library focused on accessibility, with full keyboard support and dark mode.",
    tags: ["[PLACEHOLDER] Design system", "[PLACEHOLDER] a11y", "[PLACEHOLDER] Storybook"],
    demoUrl: "https://example.com/?ph=[PLACEHOLDER]",
    sourceUrl: "https://example.com/?ph=[PLACEHOLDER]",
    thumbnail: "components",
    thumbnailAlt: "[PLACEHOLDER] Screenshot of Kit UI",
  },
] satisfies readonly Project[];

export const skillGroups = [
  {
    name: "[PLACEHOLDER] Frontend",
    items: [
      "[PLACEHOLDER] React",
      "[PLACEHOLDER] TypeScript",
      "[PLACEHOLDER] Next.js",
      "[PLACEHOLDER] Tailwind CSS",
      "[PLACEHOLDER] Accessibility",
    ],
  },
  {
    name: "[PLACEHOLDER] Tooling",
    items: [
      "[PLACEHOLDER] Git",
      "[PLACEHOLDER] Vite",
      "[PLACEHOLDER] Jest",
      "[PLACEHOLDER] Playwright",
      "[PLACEHOLDER] Figma",
    ],
  },
] satisfies readonly SkillGroup[];

export const contact = {
  email: "placeholder@example.com [PLACEHOLDER]",
  mailtoHref: "mailto:placeholder@example.com?subject=[PLACEHOLDER]",
  intro: "[PLACEHOLDER] Have a project in mind or just want to say hi? Send me an email.",
} satisfies Contact;

export const socials = [
  { label: "[PLACEHOLDER] GitHub", href: "https://example.com/?ph=[PLACEHOLDER]" },
  { label: "[PLACEHOLDER] LinkedIn", href: "https://example.com/?ph=[PLACEHOLDER]" },
] satisfies readonly Social[];

export const seo = {
  title: "[PLACEHOLDER] Huy Pham - Portfolio",
  description:
    "[PLACEHOLDER] Personal portfolio of Huy Pham, a frontend engineer: projects, skills and contact details.",
} satisfies Seo;
