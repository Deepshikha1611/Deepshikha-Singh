# Goodbudget E2E Test Automation

This project contains end-to-end UI test automation for the GoodBudget web application using **Playwright** with **TypeScript**. The test suite covers three high-priority user journeys:

1. Account, Debt and Envelope Creation, Deletion & Validation
2. Add a transaction (Transfer and Credit Transaction, error validation on missing amount)
3. Viewing report (Spending by envelope report and spending by payee report)

## Tech Stack

- Playwright
- TypeScript
- Node.js
- HTML Reporter

## Project Structure

```
Task2_WebUITests/
├── tests/
│   ├── accountCreation.spec.ts
│   ├── addTransaction.spec.ts
│   └── generateReport.spec.ts
├── playwright.config.ts
├── package.json
└── README.md
```

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/Deepshikha1611/Deepshikha-Singh.git
   cd goodbudget-e2e-tests
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Install Playwright browsers:

   ```bash
   npx playwright install
   ```

4. (Optional) Add your credentials in a `.env` file:
   ```
   GOODBUDGET_EMAIL=your_email@example.com
   GOODBUDGET_PASSWORD=your_password
   ```

## How to Run Tests

To execute all tests:

```bash
npx playwright test
```

To run tests in a specific browser (e.g., Chrome):

```bash
npx playwright test --project=chromium
```

To generate a test report:

```bash
npx playwright show-report
```

## Approach and Technology Stack

- **Playwright** was chosen for its cross-browser support (Chromium, Firefox, WebKit) and robust API for modern web automation.
- **TypeScript** adds static typing and better code maintainability.
- **Playwright Test Reports** provide rich visual feedback for test execution.
- Tests are organized by domain features:
  - `accountCreation.spec.ts`
  - `addTransaction.spec.ts`
  - `generateReport.spec.ts`

This structure promotes readability, reusability, and scalability of test coverage.

## Why Playwright?

- Supports all modern browsers out-of-the-box
- Powerful parallel execution
- Built-in reporters and CI compatibility
- Easy test setup and teardown

## CI & Enhancements

- Tests are cross-browser enabled: Chromium, Firefox, WebKit
- Easily adaptable to GitHub Actions or Docker for CI runs

## Run with Docker

```bash
docker build -t goodbudget-tests .
docker run goodbudget-tests
```
