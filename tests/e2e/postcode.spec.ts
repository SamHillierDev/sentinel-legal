import { test, expect } from "@playwright/test";

test.describe("Postcode Entry and Address Selection Validation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/sentinel-legal/");
  });

  test("should handle valid postcode, select an address, and navigate to personal details", async ({
    page,
  }) => {
    await page.fill('input[placeholder="Enter postcode"]', "SW1A 1AA");
    await page.click('button:has-text("Search")');

    const addressDropdown = page.locator("select");
    await addressDropdown.waitFor({ state: "visible", timeout: 10000 });

    const addressOptions = await addressDropdown
      .locator("option")
      .allTextContents();
    expect(addressOptions.length).toBeGreaterThan(1);

    await addressDropdown.selectOption({ index: 1 });

    const findAgreementsButton = page.locator(
      'button:has-text("Find my agreements")',
    );
    await findAgreementsButton.waitFor({ state: "visible", timeout: 5000 });
    await expect(findAgreementsButton).toBeEnabled();

    await findAgreementsButton.click();
    await expect(
      page.locator('h2:has-text("Your personal details")'),
    ).toBeVisible();
  });

  test("should show an error for invalid postcode format", async ({ page }) => {
    await page.fill('input[placeholder="Enter postcode"]', "INVALID");
    await page.click('button:has-text("Search")');

    const errorMessage = page.locator(
      "text=The postcode you entered is invalid.",
    );
    await expect(errorMessage.first()).toBeVisible();
  });

  test("should handle no postcode entered", async ({ page }) => {
    await page.click('button:has-text("Search")');

    const errorMessage = page.locator("text=Please enter a postcode.");
    await expect(errorMessage.first()).toBeVisible();
  });

  test("should handle no addresses found scenario", async ({ page }) => {
    await page.fill('input[placeholder="Enter postcode"]', "ZZ99 9ZZ");
    await page.click('button:has-text("Search")');

    const noAddressMessage = page.locator(
      "text=No addresses found for this postcode.",
    );
    await expect(noAddressMessage.first()).toBeVisible();

    const addressDropdown = page.locator("select");
    await addressDropdown.waitFor({ state: "hidden", timeout: 5000 });
  });

  test("should not show 'Find my agreements' without address selection", async ({
    page,
  }) => {
    await page.fill('input[placeholder="Enter postcode"]', "SW1A 1AA");
    await page.click('button:has-text("Search")');

    const addressDropdown = page.locator("select");
    await addressDropdown.waitFor({ state: "visible", timeout: 10000 });

    const findAgreementsButton = page.locator(
      'button:has-text("Find my agreements")',
    );

    await expect(findAgreementsButton).toHaveCount(0, { timeout: 5000 });
  });
});
