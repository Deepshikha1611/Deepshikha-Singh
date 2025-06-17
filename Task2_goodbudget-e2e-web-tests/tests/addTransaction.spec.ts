import { test, expect } from "@playwright/test";
import { login } from "../utils/testHelpers";

test.describe("Add Transaction", () => {
  test("should add an expense", async ({ page }) => {
    const memo = "Test grocery expense";
    await login(page, process.env.GB_EMAIL!, process.env.GB_PASSWORD!);
    await page.click('a:has-text("Add Transaction")');
    await page.fill("#expense-date", "06/17/2025");
    await page.fill("#expense-receiver", memo);
    await page.fill("#expense-amount", "-50");
    const dropdowns = page.locator('select[name="envelopeUuid"]');

    for (let i = 0; i < (await dropdowns.count()); i++) {
      const dropdown = dropdowns.nth(i);
      if (!(await dropdown.isVisible())) continue;

      const options = await dropdown.locator("option").allInnerTexts();
      const match = options.find((o) => o.trim().startsWith("Grocery"));
      if (match) {
        await dropdown.selectOption({ label: match.trim() });
        break;
      }
    }
    const dropdown = page.locator('#expenseCredit select[name="accountUuid"]');
    const options = await dropdown.locator("option").allInnerTexts();

    for (const label of options) {
      if (label.includes("Savings")) {
        await dropdown.selectOption({ label: label.trim() });
        break;
      }
    }

    await page.fill("#expense-checkNum", "465");
    await page.fill("#expense-notes", "This is a test note.");
    await page.click("#addTransactionSave");

    await expect(page.locator("#transactions tbody")).toContainText(memo);
    await page.waitForSelector(".modal-backdrop.fade.in", {
      state: "detached",
      timeout: 5000,
    });
    await page
      .locator("#transactions tbody")
      .locator(`text=${memo}`)
      .first()
      .click();
    await page.click("#addTransactionDelete");
  });

  test("should show error on missing amount", async ({ page }) => {
    await login(page, process.env.GB_EMAIL!, process.env.GB_PASSWORD!);
    await page.click('a:has-text("Add Transaction")');
    await page.fill("#expense-amount", "Missing amount test");
    await page.click("#addTransactionSave");
    await expect(page.locator('label[for="expense-amount"].error')).toHaveText(
      "Please enter an amount with no commas, letters, or symbols."
    );
  });

  test("should add a transfer", async ({ page }) => {
    const name = "Electrical expense";
    await login(page, process.env.GB_EMAIL!, process.env.GB_PASSWORD!);
    await page.click('a:has-text("Add Transaction")');
    await page.click('a:has-text("Transfer")');
    await page.fill("#transfer-date", "06/17/2025");
    await page.fill("#transfer-name", name);
    await page.fill("#transfer-amount", "100");
    await page.selectOption("#transfer-type", { label: "Envelope Transfer" });
    const dropdowns = page.locator('select[name="transfer-from"]');
    for (let i = 0; i < (await dropdowns.count()); i++) {
      const dropdown = dropdowns.nth(i);
      if (!(await dropdown.isVisible())) continue;

      const options = await dropdown.locator("option").allInnerTexts();
      const match = options.find((option) => option.includes("Available"));
      if (match) {
        await dropdown.selectOption({ label: match.trim() });
        break;
      }
    }
    const dropdown = page.locator('select[name="transfer-to"]');
    const options = await dropdown.locator("option").allInnerTexts();
    for (const label of options) {
      if (label.includes("Electricity")) {
        await dropdown.selectOption({ label: label.trim() });
        break;
      }
    }
    await page.fill("#transfer-note", "This is a test transfer note.");
    await page.click("#addTransactionSave");

    await expect(page.locator("#transactions tbody")).toContainText(name);
    await page
      .locator("#transactions tbody")
      .locator(`th.payee strong:has-text("${name}")`)
      .first()
      .click();
    await page.click("#addTransactionDelete");
  });
});
