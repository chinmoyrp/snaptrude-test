// @ts-check
import { test, expect } from '@playwright/test';

test('has pencil icon', async ({ page }) => {
  await page.goto('https://app.snaptrude.com');
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  await expect(page.getByRole('button', { name: 'Create a Project' })).toBeVisible();
});

