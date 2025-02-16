import { expect, test } from "@playwright/test";
import { GoodstackPage } from "../pages/base.page";

test.describe("Navigate to Donations page", () => {
  test("should navigate to the donations page and verify the page", async ({
    page,
  }) => {
    const homePage = new GoodstackPage(page);
    await homePage.visit();

    //Navigate to the donations page
    await page.locator("nav button:has-text('Products')").click();
    await page.locator("nav li a:has-text('Donations')").click();

    //Wait for URL confirmation instead of using timeout
    await expect(page).toHaveURL(/donations/);

    // Validate the heading's visibility
    const heading = page.locator("h2:has-text('Track and manage everything')");
    await expect(heading).toBeVisible();

    // Take a screenshot of the page. Using timestamp to avoid overwriting existing screenshots
    // Could have used UUID instead of timestamp but i didn't want add an extra dependency and this is simple and is readable
    const timestamp = new Date().toISOString().replace(/[-:Z]/g, "");
    await page.screenshot({ path: `screenshots/donations-${timestamp}.png` });
  });
});
