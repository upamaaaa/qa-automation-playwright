# QA Automation — Playwright + TypeScript

[![Playwright Tests](https://github.com/upamaaaa/qa-automation/actions/workflows/playwright.yml/badge.svg)](https://github.com/upamaaaa/qa-automation/actions/workflows/playwright.yml)

End-to-end UI and API test automation suite for [SauceDemo](https://www.saucedemo.com), built with **Playwright** and **TypeScript** following the **Page Object Model** pattern.

---

##  Project Structure

```
qa-automation/
├── .github/
│   └── workflows/
│       └── playwright.yml        # GitHub Actions CI/CD
├── fixtures/
│   └── index.ts                  # Custom test fixtures (POM injection)
├── pages/                        # Page Object Models
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   └── ProductDetailPage.ts
├── tests/
│   ├── ui/                       # UI flow tests
│   │   ├── login.spec.ts
│   │   ├── inventory.spec.ts
│   │   ├── cart.spec.ts
│   │   └── checkout.spec.ts
│   ├── api/                      # API tests
│   │   ├── reqres.spec.ts
│   │   └── jsonplaceholder.spec.ts
│   └── negative/                 # Negative test cases
│       └── negative.spec.ts
├── utils/
│   ├── apiHelper.ts              # API request wrapper
│   ├── sortHelpers.ts            # Array sort utilities
│   └── testData.ts               # Centralised test data
├── .env.example                  # Environment variable template
├── playwright.config.ts          # Playwright configuration
├── tsconfig.json
├── package.json
└── TEST_PLAN.md                  # Full test plan
```

---


##  Setup & Installation

```bash
# 1. Clone the repository
git clone https://github.com/upamaaaa/qa-automation.git
cd qa-automation

# 2. Install Node dependencies
npm ci

# 3. Install Playwright browsers
npx playwright install --with-deps

# 4. Configure environment
cp .env.example .env
# Edit .env if needed (defaults work out of the box for SauceDemo)
```

---

##  Running Tests

### Run all tests
```bash
npm test
```

### Run only UI tests
```bash
npm run test:ui
```

### Run only API tests
```bash
npm run test:api
```

### Run only negative tests
```bash
npm run test:negative
```

### Run in headed mode (watch the browser)
```bash
npm run test:headed
```

### Run specific browser
```bash
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Run a specific test file
```bash
npx playwright test tests/ui/login.spec.ts
```

### Run with trace (for debugging)
```bash
npm run test:trace
```

---

##  Reports

### Open HTML report
```bash
npm run test:report
```

The report opens at `playwright-report/index.html` and includes:
-  Test results with pass/fail status
-  Screenshots on failure
-  Video recordings on first retry
-  Trace viewer for step-by-step debugging

### View a trace
```bash
npx playwright show-trace test-results/<test-name>/trace.zip
```

---

##  Test Coverage

### UI Tests (SauceDemo)

| ID | Scenario | File |
|---|---|---|
| UI-001 | Successful login | login.spec.ts |
| UI-002 | Locked user login error | login.spec.ts |
| UI-003 | Empty credentials error | negative.spec.ts |
| UI-004 | Product list loads | inventory.spec.ts |
| UI-005 | Sort by price (low→high) | inventory.spec.ts |
| UI-006 | Sort by name (Z to A) | inventory.spec.ts |
| UI-007 | Add product to cart | cart.spec.ts |
| UI-008 | Remove product from cart | cart.spec.ts |
| UI-009 | Complete checkout flow | checkout.spec.ts |
| UI-010 | Empty checkout form validation | checkout.spec.ts |
| UI-011 | Product detail page navigation | inventory.spec.ts |
| UI-012 | Cart badge count accuracy | cart.spec.ts |
| UI-013 | Logout and session clear | login.spec.ts |
| UI-014 | Multiple products in cart | cart.spec.ts |

### API Tests

| ID | Endpoint | File |
|---|---|---|
| API-001 | GET /users (paginated) | reqres.spec.ts |
| API-002 | POST /users (create) | reqres.spec.ts |
| API-003 | GET /users/:id | reqres.spec.ts |
| API-004 | GET /users/999 (404)  | reqres.spec.ts |
| API-005 | POST /login (token) | reqres.spec.ts |
| API-006 | POST /login (missing password)  | reqres.spec.ts |
| API-007 | GET /posts (JSONPlaceholder) | jsonplaceholder.spec.ts |

### Negative Tests
- Invalid login credentials (SQL injection, wrong password, empty fields)
- Empty checkout form fields
- Unauthorized / malformed API requests

---

##  Architecture

### Page Object Model

Each page has a dedicated class under `pages/` with:
- **Typed Locators** — using `data-test` attributes for stability
- **Action methods** — `login()`, `addToCartByName()`, `proceedToCheckout()`
- **Assertion helpers** — `expectLoaded()`, `expectError()`

### Custom Fixtures (`fixtures/index.ts`)

Extends `@playwright/test` to inject page objects and an `authenticatedPage` that handles login automatically, keeping tests DRY.

### Utilities

- `testData.ts` — single source of truth for users, products, and API URLs
- `apiHelper.ts` — thin wrapper with `assertJson()` and `assertStatus()` helpers
- `sortHelpers.ts` — `isAscending()`, `isDescending()`, `sortedAsc()`, `sortedDesc()`

---

##  CI/CD (GitHub Actions)

Tests run automatically on:
- Every push to `main` and `develop`
- Every pull request to `main`
- Daily at 06:00 UTC

Matrix strategy runs Chromium, Firefox, and WebKit in parallel.
Artifacts (HTML report + traces) are uploaded on every run.

---

##  Configuration

All configuration lives in `playwright.config.ts`:

| Setting | Value |
|---|---|
| `retries` | 2 on CI, 0 locally |
| `workers` | 2 on CI, auto locally |
| `trace` | `on-first-retry` |
| `screenshot` | `only-on-failure` |
| `video` | `on-first-retry` |
| `actionTimeout` | 10 s |
| `navigationTimeout` | 30 s |

---

## Test Plan

See [TEST_PLAN.md](./TEST_PLAN.md) for the full scope, test cases, edge cases, and risk register.
