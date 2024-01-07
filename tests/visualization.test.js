// @ts-check
import { test, expect } from '@playwright/test';

async function loadScene(page, name) {
  await page.goto('https://app.snaptrude.com');
  await page.getByRole('link', { name }).click();
  await expect(page.getByText("Scene Load Complete")).toBeVisible();
  await expect(page.getByText("Scene Load Complete")).toBeHidden();
}

async function clearScene(page) {
  await page.keyboard.press('Control+a');
  await page.keyboard.press('Delete');
}

test('line parallel to horizontal axis', async ({ page }) => {
  await loadScene(page, 'test1');
  await clearScene(page);
  await page.mouse.click(400,400);
  await page.mouse.move(500,400);
  await expect(page).toHaveScreenshot('horizontal-line.png', { maxDiffPixelRatio: 0.02 });
});

test('line parallel to vertical axis', async ({ page }) => {
  await loadScene(page, 'test2');
  await clearScene(page);
  await page.mouse.click(400,400);
  await page.mouse.move(400,500);
  await expect(page).toHaveScreenshot('vertical-line.png', { maxDiffPixelRatio: 0.02 });
});

test('shape completion using single click', async ({ page }) => {
  await loadScene(page, 'test3');
  await clearScene(page);
  await page.mouse.click(400,400);
  await page.mouse.click(400,500);
  await page.mouse.click(500,500);
  await page.mouse.click(500,400);
  await page.mouse.click(400,400);
  await page.mouse.move(0,0);
  await expect(page).toHaveScreenshot('shape-complete-single-click.png', { maxDiffPixelRatio: 0.02 });
});

test('shape completion using double click', async ({ page }) => {
  await loadScene(page, 'test4');;
  await clearScene(page);
  await page.mouse.click(400,400);
  await page.mouse.click(400,500);
  await page.mouse.click(500,500);
  await page.mouse.dblclick(500,400);
  await page.mouse.move(0,0);
  await expect(page).toHaveScreenshot('shape-complete-double-click.png', { maxDiffPixelRatio: 0.02 });
});


test('undo lines', async ({ page }) => {
  await loadScene(page, 'test5');
  await clearScene(page);
  await page.mouse.click(400,400);
  await page.mouse.click(400,500);
  await page.mouse.move(500,500);
  await expect(page).toHaveScreenshot('l-shape.png', { maxDiffPixelRatio: 0.02 });
  await page.keyboard.press("Escape");
  await expect(page).toHaveScreenshot('diagonal.png', { maxDiffPixelRatio: 0.02 });
  await page.keyboard.press("Escape");
  await page.mouse.move(0,0);
  await expect(page).toHaveScreenshot('blank.png', { maxDiffPixelRatio: 0.02 });
});

