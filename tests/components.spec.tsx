import { expect, test } from '@playwright/test';
import { renderToStaticMarkup } from 'react-dom/server';
import { Button } from '@/components/Button';
import { Chip } from '@/components/Chip';
import { ExternalLink } from '@/components/ExternalLink';
import { Section } from '@/components/Section';
import { Tag } from '@/components/Tag';

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

test('Button prefixes a root-relative href with PAGES_BASE_PATH', async ({
  page,
}) => {
  const original = process.env.PAGES_BASE_PATH;
  process.env.PAGES_BASE_PATH = '/my-portfolio';
  try {
    await page.setContent(
      renderToStaticMarkup(<Button href="/">Back to home</Button>),
    );
  } finally {
    // Never leak into another test, whichever branch runs.
    if (original === undefined) delete process.env.PAGES_BASE_PATH;
    else process.env.PAGES_BASE_PATH = original;
  }
  const button = page.getByRole('link', { name: 'Back to home' });
  await expect(button).toHaveAttribute('href', '/my-portfolio/');
});

test('Button leaves a root-relative href as-is with no base path set', async ({
  page,
}) => {
  const original = process.env.PAGES_BASE_PATH;
  delete process.env.PAGES_BASE_PATH;
  try {
    await page.setContent(
      renderToStaticMarkup(<Button href="/">Back to home</Button>),
    );
  } finally {
    if (original !== undefined) process.env.PAGES_BASE_PATH = original;
  }
  const button = page.getByRole('link', { name: 'Back to home' });
  await expect(button).toHaveAttribute('href', '/');
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
