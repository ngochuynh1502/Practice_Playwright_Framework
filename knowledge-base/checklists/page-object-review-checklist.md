# Page Object Review Checklist

## Purpose

Use this checklist to review page objects for maintainability, reuse, and framework consistency.

## Checklist

- [ ] Page object contains no assertions.
- [ ] Page object extends BasePage when applicable.
- [ ] Page URLs are retrieved from environment config, not hardcoded.
- [ ] Browser and environment settings use config instead of hardcoded values.
- [ ] Locators are stable and user-facing where possible.
- [ ] `getByTestId()` is used when test IDs are available and appropriate.
- [ ] Code does not duplicate existing page object, component, fixture, or utility logic.
- [ ] Page Object Model is followed consistently.
- [ ] Methods are small and focused on one page-level action.
- [ ] Method and locator names follow the project naming standard.
- [ ] Navigation behavior is placed in the owning page object.
- [ ] No hardcoded waits are used.
- [ ] Test scenario logic remains outside the page object.

## Reference

- Page object rules are defined in `knowledge-base/standards/page-object-standard.md`.