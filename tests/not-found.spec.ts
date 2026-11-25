import { expect, test } from '@playwright/test';
import { expectNoA11yViolations, expectNoHorizontalScroll } from './helpers';

test('an unknown path shows the 404 page', async ({ page }) => {
  const response = await page.goto('/does-not-exist');
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole('heading', { level: 1, name: 'Page not found' }),
  ).toBeVisible();
  await expect(page.getByText('Error 404')).toBeVisible();
});

test('the 404 page has no theme toggle and every link points home', async ({
  page,
}) => {
  await page.goto('/does-not-exist');
  await expect(page.getByRole('button', { name: 'Dark theme' })).toHaveCount(0);
  const hrefs = await page
    .getByRole('link')
    .evaluateAll((links) => links.map((a) => a.getAttribute('href')));
  // Links outside the footer: the skip link (#main) is the only one that does
  // not go home. Footer links (contact, socials, template) are checked apart.
  const footerHrefs = await page
    .getByRole('contentinfo')
    .getByRole('link')
    .evaluateAll((links) => links.map((a) => a.getAttribute('href')));
  const links = hrefs.filter(
    (href) => href !== '#main' && !footerHrefs.includes(href),
  );
  expect(links.length).toBeGreaterThan(0);
  for (const href of links) expect(href).toBe('/');
  expect(hrefs.some((href) => href?.includes('Main.dc.html'))).toBe(false);
  await page.getByRole('link', { name: 'Back to home' }).click();
  await expect(page).toHaveURL(/\/$/);
});

for (const colorScheme of ['light', 'dark'] as const) {
  test.describe(`system ${colorScheme}`, () => {
    test.use({ colorScheme });

    test('the 404 page follows the system theme and passes axe', async ({
      page,
    }) => {
      await page.goto('/does-not-exist');
      const dark = await page.evaluate(() =>
        document.documentElement.classList.contains('dark'),
      );
      expect(dark).toBe(colorScheme === 'dark');
      await expectNoHorizontalScroll(page);
      await expectNoA11yViolations(page);
    });
  });
}

test('the 404 page uses a stored theme choice', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('theme', 'dark'));
  await page.goto('/does-not-exist');
  expect(
    await page.evaluate(() =>
      document.documentElement.classList.contains('dark'),
    ),
  ).toBe(true);
});
