import { expect, test } from '@playwright/test';
import { timeline, timelineSection } from '../src/content';
import { expectNoA11yViolations, expectNoHorizontalScroll } from './helpers';

test('renders every timeline entry from content.ts in order', async ({
  page,
}) => {
  await page.goto('/');
  const section = page.locator('#timeline');
  await expect(
    section.getByRole('heading', { level: 2, name: timelineSection.title }),
  ).toBeVisible();
  const items = section.getByRole('listitem');
  await expect(items).toHaveCount(timeline.length);
  for (const [i, entry] of timeline.entries()) {
    const item = items.nth(i);
    await expect(
      item.getByRole('heading', {
        level: 3,
        name: `${entry.title}, ${entry.organization}`,
      }),
    ).toBeVisible();
    await expect(item).toContainText(entry.period);
    await expect(item).toContainText(entry.description);
    await expect(item).toContainText(timelineSection.kindLabels[entry.kind]);
  }
});

test('has both work and education entries', () => {
  expect(new Set(timeline.map((e) => e.kind))).toEqual(
    new Set(['work', 'education']),
  );
});

test('no horizontal scroll at 320px', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 });
  await page.goto('/');
  await expectNoHorizontalScroll(page);
});

for (const colorScheme of ['light', 'dark'] as const) {
  test.describe(`system ${colorScheme}`, () => {
    test.use({ colorScheme });
    test('no serious a11y violations', async ({ page }) => {
      await page.goto('/');
      await expectNoA11yViolations(page);
    });
  });
}
