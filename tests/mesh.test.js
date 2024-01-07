import { test, expect } from '@playwright/test';

test('draw mesh', async ({ page }) => {
  await page.goto('https://app.snaptrude.com');
  await page.getByRole('link', { name: 'test6' }).click();
  await expect(page.getByText("Scene Load Complete")).toBeVisible();
  await expect(page.getByText("Scene Load Complete")).toBeHidden();
  await page.keyboard.press('Control+a');
  await page.keyboard.press('Delete');
  const meshCount = page.waitForFunction(() => window.store.scene.meshes.length > 8);
  await page.mouse.click(400,400);
  await page.mouse.click(400,500);
  await page.mouse.click(500,500);
  await page.mouse.dblclick(500,400);
  await meshCount;
});
