import { expect, test } from "@playwright/test";
import { BasePage } from "../pages/base.page";
import { DonationsPage } from "../pages/donations.page";

test.describe("Navigate to Donations page", () => {
  test("should navigate to the donations page and verify the page", async ({
    page,
    context,
  }) => {
    const homePage = new BasePage(page);
    await homePage.visit();
    const donationsPage = new DonationsPage(page, context);

    //Navigate to the donations page
    await page.locator("nav button:has-text('Products')").click();
    await page.locator("nav li a:has-text('Donations')").click();

    //Wait for URL confirmation instead of using timeout
    await expect(page).toHaveURL(/donations/);

    // Validate the heading's visibility
    const heading = page.locator("h2:has-text('Track and manage everything')");
    await expect(heading).toBeVisible();

    await donationsPage.takeScreenshot("donations-page");
  });
});
