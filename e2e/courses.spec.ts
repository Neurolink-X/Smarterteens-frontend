import { test, expect } from "@playwright/test";

test.describe("Courses flow", () => {
  test("courses page lists courses", async ({ page }) => {
    await page.goto("/courses");
    await expect(page.getByRole("heading", { name: /explore our courses/i })).toBeVisible();
    await expect(page.getByText(/choose from expertly designed/i)).toBeVisible();
  });

  test("course detail loads for valid id", async ({ page }) => {
    await page.goto("/course/1");
    await expect(page.locator("h1")).not.toContainText("Course not found");
  });

  test("enroll and continue to player", async ({ page }) => {
    await page.goto("/course/1");
    const enrollBtn = page.getByRole("button", { name: /enroll now/i });
    if (await enrollBtn.isVisible()) {
      await enrollBtn.click();
      await expect(page).toHaveURL(/\/course\/1\/learn/);
    }
  });
});
