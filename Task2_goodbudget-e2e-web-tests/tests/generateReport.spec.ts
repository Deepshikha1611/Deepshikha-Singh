import { test, expect } from "@playwright/test";
import { login } from "../utils/testHelpers";

test.describe("Reports", () => {
  test("view spending by envelope report", async ({ page }) => {
    await login(page, process.env.GB_EMAIL!, process.env.GB_PASSWORD!);

    await page.click('a.toplevelnav:has-text("Reports")');
    await page.click('a:has-text("Spending by Envelope")');
    const envelopeDropdown = page.locator("select#envelope");
    const refreshButton = page.locator("button#recalculate");

    const options = await envelopeDropdown.locator("option").all();

    for (const option of options) {
      const value = await option.getAttribute("value");
      const label = await option.textContent();
      if (value) {
        console.log(`Selecting: ${label?.trim()} (${value})`);
        await envelopeDropdown.selectOption({ value });
        await page.waitForTimeout(1500);
        await refreshButton.click();
        await page.waitForLoadState("networkidle");
      }
    }
  });

  test("view spending by payee report", async ({ page }) => {
    await login(page, process.env.GB_EMAIL!, process.env.GB_PASSWORD!);

    await page.click('a.toplevelnav:has-text("Reports")');
    await page.click('a:has-text("Spending by Payee")');
    const envelopeDropdown = page.locator("select#envelope");
    const refreshButton = page.locator("button#recalculate");

    const options = await envelopeDropdown.locator("option").all();

    for (const option of options) {
      const value = await option.getAttribute("value");
      const label = await option.textContent();
      if (value) {
        console.log(`Selecting: ${label?.trim()} (${value})`);
        await envelopeDropdown.selectOption({ value });
        await page.waitForTimeout(1500);
        await refreshButton.click();
        await page.waitForLoadState("networkidle");
      }
    }
  });
});
