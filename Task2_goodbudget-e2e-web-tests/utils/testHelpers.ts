import { Page, APIRequestContext, request } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

export async function login(page: Page, email: string, password: string) {
  await page.goto("https://goodbudget.com");
  await page.click("text=Log In");
  await page.fill("#username", email);
  await page.fill("#password", password);
  await page.getByRole("button", { name: "Log In" }).click();
  await page.waitForSelector("text=Add Transaction");
}

export async function getAuthToken(): Promise<string> {
  const context = await request.newContext();
  const response = await context.post("https://goodbudget.com/api/auth/login", {
    data: {
      email: process.env.GB_EMAIL,
      password: process.env.GB_PASSWORD,
    },
  });
  const body = await response.json();
  return body.token;
}
