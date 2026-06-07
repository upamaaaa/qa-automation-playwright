# TEST PLAN — SauceDemo Automation Suite

## 1. Introduction

| Field | Details |
|---|---|
| **Project** | QA Automation Assessment |
| **Application Under Test** | [SauceDemo](https://www.saucedemo.com) |
| **Automation Framework** | Playwright + TypeScript |
| **Author** | Upama Pokharel |
| **Version** | 1.0.0 |

---

## 2. Scope

### 2.1 In Scope
- **UI Automation** — Login, product browsing, cart operations, checkout flow, sorting/filtering
- **API Automation** — RESTful API tests via `jsonplaceholder.typicode.com`
- **Negative Testing** — Invalid credentials, empty forms, unauthorized API access
- **Cross-browser** — Chromium (primary), Firefox, WebKit

### 2.2 Out of Scope
- Performance / load testing
- Mobile device emulation (beyond viewport)
- Backend database verification
- Payment gateway integration (no real payment in demo)

---

## 3. Test Environment

| Property | Value |
|---|---|
| Base URL | `https://www.saucedemo.com` |
| API Base URL | https://reqres.in/api |
| API Base URL 2 | https://jsonplaceholder.typicode.com |
| Browsers | Chromium, Firefox, WebKit |
| Node.js | 24.16.0 |
| Playwright | `1.60.0` |

### Credentials
| User Type | Username | Password |
|---|---|---|
| Standard | `standard_user` | `secret_sauce` |
| Locked Out | `locked_out_user` | `secret_sauce` |
| Problem User | `problem_user` | `secret_sauce` |

---

## 4. Test Cases

### 4.1 UI Test Cases

| TC ID | Title | Priority | Type |
|---|---|---|---|
| UI-001 | Successful login with standard_user | High | Positive |
| UI-002 | Login with locked_out_user shows error | High | Negative |
| UI-003 | Login with empty username and password | High | Negative |
| UI-004 | Product list loads after login | High | Positive |
| UI-005 | Sort products by Price (low to high) | Medium | Positive |
| UI-006 | Sort products by Name (Z to A) | Medium | Positive |
| UI-007 | Add product to cart from inventory page | High | Positive |
| UI-008 | Remove product from cart | High | Positive |
| UI-009 | Complete full checkout flow | High | Positive |
| UI-010 | Checkout with empty first name shows error | High | Negative |
| UI-011 | Navigate to product detail page | Medium | Positive |
| UI-012 | Cart badge count updates correctly | Medium | Positive |
| UI-013 | Logout clears session and redirects to login | High | Positive |
| UI-014 | Add multiple products and verify cart total | Medium | Positive |

### 4.2 API Test Cases

| TC ID | Title | Priority | Type |
|---|---|---|---|
| API-001 | GET /users — returns list of users | High | Positive |
| API-002 | POST /posts — creates resource and returns 201 | High | Positive |
| API-003 | GET /users/1 — returns correct user | Medium | Positive |
| API-004 | GET /users/9999 — returns 404 for unknown user | Medium | Negative |
| API-005 | GET /posts — returns 100 posts | High | Positive |
| API-006 | GET /posts/9999 — returns 404 for unknown post | High | Negative |
| API-007 | PUT /posts/1 — updates resource and returns 200 | Medium | Positive |
| API-008 | DELETE /posts/1 — deletes resource and returns 200 | Low | Positive |
| API-009 | GET /comments?postId=1 — returns comments with emails | Medium | Positive |
| API-010 | GET /posts?userId=1 — filters posts by user | Low | Positive |

---

## 5. Edge Cases

| ID | Scenario | Expected Behaviour |
|---|---|---|
| EC-001 | SQL injection in login fields | Login fails gracefully, no crash |
| EC-002 | XSS payload in checkout first name field | Input is sanitized, no script execution |
| EC-003 | Back navigation after logout | Redirected to login (session cleared) |
| EC-004 | Sort dropdown with single item in cart | Sort still works correctly |
| EC-005 | Checkout with special chars in postal code | Accepted or validation error (not crash) |

---

## 6. Risks & Mitigations

| Third-party API going paid | High | High | Switched from JSONPlaceholder permanently if public API restrictions occur |

---

## 7. Entry / Exit Criteria

### Entry
- Application is accessible at base URL
- Environment variables configured (`.env`)
- Dependencies installed (`npm ci`)

### Exit
- All P1 (High) tests pass
- Test report generated with screenshot on failure
- No unhandled exceptions in console output

---

## 8. Reporting

- **HTML Report** — `playwright-report/index.html`
- **Trace Viewer** — `.zip` trace per failed test
- **Screenshots** — Captured automatically on failure
- **CI** — GitHub Actions badge on README
