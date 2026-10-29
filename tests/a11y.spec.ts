import { expect, test } from '@playwright/test';
import { expectNoA11yViolations, expectNoHorizontalScroll } from './helpers';

const widths = [320, 375, 768, 1280];
const pages = [
  { name: 'home', path: '/' },
  { name: '404', path: '/does-not-exist' },
];

// 2 pages x 2 themes x 4 widths = 16 combinations.
for (const { name, path } of pages) {
  for (const colorScheme of ['light', 'dark'] as const) {
    for (const width of widths) {
      test.describe(`${name}, ${colorScheme}, ${width}px`, () => {
        test.use({ colorScheme, viewport: { width, height: 800 } });

        test('axe finds no serious or critical issues', async ({ page }) => {
          await page.goto(path);
          await expectNoA11yViolations(page);
          await expectNoHorizontalScroll(page);
        });
      });
    }
  }
}

// On Linux and macOS, Playwright's WebKit build exposes WebKitGTK's `enable-tabs-to-links`
// setting and turns it on, so Tab moves focus into <a> elements for testing. The Windows WebKit
// build does not expose that setting, so Tab only cycles form controls there, matching real
// Safari's own default (Tab skips links unless the user turns on "Full Keyboard Access"):
// https://dev.to/hawkchen/safaris-tab-key-trap-why-your-websites-focus-navigation-might-be-breaking-for-safari-users-5632
// This is a limit of the Windows WebKit test build, not a bug in the page: real Safari users on
// any OS keep their own system/browser keyboard-access setting, unaffected by this.
const skipOnWebkitWindows = (browserName: string) =>
  browserName === 'webkit' && process.platform === 'win32';

for (const { name, path } of pages) {
  test.describe(`skip link on ${name}`, () => {
    test('is the first focusable element and shows only on focus', async ({
      page,
      browserName,
    }) => {
      test.skip(
        skipOnWebkitWindows(browserName),
        'Tab does not move focus into <a> elements on the Windows WebKit test build; see the comment above this describe block.',
      );
      await page.goto(path);
      const skip = page.getByRole('link', { name: 'Skip to content' });
      const first = await page.evaluate(() => {
        const el = document.querySelector(
          'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        return el?.textContent?.trim();
      });
      expect(first).toBe('Skip to content');
      // Hidden: clipped to a 1px box until focused.
      expect((await skip.boundingBox())!.width).toBeLessThanOrEqual(1);
      await page.keyboard.press('Tab');
      await expect(skip).toBeFocused();
      const box = (await skip.boundingBox())!;
      expect(box.width).toBeGreaterThan(40);
      expect(box.y).toBeGreaterThanOrEqual(0);
      // The accent background comes from the token: resolve --accent the same way and compare.
      const accent = await page.evaluate(() => {
        const probe = document.createElement('div');
        probe.style.backgroundColor = 'var(--accent)';
        document.body.append(probe);
        const color = getComputedStyle(probe).backgroundColor;
        probe.remove();
        return color;
      });
      await expect(skip).toHaveCSS('background-color', accent);
    });

    test('moves focus past the header to the main landmark', async ({
      page,
      browserName,
    }) => {
      test.skip(
        skipOnWebkitWindows(browserName),
        'Tab does not move focus into <a> elements on the Windows WebKit test build; see the comment above this describe block.',
      );
      await page.goto(path);
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await expect(page).toHaveURL(/#main$/);
      // The hash changes even if focus stays put, so check that <main> really has focus.
      await expect(page.locator('main#main')).toBeFocused();
    });
  });
}
