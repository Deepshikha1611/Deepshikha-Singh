import { test, expect } from "@playwright/test";
import { login } from "../utils/testHelpers";

test.describe("Create Account and Envelope", () => {
  test("should add an account and debt", async ({ page }) => {
    await login(page, process.env.GB_EMAIL!, process.env.GB_PASSWORD!);
    await page.locator('a[data-target="accounts"]').click();
    await page.locator('#wrapper-accounts a:has-text("Add / Edit")').click();
    await page.locator("input.bank-controls-input").first().fill("Savings");
    const amountField = page.locator("input.amount.pull-right");
    await expect(amountField).toBeVisible();
    await amountField.fill("10000");
    await page.locator('#debt-list button:has-text("Add")').click();
    await page.getByPlaceholder("Name").fill("car loan");
    const balanceInput = page.locator(
      'label:has-text("Current Balance") + input'
    );
    await balanceInput.fill("1000");
    const paymentInput = page.locator(
      'label:has-text("Monthly Payment") + input'
    );
    await paymentInput.fill("100");
    const dropdowns = page.locator(".edit-debt-row select");
    for (let i = 0; i < (await dropdowns.count()); i++) {
      const html = await dropdowns.nth(i).innerHTML();
      if (html.includes("[NEW] Debt Payment")) {
        await dropdowns.nth(i).selectOption({ value: "New" });
        break;
      }
    }
    const interestInput = page.locator(
      'label:has-text("Interest Rate") + input'
    );
    await interestInput.fill("1");
    await page.click('button:has-text("Done")');
    await page.click("#save-accounts-btn");
    await page.click("#fillEnvelopesModalNo");
  });

  test("delete existing account", async ({ page }) => {
    const demo_acc = "My Account";
    await login(page, process.env.GB_EMAIL!, process.env.GB_PASSWORD!);
    //Delete the account and debt
    await page.locator('a[data-target="accounts"]').click();
    await page.locator('#wrapper-accounts a:has-text("Add / Edit")').click();
    await page.waitForSelector("ul.account-list li", { state: "visible" });
    const removeBtn = page.locator("ul.account-list a.btn-remove").first();
    await removeBtn.click({ force: true });
    await page.click('button:has-text("Delete")');
    await page.locator("debt-list .btn-remove").click({ force: true });
    await page.click('input.delete-account[type="checkbox"]');
    await page.locator('input.delete-envelope[type="checkbox"]').check();
    await page.click('button:has-text("Delete (2)")');
    //Demo empty account
    await page.locator('#asset-list button:has-text("Add")').click();
    const input1 = page.locator("input.bank-controls-input");
    await expect(input1).toBeVisible();
    await input1.fill(demo_acc);
    const amountField1 = page.locator("input.amount.pull-right");
    await expect(amountField1).toBeVisible();
    await amountField1.fill("0.00");
    await page.click("#save-accounts-btn");
    await page.waitForTimeout(1000);
    await page.locator('a[data-target="accounts"]').click();
    const matches = await page
      .locator("#wrapper-accounts strong.name")
      .allInnerTexts();
    expect(matches.some((text) => text.includes(demo_acc))).toBeTruthy();
  });
  test("should add an envelope", async ({ page }) => {
    await login(page, process.env.GB_EMAIL!, process.env.GB_PASSWORD!);
    await page.locator('a[data-target="envelopes"]').click();
    await page.locator('#wrapper-envelopes a:has-text("Add / Edit")').click();
    await page.locator('input.name[type="text"]').first().fill("Grocery");
    await page.locator('input.amount[type="text"]').first().fill("300");
    await page.locator('button.btn.btn-ok:has-text("Edit")').first().click();
    await page.selectOption("select.monthStartDay.dayOfMonth", { value: "1" });
    await page.locator('input.name[type="text"]').nth(1).fill("Electricity");
    await page.locator('input.amount[type="text"]').nth(1).fill("100");
    await page.click('button:has-text("Save Changes")');
    await page.waitForTimeout(1000);
  });
});
