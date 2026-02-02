import { test, expect } from "@playwright/test";

test.describe("Auth page", () => {
  test("auth page loads with sign up / log in", async ({ page }) => {
    await page.goto("/auth");
    await expect(page.getByText(/smarterteens/i)).toBeVisible();
    await expect(page.getByRole("button", { name: /log in|sign up/i })).toBeVisible();
  });

  test("toggle between login and signup", async ({ page }) => {
    await page.goto("/auth");
    const toggle = page.getByRole("button", { name: /sign up|log in/i }).filter({ hasText: /don't have|already have/i }).locator("..").getByRole("button");
    if (await toggle.isVisible()) {
      await toggle.click();
      await expect(page.getByPlaceholder(/name|email|password/i).first()).toBeVisible();
    }
  });
});
