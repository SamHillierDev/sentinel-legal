import { test, expect } from "@playwright/test";

test.describe("Personal Details Success Validation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/sentinel-legal/");

    await page.fill('input[placeholder="Enter postcode"]', "SW1A 1AA");
    await page.click('button:has-text("Search")');
    const addressDropdown = page.locator("select");
    await addressDropdown.waitFor({ state: "visible", timeout: 10000 });
    await addressDropdown.selectOption({ index: 1 });
    await page.click('button:has-text("Find my agreements")');

    await expect(
      page.locator('h2:has-text("Your personal details")'),
    ).toBeVisible();
  });

  test("should validate personal details fields and determine success", async ({
    page,
  }) => {
    await page.click('button:has-text("Next")');

    const firstNameError = page.locator("text=First name is required");
    const lastNameError = page.locator("text=Last name is required");
    const dobError = page.locator(
      "text=You must be between 18 and 100 years old",
    );

    if (
      (await firstNameError.isVisible()) ||
      (await lastNameError.isVisible()) ||
      (await dobError.isVisible())
    ) {
      console.log(
        "Validation errors detected, staying on Personal Details page.",
      );

      await expect(firstNameError).toBeVisible();
      await expect(lastNameError).toBeVisible();
      await expect(dobError).toBeVisible();

      await page.fill('input[placeholder="First name"]', "John");
      await page.fill('input[placeholder="Last name"]', "Doe");
      await page.fill('input[type="date"]', "2010-01-01");

      await page.click('button:has-text("Next")');
      await expect(dobError).toBeVisible();

      await page.fill('input[type="date"]', "1990-05-15");

      await page.click('button:has-text("Next")');
    }

    await expect(
      page.locator('h2:has-text("Contact Information")'),
    ).toBeVisible();
    console.log("Successfully navigated to Contact Information step.");
  });
});
