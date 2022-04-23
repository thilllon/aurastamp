import { test, expect } from '@playwright/test';

test('navigate projects page', async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto('/');
  // await page.click('text=프로젝트');
  expect(
    page.locator(
      '#__next > nav > div > div > div > div.MuiBox-root.carillon-dev-i9gxme > li:nth-child(1) > a'
    )
  ).toContainText('프로젝트');

  await page.click('');
  // The new url should be "/about" (baseURL is used there)
  await expect(page).toHaveURL('/projects');
  // The new page should contain an h1 with "About Page"
  await expect(
    page.locator(
      '#__next > main > div > div > div > div.MuiBox-root.carillon-dev-0 > div.MuiBox-root.carillon-dev-qg7b2y > h5'
    )
  ).toContainText('Projects');
});
