import { test, expect } from "@playwright/test";

test.describe("Postcode Success Validation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/sentinel-legal/");
  });

  test("should validate postcode, select an address, and navigate to personal details", async ({
    page,
  }) => {
    await page.fill('input[placeholder="Enter postcode"]', "SW1A 1AA");
    await page.click('button:has-text("Search")');

    const addressDropdown = page.locator("select#address");
    await addressDropdown.waitFor({ timeout: 10000 });

    const addressOptions = await addressDropdown
      .locator("option")
      .allTextContents();
    if (addressOptions.length <= 1) {
      throw new Error("No addresses found in the dropdown");
    }
    console.log("Address options found:", addressOptions);

    await addressDropdown.selectOption({ index: 1 });

    const findAgreementsButton = page.locator(
      'button:has-text("Find my agreements")',
    );
    await findAgreementsButton.waitFor({ timeout: 5000 });
    await expect(findAgreementsButton).toBeEnabled();

    await findAgreementsButton.click();

    await expect(
      page.locator('h2:has-text("Your personal details")'),
    ).toBeVisible();
    console.log("Successfully navigated to Personal Details step.");
  });
});
