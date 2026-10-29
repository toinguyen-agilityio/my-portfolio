// All copy, links and image references live here. The person, projects and links below are
// mock demo data for the M1 demo, not real content: Jordan Ellis is a fictional persona and
// every link points to the reserved example.com domain. Each mock block is marked with
// DEMO-CONTENT; replace all of them with the owner's real content in T8a (M3).

export type Profile = {
  name: string;
  greeting: string;
  headline: string;
  bio: string;
  portraitAlt: string;
  projectsCta: string;
  contactCta: string;
};

export type ThumbnailKind = 'kanban' | 'dashboard' | 'components';

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

// DEMO-CONTENT: replace in T8a (M3)
export const profile = {
  name: 'Jordan Ellis',
  greeting: 'Hi, I am Jordan Ellis',
  headline: 'Frontend engineer building fast, accessible web apps',
  bio: 'I design and build web products with React and TypeScript. Right now I am focused on performance, accessibility and clean design systems that teams enjoy using.',
  portraitAlt: 'Portrait of Jordan Ellis',
  projectsCta: 'View projects',
  contactCta: 'Contact me',
} satisfies Profile;

// DEMO-CONTENT: replace in T8a (M3)
export const projects = [
  {
    title: 'Task Flow',
    description:
      'A kanban board with drag and drop, keyboard shortcuts and offline sync. I built the whole frontend.',
    tags: ['React', 'TypeScript', 'Vite'],
    demoUrl: 'https://example.com/demo/task-flow',
    sourceUrl: 'https://example.com/source/task-flow',
    thumbnail: 'kanban',
    thumbnailAlt: 'Task Flow kanban board with three columns of task cards',
  },
  {
    title: 'Weather Now',
    description:
      'A fast weather dashboard with hourly charts and a clean mobile layout. Scores 100 on Lighthouse.',
    tags: ['Next.js', 'Tailwind', 'Charts'],
    demoUrl: 'https://example.com/demo/weather-now',
    sourceUrl: 'https://example.com/source/weather-now',
    thumbnail: 'dashboard',
    thumbnailAlt: 'Weather Now dashboard with a bar chart of the coming hours',
  },
  {
    title: 'Kit UI',
    description:
      'An open source component library focused on accessibility, with full keyboard support and dark mode.',
    tags: ['Design system', 'a11y', 'Storybook'],
    demoUrl: 'https://example.com/demo/kit-ui',
    sourceUrl: 'https://example.com/source/kit-ui',
    thumbnail: 'components',
    thumbnailAlt:
      'Kit UI components: two cards, two buttons, a toggle switch and a text field',
  },
] satisfies readonly Project[];

// DEMO-CONTENT: replace in T8a (M3)
export const skillGroups = [
  {
    name: 'Frontend',
    items: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Accessibility'],
  },
  {
    name: 'Tooling',
    items: ['Git', 'Vite', 'Jest', 'Playwright', 'Figma'],
  },
] satisfies readonly SkillGroup[];

// DEMO-CONTENT: replace in T8a (M3)
export const contact = {
  // Display text only. Build the mailto: link from mailtoHref, never from email.
  email: 'jordan.ellis@example.com',
  // Must be a valid, percent-encoded mailto: URI, e.g. ?subject=Hello%20there.
  mailtoHref: 'mailto:jordan.ellis@example.com?subject=Hello%20Jordan',
  intro: 'Have a project in mind or just want to say hi? Send me an email.',
} satisfies Contact;

// DEMO-CONTENT: replace in T8a (M3)
export const socials = [
  {
    label: 'GitHub',
    href: 'https://example.com/github/jordan-ellis',
  },
  {
    label: 'LinkedIn',
    href: 'https://example.com/linkedin/jordan-ellis',
  },
] satisfies readonly Social[];

// DEMO-CONTENT: replace in T8a (M3)
export const seo = {
  title: 'Jordan Ellis - Frontend Engineer',
  description:
    'Personal portfolio of Jordan Ellis, a frontend engineer: projects, skills and contact details.',
} satisfies Seo;

export type ProjectsSection = {
  title: string;
  intro: string;
  demoLabel: string;
  sourceLabel: string;
};

export const projectsSection = {
  title: 'Projects',
  // DEMO-CONTENT: replace in T8a (M3)
  intro: 'A few things I have built recently.',
  demoLabel: 'Live demo',
  sourceLabel: 'Source',
} satisfies ProjectsSection;

export type ContactSection = {
  title: string;
  emailLabel: string;
};

export const contactSection = {
  title: 'Contact',
  emailLabel: 'Email',
} satisfies ContactSection;

export type SkillsSection = {
  title: string;
  intro: string;
};

export const skillsSection = {
  title: 'Skills',
  // DEMO-CONTENT: replace in T8a (M3)
  intro: 'The tools and practices I reach for every day.',
} satisfies SkillsSection;

export type Footer = {
  builtWith: string;
  demoNotice: string;
  templateLabel: string;
  templateHref: string;
};

export const footer = {
  builtWith: 'Built with Next.js',
  // DEMO-CONTENT: replace or remove when this template becomes a real portfolio
  demoNotice: 'Demo content',
  templateLabel: 'Use this template',
  templateHref: 'https://github.com/toinguyen-agilityio/my-portfolio',
} satisfies Footer;

export type NotFound = {
  eyebrow: string;
  title: string;
  text: string;
  backLabel: string;
};

export const notFound = {
  eyebrow: 'Error 404',
  title: 'Page not found',
  text: 'The page you are looking for does not exist or has moved.',
  backLabel: 'Back to home',
} satisfies NotFound;
