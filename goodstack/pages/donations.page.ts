import { Page, expect } from "@playwright/test";
import { BasePage } from "./base.page";

export class DonationsPage extends BasePage {
  constructor(page: Page) {
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
}
