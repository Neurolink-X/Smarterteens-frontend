import { test, expect } from "@playwright/test";

test.describe("Footer chat", () => {
  test("chat button is visible and has accessible label", async ({ page }) => {
    await page.goto("/");
    const chatButton = page.getByRole("button", { name: /open chat/i });
    await expect(chatButton).toBeVisible();
  });

  test("opening chat shows SmarterBot and input", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /open chat/i }).click();
    await expect(page.getByText(/smarterbot/i)).toBeVisible();
    await expect(page.getByPlaceholder(/type your message/i)).toBeVisible();
  });

  test("sending a message shows in thread", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /open chat/i }).click();
    await page.getByPlaceholder(/type your message/i).fill("Hello");
    await page.getByRole("button", { name: /send/i }).click();
    await expect(page.getByText("Hello")).toBeVisible();
  });

  test("close chat hides window", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /open chat/i }).click();
    await expect(page.getByPlaceholder(/type your message/i)).toBeVisible();
    await page.getByRole("button", { name: /close chat/i }).click();
    await expect(page.getByPlaceholder(/type your message/i)).not.toBeVisible();
  });
});
