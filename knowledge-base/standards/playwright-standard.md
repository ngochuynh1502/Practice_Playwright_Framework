# Playwright Automation Standard

## 1. Purpose

Define mandatory standards for generating, reviewing, and maintaining Playwright automation code in this project.

This standard applies to:

- Playwright test specifications
- Page objects and reusable UI components
- Fixtures, test data, and utilities
- Test setup and teardown
- Runtime validation and debugging

---

## 2. Technology and Language

- Use Playwright Test with TypeScript.
- Use `async`/`await` for all asynchronous Playwright operations.
- Code must pass TypeScript compilation with strict checking enabled.
- Do not hide errors by using `any`, `@ts-ignore`, `@ts-nocheck`, or by disabling strict compiler rules.
- Use the Playwright version and project conventions already defined in `package.json` and `playwright.config.ts`.

---

## 3. Project Structure

Follow the existing repository structure. Recommended locations:

```text
src/
  pages/               # Page objects
  components/          # Reusable UI components
  fixtures/            # Custom Playwright fixtures
  utils/               # Shared utilities
  test-data/           # Test data builders or datasets

tests/                 # Playwright spec files
playwright.config.ts   # Playwright configuration
```

Rules:

- Reuse existing files before creating new ones.
- Do not create duplicate page objects, components, fixtures, or utilities.
- Keep page behavior in page objects/components.
- Keep test orchestration and assertions in spec files.
- Keep environment values outside source code where practical.

---

## 4. Test Design

Each automated test must:

- Be traceable to an approved test case ID.
- Test one clear behavior or business outcome.
- Be independent and executable in any order.
- Initialize its own required state.
- Not depend on another test having already run.
- Use deterministic test data.
- Clean up created data when cleanup is supported and required.

Recommended naming:

```ts
test('TC_USER_001: displays required user columns', async ({ page }) => {
  // test implementation
});
```

Use `test.describe()` to group tests by requirement, feature, or suite:

```ts
test.describe('US-001: View User List - regression', () => {
  // tests
});
```

Use `test.step()` only for meaningful business-level actions or validations. Do not wrap every single Playwright command in a step.

---

## 5. Test Isolation and Lifecycle

- Use Playwright fixtures such as `page`, `context`, and `request` instead of launching browsers manually inside spec files.
- Use `test.beforeEach()` only for setup required by every test in the group.
- Use `test.afterEach()` only for cleanup required after every test.
- Do not call `browser.close()`, `context.close()`, or `page.close()` when using Playwright-provided fixtures.
- Await every asynchronous operation before the test completes.
- Do not store Playwright `Page`, `Locator`, or test state globally across tests.
- Avoid shared mutable data between parallel tests.

Example:

```ts
test.beforeEach(async ({ page }) => {
  userListPage = new UserListPage(page);
  await userListPage.navigateToUserList();
});
```

---

## 6. Navigation and Waiting

- Prefer `page.goto(url, { waitUntil: 'domcontentloaded' })` for pages with continuous background network activity.
- Do not use `networkidle` as a default readiness condition.
- After navigation, wait for a stable, feature-specific element that proves the page is ready.
- Prefer Playwright auto-waiting and web-first assertions.
- Do not add fixed waits such as `waitForTimeout()` unless validating time-dependent behavior or handling a documented application delay.
- Do not increase global timeouts to hide unstable locators or incorrect waits.

Preferred:

```ts
await page.goto(url, { waitUntil: 'domcontentloaded' });
await expect(page.getByRole('heading', { name: 'Web Tables' })).toBeVisible();
```

Avoid:

```ts
await page.goto(url);
await page.waitForLoadState('networkidle');
await page.waitForTimeout(5000);
```

---

## 7. Locator Standard

Use locators in this priority order:

1. `getByRole()` with an accessible name
2. `getByLabel()`
3. `getByPlaceholder()`
4. `getByText()` for stable visible text
5. `getByAltText()` or `getByTitle()`
6. `getByTestId()` when a stable test contract exists
7. Stable CSS selectors such as a unique ID

Rules:

- Verify locators against the actual UI or DOM before finalizing code.
- Do not invent fields, buttons, forms, or selectors from requirements alone.
- Prefer user-visible attributes and explicit test contracts.
- Avoid selectors based on generated classes, deep DOM structure, indexes, or styling.
- Avoid XPath unless no stable alternative exists.
- Every locator should identify one intended element.
- Use `.first()` or `.nth()` only when the business meaning of the index is explicit.
- Define reusable locators in page objects/components, not spec files.

Preferred:

```ts
this.addButton = page.getByRole('button', { name: 'Add' });
this.searchBox = page.locator('#searchBox');
```

Avoid:

```ts
this.addButton = page.locator('div.row > div:nth-child(2) button');
this.input = page.locator('.css-1a2b3c');
```

---

## 8. Page Object and Component Standard

Page objects and components must:

- Receive `Page` through the constructor.
- Declare locator fields using the `Locator` type.
- Initialize all locators in the constructor or an initialization method called by the constructor.
- Expose business-oriented methods.
- Encapsulate UI actions and element access.
- Reuse existing base classes and components where appropriate.
- Avoid duplicate locators and duplicate methods.

Page objects and components must not contain:

- `test()` or `test.describe()` blocks
- Test orchestration
- Business assertions using `expect()`
- Browser lifecycle management
- Test case-specific data embedded in methods

Example:

```ts
export class SearchFormComponent extends BasePage {
  private readonly searchBox: Locator;

  constructor(page: Page) {
    super(page);
    this.searchBox = page.locator('#searchBox');
  }

  async search(value: string): Promise<void> {
    await this.searchBox.fill(value);
  }

  async clear(): Promise<void> {
    await this.searchBox.clear();
  }
}
```

---

## 9. Assertions

- Use Playwright web-first assertions from `expect`.
- Assertions must map directly to approved expected results.
- Prefer assertions that retry automatically.
- Use specific assertions instead of broad boolean checks when practical.
- Include useful assertion messages for complex validations.
- Do not put test assertions in page objects or components.
- Do not assert implementation details that users cannot observe.

Preferred:

```ts
await expect(page.getByRole('heading', { name: 'Web Tables' })).toBeVisible();
await expect(rows).toHaveCount(10);
```

Avoid:

```ts
expect(await heading.isVisible()).toBe(true);
expect(await rows.count()).toBe(10);
```

Use soft assertions only when multiple independent results must be collected before failing the test.

---

## 10. Test Data Dependencies

Before implementation, analyze:

- Preconditions
- Required entities
- Required record quantities
- Required entity states
- Test data inputs
- Cleanup requirements

Rules:

- Search for existing factories, fixtures, API clients, setup utilities, and reusable creation flows.
- Prefer API, database utility, or fixture setup over repetitive UI setup when project rules allow it.
- Use UI setup only when the UI creation flow itself is part of the test objective or no approved alternative exists.
- Satisfy the minimum required data condition, not an arbitrary fixed volume.
- Do not assume the environment already contains the required data unless the test case explicitly defines it as controlled environment data.
- Make generated data unique when tests may run repeatedly or in parallel.
- Clean up data created by the test when cleanup is supported.
- If setup or teardown cannot be automated, clearly document the dependency instead of silently weakening the test.

Example dependency:

```text
Precondition: At least 11 users exist.
Setup: Determine the current count and create only the missing users.
Validation: Verify no more than 10 records are displayed on the first page.
Teardown: Remove only records created by this test when supported.
```

---

## 11. Test Data and Secrets

- Do not hard-code passwords, access tokens, connection strings, or private user data.
- Use environment variables or the project's approved secret-management approach.
- Keep reusable datasets separate from test logic.
- Generate unique values for email addresses, usernames, and identifiers when uniqueness is required.
- Do not use production data in automated tests.
- Do not log secrets or confidential values.

---

## 12. Error Handling

- Do not catch exceptions only to return `false` when the error should fail the test.
- Use `try/catch` only when recovery, cleanup, or explicit alternative behavior is required.
- Preserve the original error context when rethrowing.
- Do not hide locator, navigation, or assertion failures.
- Add diagnostic information only when it helps identify the root cause.

Avoid:

```ts
try {
  await this.submitButton.click();
  return true;
} catch {
  return false;
}
```

Preferred:

```ts
await this.submitButton.click();
```

---

## 13. Timeouts and Retries

- Use project defaults unless a test has a documented reason for a custom timeout.
- Fix the underlying wait, locator, data, or environment issue before increasing a timeout.
- Apply retries through Playwright configuration, usually for CI only.
- A passing retry does not automatically make a flaky test acceptable.
- Record and investigate flaky behavior.

---

## 14. Network and External Dependencies

- Do not test third-party behavior outside project control as part of the application assertion.
- Mock or route external network calls when project scope allows and deterministic responses are required.
- Validate application handling of the dependency, not the third-party implementation.
- Do not mock the behavior that the test is specifically intended to verify.

---

## 15. Configuration

`playwright.config.ts` should centrally manage applicable settings such as:

- `testDir`
- test timeout
- assertion timeout
- browser projects
- `baseURL`
- retries
- workers
- trace
- screenshot
- video
- reporter

Rules:

- Do not repeat configuration inside individual tests without a specific need.
- Prefer `baseURL` and relative navigation paths for project environments.
- Keep local and CI differences explicit and controlled.
- Use failure artifacts that support investigation, such as trace, screenshot, and video according to project policy.

---

## 16. Naming Conventions

### Files

```text
Page object:       <PageName>Page.ts
Component:         <ComponentName>Component.ts
UI spec:           <Requirement-or-Feature>-<Flow>.spec.ts
API spec:          <Requirement-or-Feature>-api.spec.ts
Fixture:           <Name>.fixture.ts
Test data:         <Feature>.data.ts
```

### Code

- Classes: `PascalCase`
- Methods and variables: `camelCase`
- Constants: `UPPER_SNAKE_CASE` or existing project convention
- Boolean methods: prefix with `is`, `has`, `can`, or `should`
- Methods should describe business intent, such as `addUser()` or `searchUser()`.
- Avoid vague method names such as `doAction()`, `handleData()`, or `clickButton1()`.

---

## 17. Spec File Standard

A spec file must:

- Import page objects using the correct repository-relative path or approved path alias.
- Create page objects in a fixture or appropriate setup hook.
- Follow Arrange, Act, Assert flow.
- Keep selectors out of the spec unless the selector is unique to one small test and project standards explicitly allow it.
- Avoid duplicate setup and assertion logic.
- Include the approved test case ID in the title or annotation.

Example:

```ts
import { test, expect } from '@playwright/test';
import { UserListPage } from '../src/pages/UserListPage';

test.describe('US-001: View User List - regression', () => {
  let userListPage: UserListPage;

  test.beforeEach(async ({ page }) => {
    userListPage = new UserListPage(page);
    await userListPage.navigateToUserList();
  });

  test('TC_USER_001: displays required columns', async () => {
    const headers = await userListPage.getTableHeaders();

    expect(headers).toEqual([
      'First Name',
      'Last Name',
      'Age',
      'Email',
      'Salary',
      'Department',
      'Action'
    ]);
  });
});
```

---

## 18. Validation Commands

Before completing generated or updated automation code, run the commands supported by the repository:

```bash
npx tsc --noEmit
npx playwright test --list
```

For the affected spec:

```bash
npx playwright test tests/<spec-file>.spec.ts --reporter=line
```

When debugging:

```bash
npx playwright test tests/<spec-file>.spec.ts --headed
npx playwright test tests/<spec-file>.spec.ts --debug
```

Completion requires:

- Zero TypeScript compilation errors
- Playwright configuration loads successfully
- The intended spec is discovered
- The affected tests have been executed when execution is in scope
- Failures are reported accurately and are not hidden

---

## 19. Review Checklist

Before finalizing, verify:

- [ ] Code follows the existing project structure.
- [ ] Test IDs map to approved test cases.
- [ ] Tests are independent and deterministic.
- [ ] Test data dependencies are handled.
- [ ] Locators were verified against the actual UI or DOM.
- [ ] User-facing or explicit-contract locators are preferred.
- [ ] No invented fields, forms, buttons, or behaviors exist.
- [ ] Page objects contain no test assertions or test blocks.
- [ ] Spec files contain no duplicated reusable locators.
- [ ] No unnecessary fixed waits exist.
- [ ] No default `networkidle` dependency exists for unstable pages.
- [ ] No `page.close()`, `context.close()`, or `browser.close()` is used with Playwright fixtures.
- [ ] No secrets or confidential data are hard-coded.
- [ ] No errors are suppressed with unsafe TypeScript workarounds.
- [ ] `npx tsc --noEmit` passes.
- [ ] `npx playwright test --list` passes.
- [ ] Runtime failures are analyzed using logs, screenshots, video, or trace.

---

## 20. Agent Execution Rules

When an AI agent generates or updates Playwright automation, the agent must:

1. Inspect the repository structure and existing automation assets.
2. Read approved test cases, preconditions, expected results, and test data.
3. Verify the target UI or DOM before creating locators.
4. Reuse existing page objects, components, fixtures, and utilities.
5. Generate only behavior supported by requirements and the actual application.
6. Separate page behavior, test orchestration, assertions, and test data.
7. Validate imports, types, and initialization.
8. Run TypeScript and Playwright discovery validation when execution tools are available.
9. Run only the affected tests when test execution is in scope.
10. Report changed files, root causes, validation commands, results, and remaining runtime risks.

The agent must stop and report a dependency when:

- Approved expected results are missing or not measurable.
- Required page objects or components are unavailable and cannot be generated in the current task.
- The requirement conflicts with the verified UI.
- Required data cannot be prepared using approved project mechanisms.
- The target environment is unavailable.

---

## 21. Prohibited Patterns

Do not generate or approve:

```ts
// Unsafe error suppression
const value: any = result;
// @ts-ignore
```

```ts
// Fragile waiting
await page.waitForTimeout(5000);
await page.waitForLoadState('networkidle');
```

```ts
// Browser fixture misuse
test('example', async ({ page }) => {
  await page.close();
});
```

```ts
// Assertion hidden in page object
async verifySuccess(): Promise<boolean> {
  return await this.successMessage.isVisible();
}
```

```ts
// Invented UI locator without DOM verification
page.locator('input[placeholder="First Name"]');
```

```ts
// Test dependency
test('create user', async () => { /* ... */ });
test('search created user', async () => { /* depends on previous test */ });
```

---

## 22. References

- Playwright official best practices: https://playwright.dev/docs/best-practices
- Playwright official locator guide: https://playwright.dev/docs/locators
- Project automation strategy and repository conventions
- Approved test cases and requirement analysis artifacts