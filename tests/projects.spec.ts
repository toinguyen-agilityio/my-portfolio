import { expect, test, type Page } from '@playwright/test';
import { projects } from '../src/content';
import { expectNoA11yViolations, expectNoHorizontalScroll } from './helpers';

const section = (page: Page) => page.locator('#projects');
const cards = (page: Page) =>
  section(page)
    .locator('ul > li')
    .filter({ has: page.getByRole('heading', { level: 3 }) });

test('renders every project from content.ts with its thumbnail alt', async ({
  page,
}) => {
  await page.goto('/');
  await expect(cards(page)).toHaveCount(projects.length);
  for (const project of projects) {
    await expect(
      section(page).getByRole('heading', { level: 3, name: project.title }),
    ).toBeVisible();
    await expect(
      section(page).getByRole('img', { name: project.thumbnailAlt }),
    ).toBeVisible();
  }
});

test('every card link opens a new tab safely and has a unique accessible name', async ({
  page,
}) => {
  await page.goto('/');
  for (const project of projects) {
    for (const [prefix, href] of [
      ['Live demo of', project.demoUrl],
      ['Source code of', project.sourceUrl],
    ]) {
      const link = section(page).getByRole('link', {
        name: `${prefix} ${project.title} (opens in a new tab)`,
        exact: true,
      });
      await expect(link).toHaveAttribute('href', href);
      await expect(link).toHaveAttribute('target', '_blank');
      await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
  }
  const external = section(page).locator('a[target="_blank"]');
  expect(await external.count()).toBe(projects.length * 2);
  expect(await section(page).locator('a').count()).toBe(projects.length * 3);
  for (const rel of await external.evaluateAll((as) =>
    as.map((a) => a.getAttribute('rel')),
  )) {
    expect(rel).toBe('noopener noreferrer');
  }
});

test('cards have no hover style and are not wrapped in a link', async ({
  page,
}) => {
  await page.goto('/');
  const card = cards(page).first();
  const read = () =>
    card.evaluate((el) => {
      const s = getComputedStyle(el);
      return [
        s.backgroundColor,
        s.borderTopColor,
        s.boxShadow,
        s.cursor,
        s.transform,
      ];
    });
  const before = await read();
  await card.hover({ position: { x: 5, y: 5 } });
  expect(await read()).toEqual(before);
  expect(before[3]).not.toBe('pointer');
  expect(await card.evaluate((el) => el.closest('a'))).toBeNull();
});

test('cards stack in one column at 320px and 375px', async ({ page }) => {
  for (const width of [320, 375]) {
    await page.setViewportSize({ width, height: 700 });
    await page.goto('/');
    await expectNoHorizontalScroll(page);
    const lefts = await cards(page).evaluateAll((els) =>
      els.map((e) => Math.round(e.getBoundingClientRect().left)),
    );
    expect(new Set(lefts).size).toBe(1);
  }
});

for (const width of [768, 1280]) {
  test(`cards fill rows with equal heights at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const rects = await cards(page).evaluateAll((els) =>
      els.map((e) => {
        const r = e.getBoundingClientRect();
        return {
          top: Math.round(r.top + window.scrollY),
          height: Math.round(r.height),
        };
      }),
    );
    const rows = new Map<number, number[]>();
    for (const r of rects)
      rows.set(r.top, [...(rows.get(r.top) ?? []), r.height]);
    expect(
      Math.max(...[...rows.values()].map((h) => h.length)),
    ).toBeGreaterThan(1);
    for (const heights of rows.values()) {
      expect(new Set(heights).size).toBe(1);
    }
  });
}

for (const colorScheme of ['light', 'dark'] as const) {
  test.describe(`system ${colorScheme}`, () => {
    test.use({ colorScheme });
    test('no serious a11y violations on the page', async ({ page }) => {
      await page.goto('/');
      await expectNoA11yViolations(page);
    });
  });
}

test('clicking a project card opens its detail page', async ({ page }) => {
  for (const project of projects) {
    await page.goto('/');
    const card = cards(page).filter({ hasText: project.title });
    await card.hover({ position: { x: 5, y: 5 } });
    await card.click({ position: { x: 5, y: 5 } });
    await expect(page).toHaveURL(new RegExp(`/projects/${project.slug}/?$`));
    await expect(
      page.getByRole('heading', { level: 1, name: project.title }),
    ).toBeVisible();
    await expect(page.getByText(project.overview)).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'Back to projects' }),
    ).toHaveAttribute('href', /#projects$/);
  }
});

test('the external links in a card still open their own targets', async ({
  page,
}) => {
  await page.goto('/');
  const link = section(page).getByRole('link', {
    name: `Live demo of ${projects[0].title} (opens in a new tab)`,
    exact: true,
  });
  await link.click({ trial: true });
  await expect(link).toHaveAttribute('href', projects[0].demoUrl);
});

for (const project of projects) {
  test(`detail page for ${project.slug} shows content and links`, async ({
    page,
  }) => {
    await page.goto(`/projects/${project.slug}/`);
    await expect(page).toHaveTitle(new RegExp(project.title));
    for (const h of project.highlights) {
      await expect(page.getByText(h)).toBeVisible();
    }
    await expect(
      page.getByRole('link', {
        name: `Live demo of ${project.title} (opens in a new tab)`,
        exact: true,
      }),
    ).toHaveAttribute('href', project.demoUrl);
    await expect(
      page.getByRole('link', {
        name: `Source code of ${project.title} (opens in a new tab)`,
        exact: true,
      }),
    ).toHaveAttribute('href', project.sourceUrl);
    await expectNoHorizontalScroll(page);
    await expectNoA11yViolations(page);
  });
}

test('unknown project slug shows the 404 page', async ({ page }) => {
  const res = await page.goto('/projects/does-not-exist/');
  expect(res?.status()).toBe(404);
});
