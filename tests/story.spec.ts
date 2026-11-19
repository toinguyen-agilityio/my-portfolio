import { expect, test, type Page } from '@playwright/test';
import { navLinks, profile, storySection } from '../src/content';
import {
  disableTransitions,
  expectNoA11yViolations,
  expectNoHorizontalScroll,
  setTheme,
} from './helpers';

// Render checks for the /story route (T14): metadata, the intro, the CTA, the header on /story.
// Journey (T15) and Hobbies (T16) add their own checks later.

// Smooth scrolling would make us measure mid-scroll.
test.use({ reducedMotion: 'reduce' });

// The part of the header still on screen, 0 once a static header has scrolled away.
const headerBottom = (page: Page) =>
  page
    .locator('header')
    .evaluate((el) => Math.max(0, el.getBoundingClientRect().bottom));

test('the page has exactly one H1, in the intro', async ({ page }) => {
  await page.goto('/story');
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('h1')).toHaveText(storySection.title);
  await expect(page.locator('h1')).toBeVisible();
});

test('the title and meta description come from content.ts', async ({
  page,
}) => {
  await page.goto('/story');
  await expect(page).toHaveTitle(storySection.seo.title);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    'content',
    storySection.seo.description,
  );
});

test('the page has a skip link that reaches main', async ({ page }) => {
  await page.goto('/story');
  const skip = page.getByRole('link', { name: 'Skip to content' });
  await skip.focus();
  await expect(skip).toBeFocused();
  await expect(skip).toHaveAttribute('href', '#main');
  await skip.press('Enter');
  await expect(page).toHaveURL(/#main$/);
  await expect(page.locator('#main')).toBeFocused();
});

test('back to home goes to the home page', async ({ page }) => {
  await page.goto('/story');
  const back = page.getByRole('link', { name: storySection.backLabel });
  await expect(back).toHaveAttribute('href', '/');
  await back.click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator('#about h1')).toBeVisible();
});

test('My Story is the current page in the header, the others link home', async ({
  page,
}) => {
  await page.goto('/story');
  const nav = page.getByRole('navigation', { name: 'Sections' });
  await expect(nav.getByRole('link', { name: 'My Story' })).toHaveAttribute(
    'aria-current',
    'page',
  );
  const others = navLinks.filter((link) => link.href !== '/story');
  for (const link of others) {
    await expect(nav.getByRole('link', { name: link.label })).toHaveAttribute(
      'href',
      `/${link.href}`,
    );
  }
  await expect(page.getByRole('link', { name: profile.name })).toHaveAttribute(
    'href',
    '/',
  );
});

test('Contact me lands on the home contact section below the header', async ({
  page,
}) => {
  await page.goto('/story');
  await page.getByRole('link', { name: storySection.cta.contactLabel }).click();
  await expect(page).toHaveURL(/\/#contact$/);
  const heading = page.locator('#contact h2');
  await expect(heading).toBeInViewport({ ratio: 1 });
  const top = await heading.evaluate((el) => el.getBoundingClientRect().top);
  expect(top).toBeGreaterThanOrEqual(await headerBottom(page));
});

test('View projects lands on the home projects section below the header', async ({
  page,
}) => {
  await page.goto('/story');
  await page
    .getByRole('link', { name: storySection.cta.projectsLabel })
    .click();
  await expect(page).toHaveURL(/\/#projects$/);
  const heading = page.locator('#projects h2');
  await expect(heading).toBeInViewport({ ratio: 1 });
  const top = await heading.evaluate((el) => el.getBoundingClientRect().top);
  expect(top).toBeGreaterThanOrEqual(await headerBottom(page));
});

test('the CTA section uses its own id, not the home contact id', async ({
  page,
}) => {
  await page.goto('/story');
  await expect(page.locator('#story-cta h2')).toHaveText(
    storySection.cta.title,
  );
  await expect(page.locator('#contact')).toHaveCount(0);
});

for (const width of [320, 375, 1280]) {
  test(`no horizontal scroll and the nav fits at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.goto('/story');
    await expectNoHorizontalScroll(page);
    const nav = page.getByRole('navigation', { name: 'Sections' });
    const navBox = await nav.boundingBox();
    const links = nav.getByRole('link');
    await expect(links).toHaveCount(navLinks.length);
    for (let i = 0; i < navLinks.length; i++) {
      const box = await links.nth(i).boundingBox();
      expect(box, `link ${i}`).not.toBeNull();
      expect(box!.x + box!.width).toBeLessThanOrEqual(
        navBox!.x + navBox!.width + 0.5,
      );
      expect(box!.height, `link ${i} height`).toBeGreaterThanOrEqual(44);
    }
  });
}

for (const colorScheme of ['light', 'dark'] as const) {
  for (const width of [320, 375, 1280]) {
    test.describe(`${colorScheme} ${width}px`, () => {
      test.use({ colorScheme, viewport: { width, height: 800 } });

      test('passes axe and has no horizontal scroll', async ({ page }) => {
        await page.goto('/story');
        await expectNoA11yViolations(page);
        await expectNoHorizontalScroll(page);
      });
    });
  }
}

for (const theme of ['light', 'dark'] as const) {
  test(`axe passes in the ${theme} theme after a toggle`, async ({ page }) => {
    await page.goto('/story');
    await disableTransitions(page);
    await setTheme(page, theme);
    await expectNoA11yViolations(page);
  });
}

test.describe('Hobbies', () => {
  const { items } = storySection.hobbies;

  test('shows a card per hobby with an H3 and its tags', async ({ page }) => {
    await page.goto('/story');
    const section = page.locator('#hobbies');
    await expect(section.locator('h2')).toHaveText(storySection.hobbies.title);
    const cards = section.locator('li > a');
    await expect(cards).toHaveCount(3);
    for (const [i, hobby] of items.entries()) {
      const card = cards.nth(i);
      await expect(card.locator('h3')).toHaveText(hobby.title);
      await expect(card.locator('ul li')).toHaveText([...hobby.tags]);
      await expect(card).toHaveAttribute('href', `/story/${hobby.slug}`);
    }
  });

  const cardBoxes = (page: Page) =>
    page
      .locator('#hobbies li > a')
      .evaluateAll((els) =>
        els.map((el) => el.getBoundingClientRect().toJSON()),
      );

  test('uses one column at 320px', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto('/story');
    await expectNoHorizontalScroll(page);
    const boxes = await cardBoxes(page);
    expect(boxes).toHaveLength(3);
    for (const box of boxes) expect(box.x).toBeCloseTo(boxes[0].x, 0);
    expect(boxes[1].y).toBeGreaterThan(boxes[0].y + boxes[0].height - 1);
  });

  test('fills the row at 1080px with equal-height cards', async ({ page }) => {
    await page.setViewportSize({ width: 1080, height: 800 });
    await page.goto('/story');
    const boxes = await cardBoxes(page);
    expect(boxes).toHaveLength(3);
    for (const box of boxes) {
      expect(box.y).toBeCloseTo(boxes[0].y, 0);
      expect(box.height).toBeCloseTo(boxes[0].height, 0);
    }
    const left = Math.min(...boxes.map((b) => b.x));
    const right = Math.max(...boxes.map((b) => b.x + b.width));
    const container = await page
      .locator('#hobbies ul')
      .first()
      .evaluate((el) => el.getBoundingClientRect().toJSON());
    expect(left).toBeCloseTo(container.x, 0);
    expect(right).toBeCloseTo(container.x + container.width, 0);
  });

  for (const theme of ['light', 'dark'] as const) {
    test(`passes axe in the ${theme} theme`, async ({ page }) => {
      await page.goto('/story');
      await disableTransitions(page);
      await setTheme(page, theme);
      await expectNoA11yViolations(page);
    });
  }
});
