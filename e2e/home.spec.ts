import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test("loads and shows hero with primary CTA", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/SmarterTeens|Vite/);
    await expect(page.getByRole("link", { name: /start learning free/i })).toBeVisible();
  });

  test("skip to main content link works", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /skip to main content/i }).focus();
    await page.keyboard.press("Enter");
    const main = page.locator("#main-content");
    await expect(main).toBeFocused();
  });
});
