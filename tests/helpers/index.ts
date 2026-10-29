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
  const { scrollWidth, bodyScrollWidth, clientWidth } = await page.evaluate(
    () => ({
      scrollWidth: document.documentElement.scrollWidth,
      bodyScrollWidth: document.body.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }),
  );
  expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
  // A wrapper with overflow-x: hidden would clip content without widening <html>.
  expect(bodyScrollWidth).toBeLessThanOrEqual(clientWidth);
}

// Switches the theme by toggling the `dark` class on <html>, the same hook the CSS tokens use.
// Button uses `transition-colors`, so flipping the class starts a CSS color transition on it.
// A check that reads computed colors right after (axe's contrast check, for example) could then
// sample an in-between color and fail at random, on a timeline that is engine-specific: waiting
// for the animations the toggle starts (the Web Animations API) is not reliable on every engine.
// Disabling transitions for the test page before the switch removes the in-between frame outright,
// on every engine, with no fixed sleep, no retry and no axe rule turned off.
export async function setTheme(page: Page, theme: 'light' | 'dark') {
  await page.evaluate((t) => {
    const styleId = 'playwright-disable-transitions';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent =
        '*, *::before, *::after { transition: none !important; }';
      document.head.append(style);
    }
    document.documentElement.classList.toggle('dark', t === 'dark');
  }, theme);
}
