import { Page, BrowserContext, expect } from "@playwright/test";
import { BasePage } from "./base.page";
import { generateScreenshotPath } from "../utils/screenshot.utils";

export class DonationsPage extends BasePage {
  constructor(page: Page, private browserContext: BrowserContext) {
    super(page);
  }

  // INFO: DONATIONS PAGE LOCATORS
  heading = this.page
    .locator("h2")
    .filter({ hasText: "Track and manage everything" });

  // INFO: DONATIONS PAGE ACTIONS
  async navigateToDonations() {
    await this.clickMenuItem("Donations");
    await expect(this.page).toHaveURL(/donations/);
    await expect(this.heading).toBeVisible();
  }

  async takeScreenshot(testName: string) {
    await this.page.screenshot({
      path: generateScreenshotPath(testName, this.browserContext),
    });
  }
}
