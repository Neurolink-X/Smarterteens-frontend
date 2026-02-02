import { test, expect } from "@playwright/test";

test.describe("Header / Navbar", () => {
  test("logo links to home", async ({ page }) => {
    await page.goto("/courses");
    await page.getByRole("link", { name: /smarterteens home/i }).first().click();
    await expect(page).toHaveURL("/");
  });

  test("Learn dropdown opens and has Browse Courses", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /learn/i }).click();
    await expect(page.getByRole("link", { name: /browse courses/i }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /my learning/i }).first()).toBeVisible();
  });

  test("For dropdown opens and has For Parents", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /^for$/i }).click();
    await expect(page.getByRole("link", { name: /for parents/i }).first()).toBeVisible();
  });

  test("Browse Courses CTA goes to courses", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /browse courses/i }).first().click();
    await expect(page).toHaveURL(/\/(courses)?$/);
  });

  test("Sign Up goes to auth", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /sign up/i }).first().click();
    await expect(page).toHaveURL(/\/auth/);
  });

  test("mobile menu opens and shows key links", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");
    await page.getByRole("button", { name: /open menu/i }).click();
    await expect(page.getByRole("link", { name: /my learning/i }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /for parents/i }).first()).toBeVisible();
  });
});
