import { expect, test } from '@playwright/test';
import { profile } from '../src/content';
import { expectNoHorizontalScroll } from './helpers';

test('the page has exactly one H1, and it is in About', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('#about h1')).toHaveText(profile.headline);
  await expect(page.locator('#about')).toContainText(profile.greeting);
  await expect(page.locator('#about')).toContainText(profile.bio);
});

test('buttons go to Projects and Contact', async ({ page }) => {
  await page.goto('/');
  await expect(
    page.getByRole('link', { name: 'View projects' }),
  ).toHaveAttribute('href', '#projects');
  await expect(page.getByRole('link', { name: 'Contact me' })).toHaveAttribute(
    'href',
    '#contact',
  );
});

test('portrait is an image with the label from content.ts, 220px', async ({
  page,
}) => {
  await page.goto('/');
  const portrait = page.getByRole('img', { name: profile.portraitAlt });
  await expect(portrait).toBeVisible();
  const box = await portrait.boundingBox();
  expect(box?.width).toBe(220);
  expect(box?.height).toBe(220);
});

test('a long headline wraps at 320px without clipping', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 });
  await page.goto('/');
  await page.locator('#about h1').evaluate((el) => {
    el.textContent = 'Extraordinarily'.repeat(8);
  });
  const { scrollWidth, clientWidth } = await page
    .locator('#about h1')
    .evaluate((el) => ({
      scrollWidth: el.scrollWidth,
      clientWidth: el.clientWidth,
    }));
  expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
  await expectNoHorizontalScroll(page);
});

test('text and portrait sit side by side on desktop, stacked on mobile', async ({
  page,
}) => {
  const top = (selector: string) =>
    page.locator(selector).evaluate((el) => el.getBoundingClientRect().top);
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/');
  const h1Top = await top('#about h1');
  const portraitTop = await top('#about svg[role="img"]');
  // Same row on desktop: the portrait starts above the end of the text block, not below it.
  expect(
    await page
      .locator('#about svg[role="img"]')
      .evaluate((el) => el.getBoundingClientRect().left),
  ).toBeGreaterThan(
    (await page
      .locator('#about h1')
      .evaluate((el) => el.getBoundingClientRect().right)) - 1,
  );
  expect(Math.abs(portraitTop - h1Top)).toBeLessThan(400);

  await page.setViewportSize({ width: 375, height: 667 });
  expect(await top('#about svg[role="img"]')).toBeGreaterThan(
    await page
      .locator('#about h1')
      .evaluate((el) => el.getBoundingClientRect().bottom),
  );
});
