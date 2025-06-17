# Exploratory Testing Report: GoodBudget Web App

**Date of Test:** 2025-06-14  
**Tester:** [Deepshikha Singh]  
**Browser Used:** Google Chrome (v125.0)  
**Test Duration:** 2 hours

---

## 1. Exploratory Testing Charters

| Charter ID | Charter Description                                   | Priority |
| ---------- | ----------------------------------------------------- | -------- |
| C1         | Account management (sign-up, login, logout)           | High     |
| C2         | Envelope and budget setup                             | High     |
| C3         | Transaction management                                | High     |
| C4         | Navigation and usability                              | Medium   |
| C5         | Accessibility and performance (Lighthouse)            | Low      |
| C6         | Browser storage and cookies                           | Medium   |
| C7         | Network behavior and API calls                        | Medium   |
| C8         | Cross-browser and responsive checks                   | Medium   |
| C9         | Security and privacy                                  | High     |
| C10        | Additional checks (XSS, network behavior, API errors) | Low      |

---

## 2. Findings from Testing Charters

### C1: Account Management

- Sign-up worked using a test email.
- Confirm password option not available while sign up.(![confirm password unavailable](<screenshots/confirm password on sign up.png>))
- Other details like username and other information were not asked during signup.(![ username and other information were not asked during signup](<screenshots/confirm password on sign up.png>))
- Email confirmation received.
- CAPTCHA was implemented.
- While logging in view password option was not available.(![view password not available](<screenshots/view password not available.png>))
- Passwords with minimal complexity were accepted.
- Login and logout worked most of the times correctly.
- Password reset functionality worked.
- REST auth calls were over HTTPS.

### C2: Envelope and Budget Setup

- Envelopes could not be created without entering an amount.
- Envelope term is not self explanatory, user should be provided more details.
- No Currency details available.
- Duplicate names were not allowed.
- Envelopes could be edited or deleted.
- Required field validation was available, but mandatory (\*) was not mentioned and error was only shown while saving.
- Invalid input in amount (negative values) was accepted.![negative values for amount](<screenshots/negative value in amount.png>)
- While deleting a debt, the cancel button on the pop up is not clickable as it is overlapped by another dialog.![overlapping popup](<screenshots/pop up overlap 2.png>) ![overlapping popup](<screenshots/pop up overlap 3.png>) ![overlapping popup](<screenshots/pop up overlap 4.png>) ![overlapping popup](<screenshots/pop up overlap1.png>)
- User is able to set up Credit cards, even when it has free subscription. If the user chooses pay in full option in Debt account, it automatically gets added in Credit Cards, it should not be the case ideally.![Credit Card auto addition](<screenshots/credit card option on free subscription error message.png>) ![Credit Card auto addition](<screenshots/credit card option on free subscription.png>)

### C3: Transaction Management

- Transactions (income/expense/transfer/debt) could be added, edited, and deleted.
- Transactions displayed correctly in history.
- Invalid inputs (letters, special characters) in amount field were not accepted.
- Error message not getting cleared after changing accounts (While transferring to and from accounts cant be same). Sometime even after changing the to or from account, the error keeps on showing.![Error message for chaning account](<screenshots/changing account still shows error msg.png>)
- In Debt Transaction, sometimes principle amount was getting auto adjusted on channging the interest but other times it did not.
- Even after auto adjust of principle amount, the error was showing and save option was not working.![Principle auto adjust](<screenshots/Principle auto adjust 2.png>) ![Principle auto adjust](<screenshots/Principle auto adjust.png>)
- On clicking the Edit button on Debt account, the delete button overlaps on the current balance amount text box.![close button overlap](<screenshots/close button overlapping amount.png>)

### C4: Navigation and Usability

- Tabbing through elements was consistent.
- Focus was not always clearly visible.
- App broke layout at 569x400 screen width, transaction table column data was trimmed.![layout issue](<screenshots/Mobile View.png>)
- Back and forward buttons worked as expected.
- Help texts and error messages were minimal but functional.![help message](<screenshots/help message not self explanatory.png>)

### C5: Accessibility & Performance

- Lighthouse score: Accessibility 96, Performance 86.![lighthouse report](<screenshots/lighthouse report.png>)
- Background and foreground colors do not have a sufficient contrast ratio.
- Links do not have a discernible name
- Heading elements are not in a sequentially-descending order

### C6: Storage and Cookies

- Sensitive data (username, budget metadata) was not found in localStorage.
- Cookies for session had Secure and HttpOnly flags set.

### C7: Network Behavior

- All major requests were HTTPS.
- No 4xx/5xx errors.
- GET/POST usage followed REST principles.

### C8: Cross-Browser and Responsive

- Firefox and Edge displayed UI correctly.
- Mobile view 569x400 showed layout breakage and clipped UI elements.

### C9: Security and Privacy

- None of the pages were accessible when unauthenticated.
- There was a CAPTCHA during sign up ut nothing at sign in.
- No session expiration observed.

### C10: Additional Areas

- App is vulnerable to XSS ![XSS issue](<screenshots/XSS issue.png>)
- The app is reasonably well-handled for offline scenarios.

---

## 3. Prioritization of Testing Charters

| Priority | Justification                                                                |
| -------- | ---------------------------------------------------------------------------- |
| High     | Account management, data security, and input validation issues are critical. |
| Medium   | Usability, API design, and storage affect user experience.                   |
| Low      | Performance and polish areas are not blocking core workflows.                |

---

## 4. Risks and Mitigations

| Area                   | Risk                                                              | Mitigation                                                         |
| ---------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------ |
| Account Management     | No password confirmation during sign-up                           | Add a "Confirm Password" field to reduce mistyped passwords        |
|                        | Weak passwords accepted                                           | Enforce stricter password policies                                 |
|                        | No view password option on login                                  | Provide option to toggle password visibility                       |
|                        | No username or additional identity details asked                  | Include profile enrichment in sign-up or onboarding                |
| Budget Setup           | Envelopes cannot be created without an amount                     | Allow zero-value creation or provide default values                |
|                        | Envelope term not user-friendly                                   | Add tooltips or short tutorial explanation                         |
|                        | Invalid input like negative values accepted                       | Validate and reject negative values                                |
|                        | Required fields lack proper indication                            | Use asterisks (\*) and inline validation messages                  |
| Transaction Management | Amount field sometimes misbehaved (e.g., principal not adjusting) | Fix logic for auto-adjust and consistent validation                |
|                        | Error not cleared on state change (e.g., account switch)          | Clear error messages when input is updated                         |
| Navigation & Usability | Focus not clearly visible                                         | Improve CSS focus visibility                                       |
|                        | UI breaks at small screen widths                                  | Use responsive design with breakpoints                             |
| Accessibility          | Color contrast insufficient                                       | Enhance contrast between text and background                       |
|                        | Heading structure is inconsistent                                 | Fix HTML semantics for better accessibility                        |
|                        | Link text missing                                                 | Use descriptive labels for all clickable links                     |
| Security & Privacy     | App is vulnerable to XSS                                          | Sanitize all user inputs on frontend and backend                   |
|                        | CAPTCHA missing on sign-in                                        | Add CAPTCHA to login page as well                                  |
|                        | No session expiration                                             | Implement session timeout policies                                 |
| Network & Offline      | No retry mechanism when network resumes                           | Add retry mechanism and user notification when network is restored |
|                        | Technical API errors shown to users                               | Replace with user-friendly error messages                          |

---

## 5. Tools Used

- Chrome DevTools: Network tab, Application tab
- Lighthouse: Performance and accessibility analysis
- Firefox, Safari: Manual cross-browser verification
- Mobile simulation: Chrome responsive design mode

---

**End of Report**
