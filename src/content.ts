// All copy, links and image references live here. The person, projects and links below are
// this template's demo data, not real content: Jordan Nguyen is a fictional, permanent demo
// persona, and every link points to the reserved example.com domain. Each demo block is
// marked with DEMO-CONTENT; replace or remove all of them with your own content.

export type Profile = {
  name: string;
  navName: string;
  greeting: string;
  headline: string;
  bio: string;
  portraitAlt: string;
  projectsCta: string;
  contactCta: string;
};

export type ThumbnailKind = 'kanban' | 'dashboard' | 'components';

export type Project = {
  slug: string;
  title: string;
  description: string;
  tags: readonly string[];
  demoUrl: string;
  sourceUrl: string;
  thumbnail: ThumbnailKind;
  thumbnailAlt: string;
  // Long text and bullet points shown on the project's detail page.
  overview: string;
  highlights: readonly string[];
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

// DEMO-CONTENT: replace with your own content
export const profile = {
  name: 'Jordan Nguyen',
  navName: 'Jordan Nguyen',
  greeting: 'Hi, I am Jordan Nguyen',
  headline: 'Frontend engineer building fast, accessible web apps',
  bio: 'I design and build web products with React and TypeScript. Right now I am focused on performance, accessibility and clean design systems that teams enjoy using.',
  portraitAlt: 'Portrait of Jordan Nguyen',
  projectsCta: 'View projects',
  contactCta: 'Contact me',
} satisfies Profile;

// DEMO-CONTENT: replace with your own content
export const projects = [
  {
    slug: 'task-flow',
    title: 'Task Flow',
    description:
      'A kanban board with drag and drop, keyboard shortcuts and offline sync. I built the whole frontend.',
    tags: ['React', 'TypeScript', 'Vite'],
    demoUrl: 'https://example.com/demo/task-flow',
    sourceUrl: 'https://github.com/example/task-flow',
    thumbnail: 'kanban',
    thumbnailAlt: 'Task Flow kanban board with three columns of task cards',
    overview:
      'Task Flow started as a way to plan my own side projects and grew into a full kanban app. Cards move between columns with the mouse or the keyboard, and changes made offline are synced when the connection returns.',
    highlights: [
      'Drag and drop with a full keyboard alternative',
      'Offline-first sync with conflict handling',
      'Built the whole frontend in React and TypeScript',
    ],
  },
  {
    slug: 'weather-now',
    title: 'Weather Now',
    description:
      'A fast weather dashboard with hourly charts and a clean mobile layout. Scores 100 on Lighthouse.',
    tags: ['Next.js', 'Tailwind', 'Charts'],
    demoUrl: 'https://example.com/demo/weather-now',
    sourceUrl: 'https://github.com/example/weather-now',
    thumbnail: 'dashboard',
    thumbnailAlt: 'Weather Now dashboard with a bar chart of the coming hours',
    overview:
      'Weather Now shows the current conditions and an hourly forecast on one screen. It is built to load fast on slow phones, with a layout that adapts from small mobile screens to wide desktops.',
    highlights: [
      'Hourly bar charts that stay readable on mobile',
      'Scores 100 on Lighthouse',
      'Static pages with Tailwind for tiny CSS',
    ],
  },
  {
    slug: 'kit-ui',
    title: 'Kit UI',
    description:
      'An open source component library focused on accessibility, with full keyboard support and dark mode.',
    tags: ['Design system', 'a11y', 'Storybook'],
    demoUrl: 'https://example.com/demo/kit-ui',
    sourceUrl: 'https://github.com/example/kit-ui',
    thumbnail: 'components',
    thumbnailAlt:
      'Kit UI components: two cards, two buttons, a toggle switch and a text field',
    overview:
      'Kit UI is an open source component library with accessibility as its first requirement. Every component is documented in Storybook and works with a keyboard and a screen reader.',
    highlights: [
      'Full keyboard support in every component',
      'Light and dark themes from design tokens',
      'Documented and tested in Storybook',
    ],
  },
] satisfies readonly Project[];

// DEMO-CONTENT: replace with your own content
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

// DEMO-CONTENT: replace with your own content
export const contact = {
  // Display text only. Build the mailto: link from mailtoHref, never from email.
  email: 'jordan.ellis@example.com',
  // Must be a valid, percent-encoded mailto: URI, e.g. ?subject=Hello%20there.
  mailtoHref: 'mailto:jordan.ellis@example.com?subject=Hello%20Jordan',
  intro: 'Have a project in mind or just want to say hi? Send me an email.',
} satisfies Contact;

// DEMO-CONTENT: replace with your own content
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

// DEMO-CONTENT: replace with your own content
export const seo = {
  title: 'Jordan Nguyen - Frontend Engineer',
  description:
    'Personal portfolio of Jordan Nguyen, a frontend engineer: projects, skills and contact details.',
} satisfies Seo;

export type ProjectsSection = {
  title: string;
  intro: string;
  demoLabel: string;
  sourceLabel: string;
  detailsLabel: string;
  backLabel: string;
  highlightsTitle: string;
  linksTitle: string;
};

export const projectsSection = {
  title: 'Projects',
  // DEMO-CONTENT: replace with your own content
  intro: 'A few things I have built recently.',
  demoLabel: 'Live demo',
  sourceLabel: 'Source',
  detailsLabel: 'View details',
  backLabel: 'Back to projects',
  highlightsTitle: 'Highlights',
  linksTitle: 'Links',
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
  // DEMO-CONTENT: replace with your own content
  intro: 'The tools and practices I reach for every day.',
} satisfies SkillsSection;

export type Footer = {
  builtWith: string;
  demoNotice: string;
  templateLabel: string;
  templateHref: string;
  separator: string;
};

export const footer = {
  builtWith: 'Built with Next.js',
  // DEMO-CONTENT: replace or remove when this template becomes a real portfolio
  demoNotice: 'Demo content',
  templateLabel: 'Use this template',
  templateHref: 'https://github.com/toinguyen-agilityio/my-portfolio',
  separator: '·',
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

// DEMO-CONTENT: replace with your own content
export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  // Root-relative. The header adds the base path when the site is served from a subpath.
  { label: 'My Story', href: '/story' },
  { label: 'Contact', href: '#contact' },
] satisfies readonly NavLink[];

export type NavLink = {
  label: string;
  href: string;
};

export type StoryImageKind = 'graduation' | 'travel' | 'sport' | 'photography';

export type StoryImage = {
  kind: StoryImageKind;
  alt: string;
};

export type StoryEntry = {
  year: string;
  title: string;
  text: string;
  image?: StoryImage;
};

export type Hobby = {
  // URL segment of the category page: /story/<slug>. Posts live in content/story/<slug>/.
  slug: string;
  title: string;
  text: string;
  tags: readonly string[];
  image?: StoryImage;
};

export type StoryJourney = {
  eyebrow: string;
  title: string;
  intro: string;
  entries: readonly StoryEntry[];
};

export type StoryHobbies = {
  title: string;
  intro: string;
  items: readonly Hobby[];
};

export type StoryCta = {
  title: string;
  text: string;
  contactLabel: string;
  projectsLabel: string;
};

export type StorySection = {
  eyebrow: string;
  title: string;
  lead: string;
  portraitAlt: string;
  backLabel: string;
  journey: StoryJourney;
  hobbies: StoryHobbies;
  cta: StoryCta;
  seo: Seo;
};

// DEMO-CONTENT: replace with your own content
export const storySection = {
  eyebrow: 'My story',
  title: 'How I got here',
  lead: 'I started by drawing interfaces on paper and never stopped. Here is the road from my first computer to shipping products with a team.',
  portraitAlt: 'Portrait of Jordan Nguyen',
  backLabel: '← Back to home',
  journey: {
    eyebrow: 'Journey',
    title: 'The road so far',
    intro: 'The moments that shaped how I build software today.',
    entries: [
      {
        year: '2015',
        title: 'First steps in code',
        text: 'I finished school with a design degree and taught myself HTML and CSS on a secondhand laptop. My first site was a fan page with a very slow photo gallery.',
        image: {
          kind: 'graduation',
          alt: 'Illustration of a graduation cap and a laptop',
        },
      },
      {
        year: '2018',
        title: 'Joining my first product team',
        text: 'I joined a small agency as a junior frontend developer. I learned React, code review and what it takes to ship a feature every week.',
      },
      {
        year: '2021',
        title: 'Owning the frontend',
        text: 'I led the frontend of a booking app used by a few thousand people. I set up a shared design system and cut the page load time in half.',
        image: {
          kind: 'travel',
          alt: 'Illustration of a suitcase and a paper plane',
        },
      },
      {
        year: '2024',
        title: 'Building for everyone',
        text: 'Today I focus on performance and accessibility. I mentor junior developers and help teams make their interfaces usable with a keyboard and a screen reader.',
        image: {
          kind: 'photography',
          alt: 'Illustration of a camera with a lens and a flash',
        },
      },
    ],
  },
  hobbies: {
    title: 'Beyond work',
    intro: 'Away from the keyboard, these are the things I do to recharge.',
    items: [
      {
        slug: 'travel',
        title: 'Travel',
        text: 'I plan trips around local food and slow train rides. Every new city gives me ideas for the next interface I build.',
        tags: ['City walks', 'Local food', 'Trains'],
        image: {
          kind: 'travel',
          alt: 'Illustration of a suitcase and a map pin',
        },
      },
      {
        slug: 'sport',
        title: 'Sport',
        text: 'I run three mornings a week and play badminton on weekends. Sport teaches me to keep going when a problem is hard.',
        tags: ['Running', 'Badminton'],
        image: {
          kind: 'sport',
          alt: 'Illustration of running shoes and a badminton racket',
        },
      },
      {
        slug: 'photography',
        title: 'Photography',
        text: 'I take photos on a film camera and love the slow process of waiting for prints. It keeps me focused on light and framing.',
        tags: ['Film', 'Street'],
        image: {
          kind: 'photography',
          alt: 'Illustration of a film camera',
        },
      },
    ],
  },
  cta: {
    title: 'Let us build something together',
    text: 'I am open to frontend roles and to projects where accessibility and performance matter.',
    contactLabel: 'Contact me',
    projectsLabel: 'View projects',
  },
  seo: {
    title: 'My Story - Jordan Nguyen',
    description:
      'The story of Jordan Nguyen, a frontend engineer: the journey so far and the hobbies that keep them going.',
  },
} satisfies StorySection;

export type StoryBlog = {
  readStories: string;
  // "{title}" is replaced with the hobby title.
  cardLabel: string;
  backToStory: string;
  backToCategory: string;
  postsTitle: string;
  empty: string;
  readMore: string;
  minRead: string;
  gallery: string;
  prev: string;
  next: string;
  postNav: string;
};

// DEMO-CONTENT: replace with your own content
export const storyBlog = {
  readStories: 'Read stories →',
  cardLabel: '{title}: read stories',
  backToStory: '← Back to My story',
  backToCategory: '← Back to {title}',
  postsTitle: 'Stories',
  empty: 'No stories here yet. Check back soon.',
  readMore: 'Read story',
  minRead: 'min read',
  gallery: 'Photo gallery',
  prev: '← Previous',
  next: 'Next →',
  postNav: 'More stories',
} satisfies StoryBlog;
