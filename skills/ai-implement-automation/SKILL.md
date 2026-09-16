---
name: ai-implement-automation
description: "Use when: implementing Playwright automation scripts from approved test cases using existing project assets."
---

# SKILL.md - AI Implement Automation

## 1. Purpose
<!-- Why the skill exists, business objective, primary responsibility -->

Implement maintainable Playwright automation scripts from approved test cases while maximizing reuse of existing project fixtures, page objects, components, and test data.

---

## 2. When to Use
<!-- Situations where the skill should be executed -->

- When approved and automation-ready test cases exist.
- When page objects/components are available or already generated.
- When new or updated spec files are required for regression, smoke, or functional coverage.

---

## 3. Do Not Use When
<!-- What the skill is NOT responsible for -->

- When test cases are not approved or lack clear expected outcomes.
- When the task is to generate page objects/components from scratch.
- When the task is only reviewing automation quality without implementation.

---

## 4. Inputs
<!-- Required and Optional inputs (no processing logic) -->

### Required
- Approved Test Case Document(s): Test cases selected for automation.
- Existing Automation Context: Relevant fixtures/page objects/components in the project.

### Optional
- Test Data Inputs: Dedicated datasets or environment-specific values.
- Execution Scope: Suite target (smoke, regression, functional, api, e2e).

### Test Data Location

Automation must keep test data separate from test logic under:

```text
src/testdata/US<ID>_<MODULE>/
```

Use one data module per User Story. Within that module, organize data by the complete
Test Case ID, for example:

```text
src/testdata/US002_Search User/US002.testdata.ts
```

Each test-case entry must identify its purpose and contain the smallest reusable data
set needed by that case. Keep valid, invalid, boundary, empty, special-character, and
failure data in separate named properties where applicable.

---

## 5. Outputs
<!-- Files generated, reports, documents with naming conventions -->

| Output | Format | Naming Convention |
| ------ | ------ | ----------------- |
| UI Automation Spec | TypeScript (`.spec.ts`) | `<Requirement-or-Feature>-<Flow>.spec.ts` |
| API Automation Spec (if applicable) | TypeScript (`.spec.ts`) | `<Requirement-or-Feature>-api.spec.ts` |
| Automation Coverage Report | Markdown (`.md`) | `Automation-Coverage-<US-ID>.md` |
| Playwright HTML Report | HTML | `test-results/<US-ID>-evidences/html-report/` |
| Screenshot Evidence | PNG | `test-results/<US-ID>-evidences/screenshots/` |

Output locations: `tests/`, `reports/`, `test-results/`

---

## 6. Workflow
<!-- High-level workflow steps only -->

```text
1. Load Knowledge -> 2. Read Input -> 3. Map Approved Cases to Reusable Automation Design -> 4. Generate Output -> 5. Run tests and capture evidence -> 6. Self Review
```

---

## 7. Knowledge Sources
<!-- Standards, Checklists, Templates, Examples to load -->

### Standards
- `standards/playwright-standard.md`
- `standards/assertion-standard.md`
- `standards/automation-coding-standard.md`
- `standards/automation-standard.md`

### Checklists
- `checklists/automation-review-checklist.md`

### Templates
- `templates/test.template.ts`
- `templates/api.template.ts`
- `templates/fixture.template.ts`

### Examples
- `examples/test-script-login-example.md`

---

## 8. Execution Rules
<!-- Execution sequence (read input, load knowledge, apply standards...) -->

1. Read approved test cases and identify automation-eligible scenarios.
2. Load Playwright, assertion, automation coding, and test-data standards.
3. Reuse existing page objects/components/fixtures/utilities before introducing new logic.
4. If BasePage or environment config does not exist, create them first.
5. Create or update `src/testdata/US<ID>_<MODULE>/` before creating the automation spec.
6. Map every automated test to its complete Test Case ID and import data from the User Story data module.
7. Import and use environment config for browser selection, timeout settings, and base URLs.
8. Implement traceable tests with clear arrange-act-assert flow.
9. Align assertions with expected results only; avoid unsupported checks.
10. Keep locators and page behavior encapsulated in page objects/components.
11. Generate Automation Coverage Report documenting:
    - **Implemented Test Cases**: All automated tests with file references
    - **Pending Test Cases**: Tests that skip or not yet implemented, with reasons and target resolution
    - **Failed Test Cases**: Tests that failed with root cause and fix status
    - **Blocked Test Cases**: Tests blocked by external issues
    - **Manual Test Cases**: Tests requiring manual execution with reasons
12. Run the requested suite with the Playwright HTML reporter and save the report under `test-results/<US-ID>-evidences/html-report/`.
13. Set `US_ID=<US-ID>` so Playwright saves all artifacts under `test-results/<US-ID>-evidences/`.
14. Add `afterEach` hook to save screenshots to `test-results/<US-ID>-evidences/screenshots/` with test case ID in filename.
15. Validate generated specs, data modules, coverage report, HTML report, and screenshots with the automation review checklist.

### Execution Evidence Rules

- Run only the requested User Story or suite, using the repository's configured environment and browser.
- Use the repository `playwright.config.ts`; HTML reporter is pre-configured.
- Set `US_ID=<US-ID>` before running so Playwright stores artifacts under `test-results/<US-ID>-evidences/`.
- Add `test.afterEach` hook to capture screenshots with timestamp + test case ID:
  ```typescript
  test.afterEach(async ({ page }, testInfo) => {
    const testCaseId = testInfo.title.split(' - ')[0].replace(/\s+/g, '_');
    const screenshotName = `${testRunTimestamp}_${testCaseId}`;
    await page.screenshot({
      path: `test-results/<US-ID>-evidences/screenshots/${screenshotName}.png`,
      fullPage: true,
    });
  });
  ```
- Screenshot naming pattern: `YYYYMMDD_HHMMSS_<TestCaseID>.png`
- Example: `20260818_143000_US004_TC_DELETE_USER_001.png`
- **Important:** Test case ID already contains US-ID, do NOT duplicate it in filename
- For inline screenshots (before/after), use: `${timestamp}_<US-ID>_TC_XXX_<context>.png`
- Example inline: `20260818_143000_US004_TC_002_before_delete.png`
- Save screenshots to `test-results/<US-ID>-evidences/screenshots/`.
- HTML report auto-generates at `test-results/<US-ID>-evidences/html-report/`.
- Do not create JSON, trace, video, or separate Markdown execution reports unless the user explicitly requests them.

### Validation Error Evidence Rules

**CRITICAL:** For validation and error-handling test cases, capture screenshots of the error state BEFORE dismissing dialogs or closing forms.

- **When to capture validation screenshots:**
  - Tests verifying validation failures (invalid email, out-of-range values, missing required fields)
  - Tests verifying error messages are displayed
  - Tests verifying form submission is blocked on invalid input
  - Any negative test where visual evidence of rejection/error is required

- **How to capture validation screenshots:**
  ```typescript
  // After verifying validation fail state
  await expect(dialog).toBeVisible();
  
  // Capture error state BEFORE closing
  await page.screenshot({
    path: `test-results/<US-ID>-evidences/screenshots/${timestamp}_<US-ID>_TC_XXX_validation_error_<InvalidValue>.png`,
    fullPage: true,
  });
  
  // Then close dialog/form
  await page.keyboard.press('Escape');
  ```

- **Filename pattern for validation screenshots:**
  - Format: `YYYYMMDD_HHMMSS_<US-ID>_TC_XXX_validation_error_<InvalidValue>.png`
  - Sanitize `<InvalidValue>` by replacing special characters with underscores
  - Example: `20260818_143000_US003_TC_005_validation_error_invalid_email.png`
  - **Note:** Do NOT include feature name (e.g., "Add-User") to avoid duplication with US-ID

- **Why this matters:**
  - `afterEach` hook captures final state AFTER test completes
  - If validation error is dismissed before test ends, final screenshot shows no error
  - Validation evidence is lost
  - Manual inline screenshots preserve error state for review

### Test Data Setup & Preconditions Rules

**CRITICAL:** Tests must NOT fail due to insufficient test data when setup methods are available.

- **Implement `ensureMinimumUsers(N)` in Page Objects:**
  ```typescript
  /**
   * Ensure minimum number of users exist by adding test users if needed
   */
  async ensureMinimumUsers(minimumCount: number): Promise<void> {
    const currentCount = await this.getVisibleRowCount();
    const usersToAdd = minimumCount - currentCount;

    if (usersToAdd > 0) {
      for (let i = 0; i < usersToAdd; i++) {
        const testUser: UserRecord = {
          firstName: `TestUser${currentCount + i + 1}`,
          lastName: `Auto${currentCount + i + 1}`,
          email: `testuser${currentCount + i + 1}@example.com`,
          age: String(25 + i),
          salary: String(50000 + i * 1000),
          department: 'QA',
        };
        await this.addUser(testUser);
      }
    }
  }
  ```

- **Call setup BEFORE precondition checks:**
  ```typescript
  test('Verify next record moves up', async ({ page }) => {
    // SETUP: Ensure minimum data exists
    await webTablesPage.ensureMinimumUsers(6);
    
    // CHECK: Verify precondition
    const users = await webTablesPage.getVisibleUsers();
    if (users.length < 6) {
      test.skip();
      return;
    }
    
    // ACT & ASSERT: Execute test logic
    // ...
  });
  ```

- **When to implement auto-setup:**
  - DELETE operations requiring multiple records
  - EDIT operations requiring specific data states
  - PAGINATION tests requiring minimum page counts
  - SEARCH tests requiring multiple matching records
  - Any test with preconditions that can be programmatically satisfied
  - **ONLY when test data persists** (database-backed, not session-only)

- **When NOT to use auto-setup:**
  <!-- - When added data only exists in current session (session-based, not persisted)
  - When page refreshes reset data to defaults -->
  - When data setup is expensive or slow
  - When test data isolation is required between test runs

- **Alternative: Accept test skips**
  - Use `test.skip()` when preconditions cannot be met
  - Document in Automation Coverage Report which tests require manual data setup
  - Example: "Requires 6+ users in database - manual setup needed"

- **Benefits:**
  - Eliminates test skips due to insufficient data (when data persists)
  - Makes tests self-sufficient and portable
  - Reduces manual test data preparation
  - Enables tests to run in any environment (when data persists)

---

## 9. Decision Rules
<!-- Deterministic branching logic -->

1. If test case approval status is unclear, pause and request confirmation.
2. If required page objects/fixtures are missing, stop implementation and redirect to prerequisite skill.
3. If BasePage or environment config is missing, create them before proceeding with page objects.
4. If expected results are not measurable, request clarification before adding assertions.
5. If duplicated logic is detected, reuse existing utilities/components instead of new implementations.
6. If test data is embedded in a spec, move it to `src/testdata/US<ID>_<MODULE>/` before finalizing.
7. If a test case needs multiple data classes, expose named `valid`, `invalid`, `boundary`, `empty`, or `specialCharacter` properties instead of anonymous literals.

---

## 10. Knowledge Priority
<!-- Rule precedence -->

1. User instructions
2. SKILL.md
3. Standards
4. Checklists
5. Templates
6. Examples

---

## 11. Quality Gates
<!-- Mandatory validation before output -->

- [ ] Standards applied
- [ ] Checklists executed
- [ ] Template followed
- [ ] Output complete

---

## 12. Self Review
<!-- Checklist-driven self review -->

Before completing, execute:

- `checklists/automation-review-checklist.md`

Revise output if any applicable check fails.

---

## 13. Success Criteria
<!-- Measurable outcomes -->

- [ ] Spec files are generated in the correct suite location with consistent naming.
- [ ] Test data is created under `src/testdata/US<ID>_<MODULE>/` and organized by Test Case ID.
- [ ] Scripts are traceable to approved test cases and expected results.
- [ ] Each automated test imports reusable data instead of embedding test values.
- [ ] Reuse is maximized and no duplicate automation logic is introduced.
- [ ] Automation Coverage Report is created in `reports/` documenting all test cases with Automation = Yes.
- [ ] Coverage report includes all required sections:
  - **Implemented Test Cases**: All automated tests with file references
  - **Pending Test Cases**: Tests that skip or not yet implemented, with reasons, priority, and target resolution
  - **Failed Test Cases**: Tests that failed with root cause analysis and fix status
  - **Blocked Test Cases**: Tests blocked by external issues (if any)
  - **Manual Test Cases**: Tests requiring manual execution with reasons (if any)
- [ ] Coverage report includes traceability matrix and test data considerations.
- [ ] Requested suite has been executed, or an execution blocker is documented.
- [ ] Playwright HTML report is saved in `test-results/<US-ID>-evidences/html-report/`.
- [ ] Screenshot evidence is saved in `test-results/<US-ID>-evidences/screenshots/` with test case IDs in filenames.

---

## 14. Next Skill
<!-- Downstream handoff -->

- `ai-review-automation`

---

## 15. Related Skills
<!-- Upstream and downstream skills only -->

- `ai-design-test-case`
- `ai-generate-page-object`
- `ai-review-automation`

---

## 16. Related Knowledge
<!-- Referenced knowledge files grouped by type -->

### Standards
- `standards/playwright-standard.md`
- `standards/assertion-standard.md`
- `standards/automation-coding-standard.md`
- `standards/automation-standard.md`

### Checklists
- `checklists/automation-review-checklist.md`

### Templates
- `templates/test.template.ts`
- `templates/api.template.ts`
- `templates/fixture.template.ts`

### Examples
- `examples/test-script-login-example.md`

### Shared Documents
- `project-knowledge/test-strategy.md`