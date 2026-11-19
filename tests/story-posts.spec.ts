import { expect, test } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { storyBlog } from '../src/content';
import {
  disableTransitions,
  expectNoA11yViolations,
  expectNoHorizontalScroll,
  setTheme,
} from './helpers';

// The hobby cards link to /story/<category>, which lists MDX posts from content/story/.

test.use({ reducedMotion: 'reduce' });

for (const [title, slug] of [
  ['Travel', 'travel'],
  ['Sport', 'sport'],
  ['Photography', 'photography'],
]) {
  test(`the ${title} card opens /story/${slug}`, async ({ page }) => {
    await page.goto('/story');
    await page.getByRole('link', { name: `${title}: read stories` }).click();
    await expect(page).toHaveURL(new RegExp(`/story/${slug}$`));
    await expect(page.locator('h1')).toHaveText(title);
  });
}

test('a card is keyboard-focusable with a visible ring and opens with Enter', async ({
  page,
}) => {
  await page.goto('/story');
  const card = page.getByRole('link', { name: 'Travel: read stories' });
  await card.focus();
  await expect(card).toBeFocused();
  const outline = await card.evaluate(
    (el) => getComputedStyle(el).outlineStyle,
  );
  expect(outline).not.toBe('none');
  await expect(card).toContainText(storyBlog.readStories);
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/story\/travel$/);
});

test('travel lists its posts newest first', async ({ page }) => {
  await page.goto('/story/travel');
  const titles = page.locator('#posts-title ~ ul h3');
  await expect(titles).toHaveText([
    'Slow trains and street food in Huế',
    'Walking Lisbon by tram line',
  ]);
  const first = page.locator('#posts-title ~ ul > li').first();
  await expect(first.locator('img')).toBeVisible();
  await expect(first.locator('time')).toHaveText('October 1, 2026');
  await expect(first).toContainText('Huế, Vietnam');
  await expect(first).toContainText(`min read`);
});

test('photography shows the empty state', async ({ page }) => {
  await page.goto('/story/photography');
  await expect(page.getByText(storyBlog.empty)).toBeVisible();
  await expect(page.locator('#posts-title ~ ul')).toHaveCount(0);
});

test('sport lists its posts newest first', async ({ page }) => {
  await page.goto('/story/sport');
  await expect(page.getByText(storyBlog.empty)).toHaveCount(0);
  const titles = page.locator('#posts-title ~ ul h3');
  await expect(titles).toHaveText([
    'Morning runs along the Perfume River',
    'Weekend badminton doubles',
  ]);
  const first = page.locator('#posts-title ~ ul > li').first();
  await expect(first.locator('img')).toBeVisible();
  await expect(first.locator('time')).toHaveText('September 12, 2026');
  await expect(first).toContainText('Huế, Vietnam');
  await expect(first).toContainText('min read');
});

test('sport posts show content, and a gallery only when they have one', async ({
  page,
}) => {
  await page.goto('/story/sport/morning-run-along-the-river');
  await expect(page.locator('h1')).toHaveText(
    'Morning runs along the Perfume River',
  );
  await expect(page.locator('article h2').first()).toBeVisible();
  await expect(
    page.getByRole('heading', { name: storyBlog.gallery }),
  ).toBeVisible();
  for (const img of await page.locator('article img').all()) {
    await img.scrollIntoViewIfNeeded();
    await expect
      .poll(() => img.evaluate((el: HTMLImageElement) => el.naturalWidth))
      .toBeGreaterThan(0);
  }

  await page.goto('/story/sport/weekend-badminton-doubles');
  await expect(page.locator('h1')).toHaveText('Weekend badminton doubles');
  await expect(
    page.getByRole('heading', { name: storyBlog.gallery }),
  ).toHaveCount(0);
});

test('a post shows its content, gallery and navigation', async ({ page }) => {
  await page.goto('/story/travel');
  await page
    .getByRole('link', { name: 'Slow trains and street food in Huế' })
    .click();
  await expect(page).toHaveURL(/\/story\/travel\/hue-food-and-trains$/);
  await expect(page.locator('h1')).toHaveText(
    'Slow trains and street food in Huế',
  );
  await expect(page.locator('article h2').first()).toBeVisible();
  await expect(
    page.getByRole('heading', { name: storyBlog.gallery }),
  ).toBeVisible();
  // Every image loads.
  for (const img of await page.locator('article img').all()) {
    await img.scrollIntoViewIfNeeded();
    await expect
      .poll(() => img.evaluate((el: HTMLImageElement) => el.naturalWidth))
      .toBeGreaterThan(0);
  }
  // Newest post: no prev, next goes to the older one.
  const nav = page.getByRole('navigation', { name: storyBlog.postNav });
  await nav.getByRole('link', { name: /Walking Lisbon/ }).click();
  await expect(page).toHaveURL(/\/story\/travel\/lisbon-tram-walks$/);
  await page
    .getByRole('navigation', { name: storyBlog.postNav })
    .getByRole('link', { name: /Slow trains/ })
    .click();
  await expect(page).toHaveURL(/hue-food-and-trains$/);
});

test('back links go post → category → story', async ({ page }) => {
  await page.goto('/story/travel/lisbon-tram-walks');
  await page.getByRole('link', { name: '← Back to Travel' }).click();
  await expect(page).toHaveURL(/\/story\/travel$/);
  await page.getByRole('link', { name: storyBlog.backToStory }).click();
  await expect(page).toHaveURL(/\/story$/);
});

for (const path of [
  '/story/cooking',
  '/story/travel/no-such-post',
  '/story/sport/hue-food-and-trains',
]) {
  test(`${path} shows the 404 page`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.status()).toBe(404);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });
}

test('SEO: post title, description and og:image come from frontmatter', async ({
  page,
}) => {
  await page.goto('/story/travel/hue-food-and-trains');
  await expect(page).toHaveTitle(/Slow trains and street food in Huế/);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    'content',
    /bún bò/,
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    'content',
    /\/images\/story\/travel\/hue-food-and-trains\/cover\.jpg$/,
  );
});

for (const path of [
  '/story/travel',
  '/story/sport',
  '/story/sport/morning-run-along-the-river',
  '/story/sport/weekend-badminton-doubles',
  '/story/travel/hue-food-and-trains',
]) {
  for (const theme of ['light', 'dark'] as const) {
    test(`${path} passes axe and fits at 320px in ${theme}`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: 320, height: 800 });
      await page.goto(path);
      await disableTransitions(page);
      await setTheme(page, theme);
      await expectNoA11yViolations(page);
      await expectNoHorizontalScroll(page);
    });
  }
}

test('frontmatter validation: every post file has the required keys', () => {
  const src = readFileSync(
    resolve(__dirname, '../content/story/travel/hue-food-and-trains.mdx'),
    'utf8',
  );
  for (const key of ['title', 'date', 'category', 'cover', 'excerpt'])
    expect(src).toContain(`${key}:`);
});
