---
name: ai-review-test-case
description: "Use when: reviewing test case documents for completeness, correctness, coverage, consistency, and standards compliance."
---

# SKILL.md - Testing Review Test Case

## 1. Purpose
<!-- Why the skill exists, business objective, primary responsibility -->

Review existing test case documents to identify quality issues, coverage gaps, duplication, and traceability problems, then provide structured and actionable recommendations.

---

## 2. When to Use
<!-- Situations where the skill should be executed -->

- When AI-generated or manually authored test cases need quality validation.
- When teams must confirm requirement/acceptance-criteria coverage.
- When pre-implementation review is required to reduce downstream rework.

---

## 3. Do Not Use When
<!-- What the skill is NOT responsible for -->

- When the primary task is to generate new test cases.
- When there are no test case artifacts available for review.
- When the task is to implement automation scripts directly.

---

## 4. Inputs
<!-- Required and Optional inputs (no processing logic) -->

### Required
- Test Case File(s): Existing markdown test case documents to review.
- Review Scope: Functional, non-functional, or both.

### Optional
- Requirement References: User stories/acceptance criteria for traceability checks.
- Priority/Risk Context: Business criticality to assess test prioritization.

The requirement references must include the current requirement documents, the
requirement-analysis reports, and any clarified behavior recorded in those artifacts.

---

## 5. Outputs
<!-- Files generated, reports, documents with naming conventions -->

| Output | Format | Naming Convention |
| ------ | ------ | ----------------- |
| Test Case Review Report | Markdown (`.md`) | `Report-Review-Test-Case-<TestCaseFileName>.md` |
| Findings Summary | Markdown (`.md`) | `Findings-Review-Test-Case-<TestCaseFileName>.md` |

Output location: `reviews/`

Each review report should include:

- Review scope and artifacts examined.
- Requirement inventory for AC, BR, NFR, and clarified behavior.
- Coverage matrix with Covered, Partial, and Missing status.
- Findings ordered by severity with test-case and requirement evidence.
- Duplication, design-technique, data, priority, and automation observations.
- Overall outcome: Approved, Minor Revision Required, or Major Revision Required.
- Open assumptions and residual risks.

---

## 6. Workflow
<!-- High-level workflow steps only -->

```text
1. Load Knowledge -> 2. Read Input -> 3. Evaluate Coverage and Quality -> 4. Generate Output -> 5. Self Review
```

---

## 7. Knowledge Sources
<!-- Standards, Checklists, Templates, Examples to load -->

### Standards
- `knowledge-base/standards/testing-standard.md`
- `knowledge-base/project-knowledge/test-strategy.md`
- `knowledge-base/standards/test-design-approach.md`
- `knowledge-base/standards/test-design-techniques.md`

### Checklists
- `knowledge-base/checklists/clarification-rules.md`
- `knowledge-base/checklists/test-case-review-checklist.md`

### Templates
- `knowledge-base/templates/test-case-template.md`

### Examples
- `knowledge-base/examples/review-test-case-example.md`

---

## 8. Execution Rules
<!-- Execution sequence (read input, load knowledge, apply standards...) -->

1. Read test case inputs, the current requirement, and requirement-analysis report before evaluation.
2. Determine review scope from the user request; if omitted, review both functional and applicable non-functional coverage.
3. Load standards, checklist, and template references from the repository paths above.
4. Build a requirement inventory containing every AC, BR, NFR, and clarified behavior item.
5. Map every inventory item to one or more test cases and classify coverage as Covered, Partial, or Missing.
6. Check that resolved clarification decisions are reflected in test steps, data, and expected results.
7. Assess design technique usage, duplication, priority, preconditions, test data, expected results, and automation suitability.
8. Classify findings by severity and provide actionable recommendations.
9. Do not generate replacement test cases unless explicitly requested.
10. Validate report completeness before final output.

---

## 9. Decision Rules
<!-- Deterministic branching logic -->

1. If requirement references are missing, continue review and mark traceability coverage as partial.
2. If review scope is omitted, review functional and applicable non-functional requirements; state this assumption in the report.
3. If any AC, BR, NFR, or clarified behavior item has no test mapping, classify coverage as incomplete.
4. If a clarified decision conflicts with a test case, classify the finding as High and require correction.
5. If a critical business flow or business rule is missing, classify the outcome as Major Revision Required.
6. If only non-blocking quality issues remain, classify the outcome as Minor Revision Required.
7. If an applicable requirement is observable but its exact wording or visual detail is not defined, mark coverage Partial and identify the requirement gap; do not invent an assertion.
8. Do not mark the review Approved when any AC, BR, NFR, or clarified behavior is Missing or when a High finding remains unresolved.

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

- `references/checklists/test-case-review-checklist.md`

Revise output if any applicable check fails.

---

## 13. Success Criteria
<!-- Measurable outcomes -->

- [ ] Review report identifies concrete coverage and quality issues.
- [ ] Findings are traceable to requirement/test-case evidence.
- [ ] Recommendations are actionable and prioritize highest risks first.

---

## 14. Next Skill
<!-- Downstream handoff -->

- `testing-design-test-case` (for revisions)
- `testing-generate-page-object` (after approved test cases)

---

## 15. Related Skills
<!-- Upstream and downstream skills only -->

- `testing-analyze-requirements`
- `testing-design-test-case`
- `testing-generate-page-object`

---

## 16. Related Knowledge
<!-- Referenced knowledge files grouped by type -->

### Standards
- `knowledge-base/standards/testing-standard.md`
- `knowledge-base/project-knowledge/test-strategy.md`
- `knowledge-base/standards/test-design-approach.md`
- `knowledge-base/standards/test-design-techniques.md`

### Checklists
- `knowledge-base/checklists/clarification-rules.md`
- `knowledge-base/checklists/test-case-review-checklist.md`

### Templates
- `knowledge-base/templates/test-case-template.md`

### Examples
- `knowledge-base/examples/review-test-case-example.md`

### Shared Documents
- `knowledge-base/checklists/clarification-rules.md`
