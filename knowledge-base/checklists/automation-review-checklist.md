# Automation Review Checklist

Use this checklist during **Self-Validation** to ensure every AI-generated or manually written Playwright test meets the team's quality, maintainability, and reliability standards.


---

## Mandatory Quality Gates

| Category | Requirement | Fail Condition |
|-----------|-------------|----------------|
| **Flakiness** | Avoid hardcoded delays and timing dependencies. | **FAIL** if `page.waitForTimeout()`, `setTimeout()`, or any fixed sleep/wait mechanism is used. |
| **Locators** | Use resilient, user-centric selectors. | **FAIL** if absolute XPath, brittle CSS paths, or DOM-structure-dependent selectors are used instead of Playwright locators such as `getByRole()`, `getByText()`, `getByLabel()`, or `getByTestId()`. |
| **Assertions** | Apply Playwright web-first assertions. | **FAIL** if assertions rely on boolean checks (e.g., `expect(flag).toBe(true)`) when a web-first assertion such as `toBeVisible()`, `toHaveText()`, or `toBeEnabled()` should be used. |
| **Isolation** | Ensure tests are independent and repeatable. | **FAIL** if a test depends on data, state, or execution order from another test case or spec file. |
| **Type Safety** | Follow strict TypeScript standards. | **FAIL** if `any` is used without explicit justification and approval. |

---

## Self-Validation Checklist

### Core Automation Standards

- [ ] No hardcoded wait timeouts are used.
- [ ] Test execution is deterministic and resistant to flakiness.
- [ ] Web-first assertions are used throughout the test.
- [ ] Strict TypeScript typing is maintained.
- [ ] Test implementation follows the configured metadata and test workflow.

### Reusability & Maintainability

- [ ] Existing Page Objects are reused whenever applicable.
- [ ] Page Objects extend BasePage.
- [ ] URLs are retrieved from environment config, not hardcoded.
- [ ] Browser and environment settings use config instead of hardcoded values.
- [ ] Reusable Page Objects, fixtures, or API context controllers are maintained.
- [ ] No duplicate logic or unnecessary code exists.
- [ ] No unused variables, locators, imports, or helper methods remain.
- [ ] Naming conventions follow project standards.
- [ ] Reusable test data is stored under `src/testdata/US<ID>_<MODULE>/`.
- [ ] Test data is organized by the complete Test Case ID.
- [ ] Specs import test data instead of embedding reusable values.
- [ ] Valid, invalid, boundary, empty, special-character, and failure data are named separately where applicable.

### Test Coverage Validation

- [ ] All **Automation = Yes** test cases are implemented.
- [ ] No **Automation = No** test cases are implemented.
- [ ] Automation Coverage Report exists in `reports/` documenting all test cases.
- [ ] Coverage report includes **Implemented Test Cases** section with file references.
- [ ] Coverage report includes **Pending Test Cases** section with:
  - [ ] Test Case ID, Title, Priority
  - [ ] Reason (from standard categories)
  - [ ] Blocker status (Yes/No)
  - [ ] Target Resolution (Sprint/Date)
  - [ ] Notes with additional context
- [ ] Coverage report includes **Failed Test Cases** section (after test execution) with:
  - [ ] Test Case ID, Title, Status (✅ Fixed, 🔧 In Progress, ⏳ Pending, ❌ Blocked)
  - [ ] Root Cause (concise summary)
  - [ ] Fix Applied (what was done)
  - [ ] Notes with additional context
- [ ] Coverage report includes **Blocked Test Cases** section (if applicable).
- [ ] Coverage report includes **Manual Test Cases** section (if applicable) with reasons.
- [ ] Coverage report includes traceability to test case document and spec files.
- [ ] Positive and negative paths are covered where required.
- [ ] Assertions sufficiently validate expected outcomes.
- [ ] Each automated test has a matching test-data entry or an explicit reason that no data is required.
- [ ] Test data satisfies the minimum precondition without arbitrary excess records.
- [ ] Data is isolated and repeatable for parallel or repeated execution.

### Test Data Setup & Preconditions

- [ ] Tests verify preconditions BEFORE executing main logic.
- [ ] Tests use `test.skip()` to skip when preconditions cannot be met.
<!-- - [ ] Page Object includes `ensureMinimumUsers()` or similar methods to auto-setup test data **ONLY if data persists**. -->
- [ ] Auto-setup methods are NOT used when data only exists in current session (session-based, not persisted to database).
- [ ] For session-only data, tests accept `test.skip()` and document data requirements in Automation Coverage Report.
- [ ] Auto-generated test data uses unique identifiers (e.g., timestamp, counter) to avoid conflicts.
- [ ] Test data setup is efficient and only adds necessary records.
- [ ] Setup methods wait for data to be visible/stable before proceeding.
- [ ] Tests do NOT fail due to insufficient test data when auto-setup is available AND data persists.

### Code Quality Validation

- [ ] No hardcoded test data unless explicitly required.
- [ ] Error handling and cleanup are implemented where applicable.
- [ ] Test code is readable, maintainable, and self-explanatory.
- [ ] Logging and debugging statements are removed unless required.

### Build & Execution Validation

- [ ] Test scripts compile successfully.
- [ ] Linting passes successfully.
- [ ] Tests execute successfully in supported environments.
- [ ] No unstable or flaky test behavior is observed.

### Evidence & Screenshot Validation

- [ ] Validation and error-handling test cases capture screenshots of error states BEFORE dismissing dialogs or closing forms.
- [ ] Screenshot naming follows correct patterns:
  - [ ] `afterEach` hook: `YYYYMMDD_HHMMSS_<TestCaseID>.png` (e.g., `20260818_143000_US004_TC_DELETE_USER_001.png`)
  - [ ] Inline before/after: `YYYYMMDD_HHMMSS_<US-ID>_TC_XXX_<context>.png` (e.g., `20260818_143000_US004_TC_002_before_delete.png`)
  - [ ] Validation errors: `YYYYMMDD_HHMMSS_<US-ID>_TC_XXX_validation_error_<InvalidValue>.png`
- [ ] Screenshot filenames do NOT contain duplicate US-ID or feature names (test case ID already contains US-ID).
- [ ] Screenshot capture logic is placed AFTER assertion verifying error state is visible.
- [ ] Screenshot capture logic is placed BEFORE any dismiss/close action (Escape key, close button, etc.).
- [ ] `afterEach` hook screenshots capture final test state.
- [ ] For negative tests with multiple invalid inputs (loops), each iteration captures its own validation error screenshot.
- [ ] Screenshot evidence folder (`test-results/US<ID>-evidences/screenshots/`) contains both final state and validation error screenshots where applicable.

---

## Final Review Confirmation

Before submitting the automation script, confirm the following:

- [ ] Existing Page Objects reused.
- [ ] Naming conventions followed.
- [ ] Assertions implemented correctly.
- [ ] No duplicated code.
- [ ] No hardcoded waits.
- [ ] No unused locators.
- [ ] Test scripts compile successfully.
- [ ] Quality gates passed.

---

## Approval Statement

> I have reviewed this Playwright automation implementation and confirm that it satisfies all mandatory quality gates, coding standards, maintainability requirements, and self-validation criteria defined in this checklist.