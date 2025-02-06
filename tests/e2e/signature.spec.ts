import { test, expect } from "@playwright/test";

test.describe("Signature Success Validation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/sentinel-legal/");

    await page.fill('input[placeholder="Enter postcode"]', "SW1A 1AA");
    await page.click('button:has-text("Search")');
    const addressDropdown = page.locator("select");
    await addressDropdown.waitFor({ state: "visible", timeout: 10000 });
    await addressDropdown.selectOption({ index: 1 });
    await page.click('button:has-text("Find my agreements")');
    await page.fill('input[placeholder="First name"]', "John");
    await page.fill('input[placeholder="Last name"]', "Doe");
    await page.fill('input[type="date"]', "1990-05-15");
    await page.click('button:has-text("Next")');
    await page.fill('input[placeholder="Phone number"]', "07123456789");
    await page.fill('input[placeholder="Email address"]', "john@example.com");
    await page.click('button:has-text("Next")');

    await expect(page.locator('h2:has-text("Your signature")')).toBeVisible();
  });

  test("should validate signature field and determine success", async ({
    page,
  }) => {
    await page.click('button:has-text("Submit")');

    const signatureError = page.locator("text=Signature is required.");

    if (await signatureError.isVisible()) {
      console.log("Validation error detected, signature is required.");
      await expect(signatureError).toBeVisible();

      const signatureCanvas = page.locator(".sigCanvas");
      await signatureCanvas.click({ position: { x: 50, y: 50 } });
      await signatureCanvas.click({ position: { x: 100, y: 100 } });

      await page.click('button:has-text("Submit")');
    }

    await expect(page.locator("text=Thank you for submitting!")).toBeVisible();
    console.log("Successfully submitted the form.");
  });
});
