import { test, expect } from '@playwright/test';

test('Web app deve estar online', async ({ page }) => {
  await page.goto('http://localhost:5173');
});

const getScreenshotPath = (testInfo: any, name: string) => {
  const folder = testInfo.title.replace(/\s+/g, '-').toLowerCase();
  return `screenshots/${folder}/${name}.png`;
};

test('Web app deve estar online', async ({ page }, testInfo) => {
  await expect(page).toHaveTitle(/Velô by Papito/);
});
