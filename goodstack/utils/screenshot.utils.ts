import { BrowserContext } from "@playwright/test";
import path from "path";

export function generateScreenshotPath(
  testName: string,
  browser: BrowserContext
) {
  const browserType = browser.browser()?.browserType().name() || "unknown";
  const sanitizedTest = testName.replace(/[^a-z0-9]/gi, "_").toLowerCase();
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");

  return path.join(
    "screenshots",
    `${sanitizedTest}_${browserType}_${timestamp}.png`
  );
}
