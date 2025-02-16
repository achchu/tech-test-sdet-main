import { expect, test } from "@playwright/test";

test.describe("Wikipedia search functionality", () => {
  test("should search for 'Playwright' and navigate to the correct page", async ({
    page,
  }) => {
    // Navigate to Wikipedia main page
    await page.goto("https://wikipedia.org/");

    // Type in the search box and enter
    await page.locator('input[name="search"]').fill("Playwright");

    // Wait for search suggestions and click on the correct one
    const suggestion = page.locator(
      'a.suggestion-link[href*="Playwright_(software)"]'
    );
    await expect(suggestion).toBeVisible();
    await suggestion.click();

    // Verify navigation to the correct page
    await expect(page).toHaveURL(
      "https://en.wikipedia.org/wiki/Playwright_(software)"
    );

    await expect(page.locator("#firstHeading")).toHaveText(
      "Playwright (software)"
    );
  });
});
