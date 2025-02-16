import { Page, expect } from "@playwright/test";

export class BasePage {
  page: Page;
  url: string;

  constructor(page: Page, url: string = "https://goodstack.io") {
    this.page = page;
    this.url = url;
  }

  // INFO: GLOBAL LOCATORS
  menuElements = {
    root: () => this.page.locator("nav"),
    subMenuHeaderButton: (text: string) =>
      this.menuElements.root().locator("button").filter({ hasText: text }),
    headerLink: (text: string) =>
      this.menuElements.root().locator("li a").filter({ hasText: text }),
  };

  footerElements = {
    root: () => this.page.locator("footer"),
    footerLink: (text: string) =>
      this.footerElements.root().locator("a").filter({ hasText: text }),
  };

  // INFO: GLOBAL ACTIONS
  async visit(url?: string): Promise<void> {
    const targetUrl = url || this.url;
    await this.page.goto(targetUrl, { waitUntil: "networkidle" });
  }

  async clickMenuItem(menuItem: string) {
    const href = await this.menuElements
      .headerLink(menuItem)
      .getAttribute("href");
    await this.menuElements.headerLink(menuItem).click();
    return href;
  }

  async clickFooterLink(footerLink: string) {
    const href = await this.footerElements
      .footerLink(footerLink)
      .getAttribute("href");
    await this.footerElements.footerLink(footerLink).click();
    return href;
  }

  async waitForRedirectToUrl(url: string) {
    let retries = 5;
    while (retries-- > 0 && !this.page.url().includes(url)) {
      await this.page.waitForTimeout(2000);
    }
    expect(this.page.url()).toContain(url);
  }
}
