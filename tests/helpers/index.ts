import AxeBuilder from '@axe-core/playwright';
import { expect, type Page } from '@playwright/test';

// Fails when axe finds serious or critical WCAG 2.1 A/AA violations on the current page.
// Moderate and minor violations are allowed on purpose, so they do not fail the tests.
export async function expectNoA11yViolations(page: Page) {
  const { violations } = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();
  const blocking = violations.filter(
    (v) => v.impact === 'serious' || v.impact === 'critical',
  );
  expect(
    blocking.map((v) => `${v.id} (${v.impact}): ${v.nodes.length} node(s)`),
  ).toEqual([]);
}

// Fails when the page scrolls sideways, which means some content overflows the viewport.
export async function expectNoHorizontalScroll(page: Page) {
  const { scrollWidth, clientWidth } = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
}

// Switches the theme by toggling the `dark` class on <html>, the same hook the CSS tokens use.
export async function setTheme(page: Page, theme: 'light' | 'dark') {
  await page.evaluate((t) => {
    document.documentElement.classList.toggle('dark', t === 'dark');
  }, theme);
}
