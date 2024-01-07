import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
    await page.goto('https://app.snaptrude.com');
    await page.locator('input[type="email"]').fill('chinmoyrp65@gmail.com');
    await page.locator('input[type="password"]').fill('Snaptrude@pass1');
    await page.getByRole('button', { name: 'Sign In', exact: true }).click();
    await expect(page.getByRole('button', { name: 'Create a Project' })).toBeVisible();
    await page.context().storageState({ path: authFile });
});