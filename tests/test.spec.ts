import { test } from '@playwright/test';

test('header fails but body passes', async ({ page }) => {
  await page.goto('https://www.example.com');

  // Check header quickly
  const headerElement = await page.$('header'); // $ returns null if not found
  const header = headerElement ? await headerElement.innerText() : '[header not found]';

  // Get body text
  const body = await page.locator('body').innerText();

  console.log('HEADER:', header);
  console.log('BODY (first 300 chars):', body.slice(0, 300));
});
