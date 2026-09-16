# Test Case Generation Template

## Purpose

This document defines the standard format for generated test cases.

AI shall follow this template when creating test cases unless the user explicitly requests a different format.

---

# Output Format

Generate test cases as a Markdown table.

## Document Structure

```markdown
# Test Cases - US<ID> <Feature Name>

## Coverage Summary
[Test techniques, scope, browser, etc.]

## Test Cases Table
[Markdown table with all functional test cases]

## Integration Test Recommendations (Optional)
[Cross-feature integration tests recommended but outside current scope]
```

## Required Columns

| Column | Description |
|----------|-------------|
| Test Case ID | Unique identifier following the naming convention |
| Title | Action-oriented test case title |
| Test Steps | Numbered execution steps |
| Expected Result | Observable and verifiable expected outcome |
| Requirement | Related requirement, Acceptance Criteria, or Requirement ID (if available) |
| Testing Technique | Test design technique used to derive the test case |
| Priority | Critical / High / Medium / Low |
| Preconditions | Conditions that must exist before execution |
| Test Data | Input data required for execution |
| Automation| can implement automation test? Yes/No |
| Automation Type | UI / API / UI + API / N/A |

---

# Column Definitions

## Test Case ID

Generate a unique identifier for every test case.

### Format

```
US<ID>_TC_<MODULE>_<SEQUENCE>
```

### Rules

- Prefix with the User Story ID without the hyphen, for example `US001`.
- Include the literal **TC** marker after the User Story ID.
- Module name must be uppercase
- Use meaningful feature or module names
- Number sequentially using three digits
- Restart numbering for each User Story and module

### Examples

```
US001_TC_LOGIN_001
US001_TC_LOGIN_002

US002_TC_CART_001
US002_TC_CART_002

US003_TC_PAYMENT_001
```

---

## Title

Use concise, action-oriented titles.

### Format

```
Verify <expected behavior>
```

### Good Examples

- Verify user can log in with valid credentials
- Verify password is required
- Verify account is locked after five failed login attempts
- Verify checkout fails when payment is declined

### Avoid

- Login Test
- Test Login
- Scenario 1
- Verify Login

Titles should clearly describe the expected behavior.

---

## Requirement

Reference the related requirement whenever available.

Examples

```
AC-3

REQ-105
```

If unavailable, leave blank or use "-".

Reference only the relevant AC, BR, NFR, or Clarified Behavior. Do not repeat the User Story ID when the document and test-case ID already identify it.

When reviewing a test-case document, Requirement references must be sufficient to build a
coverage matrix. Do not accept a test case that has no AC, BR, NFR, or Clarified Behavior
reference unless it is explicitly marked as exploratory or supporting setup.

---

## Testing Technique

Specify the primary test design technique.

Examples

- Use Case Testing
- Equivalence Partitioning
- Boundary Value Analysis
- Decision Table Testing
- State Transition Testing
- Pairwise Testing
- Error Guessing
- Exploratory Testing

If multiple techniques are applied, list the primary technique first.

Example

```
Boundary Value Analysis, Equivalence Partitioning
```

---

## Priority

Assign priority based on business impact.

| Priority | Description |
|----------|-------------|
| Critical | Core business functionality that blocks system usage |
| High | Frequently used or high-risk functionality |
| Medium | Supporting functionality |
| Low | Minor or cosmetic functionality |

---

## Preconditions

Describe only the conditions required before executing the test.

Examples

- User has a registered account.
- User is logged in.
- Shopping cart contains one item.
- Account status is Active.

Avoid including execution steps.

---

## Test Data

Use realistic and reusable data.

Examples

```
Email: user@test.com
Password: Password123
```

```
Quantity: 5
```

```
Credit Card: Valid Visa
```

```
File: sample.pdf (2 MB)
```

Use placeholders only when actual values are unnecessary.

---

## Test Steps

### Rules

- Number each step.
- Each step should describe one user action.
- Keep steps concise.
- Avoid combining multiple actions in a single step.

Example

1. Navigate to the Login page.
2. Enter a valid email.
3. Enter a valid password.
4. Click **Login**.

---

## Expected Result

Expected results must be:

- Observable
- Verifiable
- Specific
- Measurable

### Good Examples

- User is redirected to the Dashboard.
- Error message **"Invalid email or password."** is displayed.
- Login request is rejected.
- Record is saved successfully.

### Avoid

- System works correctly.
- Login succeeds.
- Everything is displayed correctly.

---

# Example Output

| Test Case ID | Title | Test Steps | Expected Result | Requirement | Testing Technique | Priority | Preconditions | Test Data | Automation | Automation Type |
|--------------|-------|------------|-----------------|-------------|-------------------|----------|---------------|-----------|------------|-----------------|
| TC_LOGIN_001 | Verify user can log in with valid credentials | 1. Navigate to the Login page.<br>2. Enter a valid email.<br>3. Enter a valid password.<br>4. Click **Login**. | User is authenticated successfully.<br>User is redirected to the Dashboard. | AC-1 | Use Case Testing | Critical | User has a registered account. | Email: user@test.com<br>Password: Password123 | Yes | UI |

---

# AI Generation Rules

When generating test cases, AI shall:

- Follow this template for every test case.
- Generate sequential Test Case IDs.
- Use action-oriented titles beginning with **"Verify..."**.
- Include all required columns.
- Select appropriate test design techniques.
- Use realistic test data.
- Write concise execution steps.
- Produce specific and verifiable expected results.
- Avoid duplicate or overlapping test cases.
- Ensure every test case is traceable to a requirement whenever possible.

---

# Exceptions

If the user explicitly requests:

- A different output format
- Excel-compatible tables
- CSV
- Azure DevOps format
- Jira format
- Xray format
- Zephyr format

AI may adapt the output while preserving the required information.