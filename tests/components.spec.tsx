import { readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { expect, test } from '@playwright/test';
import { renderToStaticMarkup } from 'react-dom/server';
import { Button } from '@/components/Button';
import { Chip } from '@/components/Chip';
import { ExternalLink } from '@/components/ExternalLink';
import { Section } from '@/components/Section';
import { StoryImage } from '@/components/story/StoryImage';
import { Tag } from '@/components/Tag';
import { storySection, type StoryImageKind } from '../src/content';
import {
  disableTransitions,
  expectNoA11yViolations,
  expectNoHorizontalScroll,
  setTheme,
} from './helpers';

// Components are rendered to static HTML on the Node side and loaded into the page,
// so no route has to use them yet.
test('ExternalLink opens a new tab safely and says so in its name', async ({
  page,
}) => {
  await page.setContent(
    renderToStaticMarkup(
      <ExternalLink href="https://example.com/">GitHub</ExternalLink>,
    ),
  );
  const link = page.getByRole('link', {
    name: 'GitHub (opens in a new tab)',
  });
  await expect(link).toHaveAttribute('target', '_blank');
  await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
});

test('Button is a plain in-page link', async ({ page }) => {
  await page.setContent(
    renderToStaticMarkup(
      <Button href="#projects" variant="secondary">
        View
      </Button>,
    ),
  );
  const button = page.getByRole('link', { name: 'View' });
  await expect(button).toHaveAttribute('href', '#projects');
});

test('Button prefixes a root-relative href with NEXT_PUBLIC_BASE_PATH', async ({
  page,
}) => {
  const original = process.env.NEXT_PUBLIC_BASE_PATH;
  process.env.NEXT_PUBLIC_BASE_PATH = '/my-portfolio';
  try {
    await page.setContent(
      renderToStaticMarkup(<Button href="/">Back to home</Button>),
    );
  } finally {
    // Never leak into another test, whichever branch runs.
    if (original === undefined) delete process.env.NEXT_PUBLIC_BASE_PATH;
    else process.env.NEXT_PUBLIC_BASE_PATH = original;
  }
  const button = page.getByRole('link', { name: 'Back to home' });
  await expect(button).toHaveAttribute('href', '/my-portfolio/');
});

test('Button leaves a root-relative href as-is with no base path set', async ({
  page,
}) => {
  const original = process.env.NEXT_PUBLIC_BASE_PATH;
  delete process.env.NEXT_PUBLIC_BASE_PATH;
  try {
    await page.setContent(
      renderToStaticMarkup(<Button href="/">Back to home</Button>),
    );
  } finally {
    if (original !== undefined) process.env.NEXT_PUBLIC_BASE_PATH = original;
  }
  const button = page.getByRole('link', { name: 'Back to home' });
  await expect(button).toHaveAttribute('href', '/');
});

test('Button does not prefix a protocol-relative href', async ({ page }) => {
  const original = process.env.NEXT_PUBLIC_BASE_PATH;
  process.env.NEXT_PUBLIC_BASE_PATH = '/my-portfolio';
  try {
    await page.setContent(
      renderToStaticMarkup(<Button href="//example.com">Away</Button>),
    );
  } finally {
    if (original === undefined) delete process.env.NEXT_PUBLIC_BASE_PATH;
    else process.env.NEXT_PUBLIC_BASE_PATH = original;
  }
  const button = page.getByRole('link', { name: 'Away' });
  await expect(button).toHaveAttribute('href', '//example.com');
});

test('Section is a landmark named by its H2', async ({ page }) => {
  await page.setContent(
    renderToStaticMarkup(
      <Section id="skills" title="Skills" intro="What I use" tone="surface">
        <ul>
          <Chip>React</Chip>
          <Tag>a11y</Tag>
        </ul>
      </Section>,
    ),
  );
  await expect(page.getByRole('region', { name: 'Skills' })).toHaveAttribute(
    'id',
    'skills',
  );
  await expect(page.getByRole('heading', { level: 2 })).toHaveText('Skills');
  await expect(page.getByRole('listitem')).toHaveText(['React', 'a11y']);
});

const storyImageKinds: StoryImageKind[] = [
  'graduation',
  'travel',
  'sport',
  'photography',
];
const storyRoot = resolve(__dirname, '../src/components/story');
const storyImagesFromContent = [
  ...storySection.journey.entries.flatMap((entry) =>
    entry.image ? [entry.image] : [],
  ),
  ...storySection.hobbies.items.flatMap((item) =>
    item.image ? [item.image] : [],
  ),
];

test('every StoryImageKind renders its own named illustration', async ({
  page,
}) => {
  const images = storyImageKinds.map((kind) => ({
    kind,
    alt: `Alt text for ${kind}`,
  }));
  await page.setContent(
    renderToStaticMarkup(
      <div>
        {images.map((image) => (
          <StoryImage key={image.kind} image={image} ratio="video" />
        ))}
      </div>,
    ),
  );
  const drawings = new Set<string>();
  for (const image of images) {
    const svg = page.getByRole('img', { name: image.alt, exact: true });
    await expect(svg).toHaveCount(1);
    // The background plus at least two shapes, so an empty illustration fails.
    const shapes = await svg.locator(
      'rect, path, circle, line, polygon, ellipse',
    );
    expect(await shapes.count(), image.kind).toBeGreaterThan(3);
    drawings.add(await svg.innerHTML());
  }
  // Four kinds, four different drawings: no kind silently falls back to another.
  expect(drawings.size).toBe(storyImageKinds.length);
});

test('the image name is exactly the alt from content.ts', async ({ page }) => {
  await page.setContent(
    renderToStaticMarkup(
      <div>
        {storyImagesFromContent.map((image) => (
          <StoryImage key={image.alt} image={image} ratio="video" />
        ))}
      </div>,
    ),
  );
  expect(storyImagesFromContent.length).toBeGreaterThan(0);
  for (const image of storyImagesFromContent) {
    await expect(
      page.getByRole('img', { name: image.alt, exact: true }),
    ).toHaveCount(1);
  }
  await expect(page.getByRole('img')).toHaveCount(
    storyImagesFromContent.length,
  );
});

test('the video and wide ratios keep 16:9 and 16:7 shapes', async ({
  page,
}) => {
  await page.setContent(
    renderToStaticMarkup(
      <div>
        <StoryImage
          image={{ kind: 'sport', alt: 'Video ratio' }}
          ratio="video"
        />
        <StoryImage image={{ kind: 'sport', alt: 'Wide ratio' }} ratio="wide" />
      </div>,
    ),
  );
  const video = page.getByRole('img', { name: 'Video ratio' });
  const wide = page.getByRole('img', { name: 'Wide ratio' });
  await expect(video).toHaveAttribute('viewBox', '0 0 320 180');
  await expect(wide).toHaveAttribute('viewBox', '0 20 320 140');
});

test('an unknown StoryImageKind is a type error', () => {
  const unknownImage = { kind: 'cooking', alt: 'Cooking' };
  // @ts-expect-error 'cooking' is not a StoryImageKind. This line fails `pnpm typecheck` if the type ever accepts it.
  const element = <StoryImage image={unknownImage} ratio="video" />;
  expect(element.props.image.alt).toBe('Cooking');
});

test('the story illustrations use design tokens only', () => {
  const files = readdirSync(storyRoot, { recursive: true })
    .map(String)
    .filter((file) => file.endsWith('.tsx'));
  expect(files.length).toBeGreaterThan(0);
  for (const file of files) {
    const source = readFileSync(resolve(storyRoot, file), 'utf8');
    expect(source, file).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(source, file).not.toMatch(/\b(rgb|hsl)a?\(/);
    expect(source, file).not.toContain('dark:');
  }
});

// Loads the real tokens so the axe contrast check sees the actual colors in both themes.
// The `@import "tailwindcss"` line is dropped: it needs the Tailwind build, and WebKit rejects
// the whole stylesheet when it cannot fetch it. The token blocks are plain CSS and are kept.
async function loadTokens(page: import('@playwright/test').Page) {
  const css = readFileSync(
    resolve(__dirname, '../src/app/globals.css'),
    'utf8',
  ).replace(/@import[^;]*;/g, '');
  await page.addStyleTag({ content: css });
}

test('the story illustrations pass axe in light and dark', async ({ page }) => {
  // A full document, so axe checks the page shell (lang and title) as well as the images.
  const markup = renderToStaticMarkup(
    <main>
      {storyImagesFromContent.map((image) => (
        <StoryImage key={image.alt} image={image} ratio="video" />
      ))}
    </main>,
  );
  await page.setContent(
    `<!doctype html><html lang="en"><head><title>Story illustrations</title></head><body>${markup}</body></html>`,
  );
  await loadTokens(page);
  await disableTransitions(page);
  await setTheme(page, 'light');
  await expectNoA11yViolations(page);
  await setTheme(page, 'dark');
  await expectNoA11yViolations(page);
});

test('the story illustrations do not scroll sideways at 320px', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 640 });
  await page.setContent(
    renderToStaticMarkup(
      <div style={{ width: '288px' }}>
        {storyImagesFromContent.map((image) => (
          <StoryImage key={image.alt} image={image} ratio="wide" />
        ))}
      </div>,
    ),
  );
  await loadTokens(page);
  await expectNoHorizontalScroll(page);
});
