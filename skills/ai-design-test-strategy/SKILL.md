---
name: ai-design-test-strategy
description: "Use when: designing a complete, maintainable, and risk-based test strategy and test design plan from product brief, business rules, functional specifications, or API specifications, use cases, user stories, acceptance criteria."
---

# SKILL.md - AI Design Test Strategy


---
name: testing-design-test-strategy
description: Generate or update a project-specific Markdown test strategy from project documents while preserving the structure of the approved Test Strategy Template and using the sample strategy only as guidance. Use when asked to design, generate, review, or update test-strategy.md from requirements, user stories, architecture, API, non-functional requirements, delivery process, environment, security, or project planning documents.
---

# Testing Design Test Strategy

## Purpose

Create a complete, project-specific `test-strategy.md` by analyzing the documents already available in the project repository.

The output must:

- Follow the section order and intent of the approved Test Strategy Template.
- Use the sample Test Strategy as a reference for expected depth, wording style, tables, test types, and entry/exit criteria.
- Prefer project evidence over generic examples.
- Clearly distinguish confirmed facts, assumptions, risks, open questions, and recommendations.
- Avoid inventing project details.
- Produce valid, readable Markdown suitable for Git and Azure DevOps.

## Required Reference Files

Locate and read these files before generating the strategy:

1. Test Strategy template, preferred names:
   - `test-strategy-template.md`
   - A file whose name clearly indicates that it is the approved Test Strategy template.

2. Example Test Strategy, preferred names:
   - `example-test-strategy.md`
   - A file whose name clearly indicates that it is a sample or example Test Strategy.

Reference priority:

1. Project-specific documents
2. Approved Test Strategy template
3. Example Test Strategy
4. Explicit user instructions
5. Conservative industry guidance only when needed

If the template and example conflict:

- Preserve the template's section structure and mandatory fields.
- Use the example only to guide content depth and presentation.
- Use project documents to decide the actual strategy.
- Record unresolved conflicts under `Open Questions and Gaps`.

## Supported Project Inputs

Search the repository recursively and use relevant content from:

- Business requirements and product requirements
- User stories, epics, features, and acceptance criteria
- Definition of Ready and Definition of Done
- Requirement analysis outputs
- Solution architecture and technical design
- API specifications and contracts
- Non-functional requirements
- UI/UX designs and supported platform information
- Release plans and sprint plans
- Delivery framework and development process
- Test plans, test cases, checklists, and traceability matrices
- Automation framework and source code structure
- CI/CD configuration
- Environment and deployment documents
- Security, privacy, and data-classification documents
- Test data and database documents
- Team structure and responsibility documents
- Defect workflow and reporting standards
- Existing project Test Strategy

Ignore generated folders and irrelevant files such as:

- `.git/`
- `node_modules/`
- `dist/`
- `build/`
- `coverage/`
- test execution artifacts unless test results are explicitly relevant
- binary files that cannot be read safely

## Expected Output

Default output file:

```text
docs/test-strategy/test-strategy.md
```

If the repository already uses another documentation structure, place the file in the nearest equivalent documentation folder. If a Test Strategy already exists, update that file only when explicitly requested. Otherwise, create a new file and do not overwrite the existing strategy.

Generate one primary deliverable:

```text
test-strategy.md
```

Do not generate separate risk, coverage, or environment files unless explicitly requested. Include those details in the main strategy.

## Workflow

### Step 1: Discover the repository

1. List relevant files recursively.
2. Identify the template and example.
3. Group project documents into:
   - Business and scope
   - Architecture and integrations
   - Delivery process
   - Quality requirements
   - Test assets
   - Environments and deployment
   - Security, privacy, and data
   - Roles, ownership, and communication
4. Create an internal evidence map of source file to strategy section.
5. Do not rely on filenames alone. Read the relevant content.

### Step 2: Extract project facts

Extract only explicitly supported information, including:

- Project name and business purpose
- Application type: web, API, mobile, desktop, data, integration, or hybrid
- In-scope and out-of-scope features
- Business-critical workflows
- Architecture, services, databases, integrations, and third parties
- Delivery methodology and release cadence
- Supported browsers, devices, operating systems, and accessibility targets
- Functional and non-functional requirements
- Environments and deployment flow
- Test data sources and restrictions
- Security, privacy, and compliance requirements
- Test management, automation, CI/CD, and reporting tools
- Roles, owners, reviewers, and approval responsibilities
- Defect workflow, severity, and priority rules
- Entry, suspension, resumption, and exit expectations

For each extracted statement, retain the source filename internally so that the generated strategy can include a source mapping.

### Step 3: Classify evidence

Classify proposed content as:

- `Confirmed`: explicitly stated in project documents.
- `Derived`: directly concluded from confirmed architecture or requirements, with a short rationale.
- `Assumption`: necessary but not confirmed.
- `Recommendation`: proposed QA approach not defined by the project.
- `TBD`: required information is missing and cannot be safely assumed.

Rules:

- Never present an assumption, recommendation, or TBD as a confirmed fact.
- Never invent URLs, environments, tools, owners, targets, thresholds, schedules, or approvals.
- Never copy project-specific names, metrics, tooling, or ownership from the example into another project.
- Example values such as automation percentages, performance thresholds, supported browsers, operating systems, severity rules, and pass rates are not defaults.
- If evidence is incomplete, use `TBD` and explain what decision is required.

### Step 4: Build the risk profile

Identify risks from project evidence. Consider:

- Business impact
- Change frequency
- Technical complexity
- Integration dependency
- Data sensitivity
- User volume
- Failure visibility
- Regulatory or contractual impact
- Recoverability
- Testability
- Environment dependency

Use qualitative ratings only unless the project defines a scoring method:

- Impact: High, Medium, Low
- Likelihood: High, Medium, Low

For each risk, provide:

- Reference ID
- Description
- Impact
- Likelihood
- Mitigation or test response
- Evidence or rationale

Do not assign numeric risk scores unless the project documents define the formula.

### Step 5: Select applicable test types

Select test types based on project evidence and risk. Do not include every test type automatically.

Possible functional types:

- Smoke testing
- Manual functional testing
- API component testing
- API contract testing
- API scenario testing
- Integration testing
- Confirmation testing
- Regression testing
- Cross-browser testing
- Cross-device testing
- End-to-end testing
- Data or database testing
- UI automation testing

Possible non-functional types:

- Accessibility testing
- Performance testing
- Load, stress, endurance, or scalability testing
- Application security testing
- Privacy and data protection testing
- Compatibility testing
- Reliability or recovery testing
- Usability testing
- Localization testing

For every selected test type, define:

- Objective
- Scope or technique
- Entry criteria
- Exit criteria
- Environment
- Owner
- Deliverables, when relevant
- Special considerations

If a test type is relevant but not committed, label it `Recommended` or `TBD`, not confirmed.

### Step 6: Define coverage

Describe coverage at an appropriate level:

- Requirements and acceptance criteria
- Business rules
- Positive scenarios
- Negative scenarios
- Boundary values
- Error handling and recovery
- Roles and permissions
- Integrations and data flow
- Supported platforms
- Non-functional requirements
- Regression scope
- Automation scope

Add a concise coverage matrix when the available documents identify features or business areas:

```markdown
| Area / Workflow | Risk | Planned Test Types | Automation Candidate | Source |
|---|---|---|---|---|
```

Do not claim complete coverage merely because a document exists.

### Step 7: Define automation strategy

Include automation only when supported or useful for the project. Specify:

- Objectives
- Candidate layers: unit, API, UI, integration
- Candidate scenarios
- Exclusion criteria
- Framework and language, only if confirmed
- Execution trigger, only if confirmed
- Test data setup and teardown
- Reporting and evidence
- Maintenance approach

Do not invent coverage targets. If a target is needed but absent, write `TBD` and recommend that stakeholders agree on it.

### Step 8: Generate the Markdown strategy

Use the template structure below. Keep the exact high-level order unless the approved project template differs.

## Required Output Structure

```markdown
# <Project Name> Test Strategy

## Document Control
## Document History
## Confidentiality

# 1. Introduction
# 2. Principles of Software Testing
# 3. Scope
## 3.1 In Scope
## 3.2 Out of Scope
## 3.3 Assumptions
## 3.4 Risks & Issues

# 4. Test Methodology
# 5. Test Approach
# 6. Test Coverage

# 7. Type of Testing
## 7.1 Functional Testing
### 7.1.x <Selected Test Type>
## 7.2 Non-Functional Testing
### 7.2.x <Selected Test Type>
## 7.3 User Acceptance Test (UAT)

# 8. Test Management
# 9. Test Data Management
# 10. Test Environment Management

# 11. Defect Management
## 11.1 Defect Lifecycle
## 11.2 Defect Severity Classification
## 11.3 Defect Priority Classification
## 11.4 Defect Triage Committee

# 12. Test Deliverables
# 13. Communication Plan
# 14. Team Structure
# 15. Roles and Responsibilities

# 16. Testing Activity
## 16.1 Sprint Planning - Entry Criteria
## 16.2 Sprint Planning - Exit Criteria
## 16.3 Daily Activities
## 16.4 Sprint Acceptance Criteria

# 17. Suspension / Exit Criteria
## 17.1 Suspension Criteria
## 17.2 Resumption Criteria
## 17.3 Exit Criteria

# 18. Relevant Documents
# 19. Open Questions and Gaps
# 20. Source Mapping
```

Rules for the structure:

- Preserve Sections 1 through 18 from the approved template.
- Sections 19 and 20 are quality controls added by this skill.
- If the project uses a non-Scrum process, retain Section 16 but rename its subsections to the equivalent lifecycle gates and explain the tailoring.
- Do not include a manual table of contents unless explicitly requested.
- Use consistent heading levels and valid Markdown tables.

### Step 9: Add traceability and gaps

At the end, include:

```markdown
# 19. Open Questions and Gaps

| ID | Missing or Unclear Information | Impacted Section | Required Decision / Owner |
|---|---|---|---|
```

and:

```markdown
# 20. Source Mapping

| Strategy Section | Source Document(s) | Evidence Status |
|---|---|---|
```

Use repository-relative paths where possible.

The `Open Questions and Gaps` section is for information needed to plan, execute,
manage, or report testing. Do not use it to clarify user-story behavior, acceptance
criteria, business rules, validation rules, search semantics, or message wording.
Those requirement questions belong in the requirement-analysis or clarification
workflow and should be resolved before finalizing test scenarios.

Include only strategy-level gaps, such as:

- Supported browsers, browser versions, devices, or operating systems when not provided.
- Test environments, deployment availability, or service dependencies.
- Performance measurement method, workload, duration, percentile, or threshold when not provided.
- Test, defect, CI/CD, reporting, or evidence-management tools when not provided.
- Test data ownership, refresh process, masking, or reset strategy.
- QA, automation, environment support, defect triage, or UAT ownership.
- Entry criteria, exit criteria, release approval, or escalation rules.

Do not add questions to clarify the details in user story such as whether search is exact or partial, what validation text should be displayed, or how a business rule should behave. If such behavior is unclear, record it as a requirement risk or assumption and reference the requirement-analysis
artifact that must resolve it.

### Step 10: Validate before completion

Run all checks in the Validation Checklist. Fix all correctable issues before returning the output.

## Content Rules by Section

### Introduction

Explain:

- What the project or product does
- Why the Test Strategy exists
- What quality objectives it supports
- The intended audience

Avoid generic SDLC descriptions when project-specific information exists.

### Principles of Software Testing

Use the seven testing principles when consistent with the approved example. Keep this section concise and connect the principles to the strategy. Do not let this section replace the project-specific approach.

### Scope

- In Scope must list testable product areas, workflows, integrations, and platforms.
- Out of Scope must include a reason or external owner when known.
- Do not convert missing information into Out of Scope.
- Assumptions must have an impact and a mitigation or validation action.
- Risks must be tied to a test response.

### Test Methodology

Describe the project's actual delivery and testing lifecycle. Explain where testing occurs, when feedback is provided, and how changes are handled. Use Agile and Continuous Testing only when supported by project evidence or label them as recommendations.

### Test Approach

Explain how test effort is prioritized. Prefer a risk-based approach when the evidence supports differentiated risk. Include requirement review, static testing, functional testing, integration testing, regression, automation, and quality reporting only when applicable.

### Test Coverage

State how coverage is decided and tracked. Include requirement, risk, data, platform, integration, and non-functional dimensions as applicable. Avoid unsupported percentage claims.

### Type of Testing

Start with a summary table:

```markdown
| Type of Testing | Test Environment | Owner | Status |
|---|---|---|---|
```

Allowed status values:

- Confirmed
- Recommended
- TBD
- Not Applicable

Then describe each selected type in detail.

### Test Management

Document requirement tracking, test case management, execution recording, evidence, traceability, reporting, and tool usage. Name tools only when confirmed.

### Test Data Management

Cover:

- Data creation or sourcing
- Synthetic, masked, subset, or cloned data
- Sensitive data controls
- Test account ownership
- Refresh and reset
- Setup and teardown
- Data retention and deletion
- Repeatability and isolation for automation

Do not recommend production data without explicit controls.

### Test Environment Management

Include:

```markdown
| Environment | Purpose | Configuration / Dependency | Access / Owner | Status |
|---|---|---|---|---|
```

Do not invent hardware specifications or URLs.

### Defect Management

Use project-defined workflow and classifications when available. If absent, provide a marked recommendation and add a decision gap. Separate severity, business impact, from priority, fixing urgency.

### Test Deliverables

Include artifact, owner, reviewer or audience, timing, and storage location where confirmed.

### Communication Plan

Include communication type, purpose, participants or roles, frequency or trigger, owner, and channel where confirmed. Do not invent recurring meetings or frequencies.

### Team Structure and Responsibilities

Use project roles rather than named people unless names are explicitly required in the strategy. Do not infer reporting lines. Use a RACI-like table only when enough evidence exists.

### Testing Activity

For Scrum projects, define:

- Sprint planning entry criteria
- Sprint planning exit criteria
- Daily testing activities
- Sprint acceptance criteria

For other delivery models, tailor these to the actual lifecycle gates while preserving the intent.

### Suspension, Resumption, and Exit

Criteria must be clear, measurable where evidence supports measurement, and linked to quality risk. Do not use arbitrary pass rates or defect thresholds.

### Relevant Documents

List only documents actually inspected or explicitly referenced. Use repository-relative links when possible.

## Markdown Style Guide

- Use English for the generated Test Strategy unless the user requests another language.
- Use clear, professional, plain language.
- Use bullets for concise lists.
- Keep paragraphs short.
- Use `TBD` consistently.
- Avoid HTML styling copied from Word.
- Avoid page numbers and Word table-of-contents artifacts.
- Avoid decorative branding in the Markdown output.
- Do not use placeholder angle brackets in final project content unless the value is truly unknown.
- Escape pipe characters inside tables.
- Keep tables reasonably narrow. Move long explanations below the table.
- Use one blank line before and after headings, lists, tables, and code blocks.
- Use consistent capitalization for test types and roles.
- Correct grammar from source documents without changing their meaning.

## Failure Handling

If the template cannot be found:

- Do not silently replace it with a generic structure.
- Use the Required Output Structure in this skill as a fallback.
- Add a high-priority gap stating that the approved template was not available.

If the example cannot be found:

- Follow the approved template and this skill.
- Add a note in Source Mapping that example-based alignment could not be verified.

If project documents are insufficient:

- Generate the supported sections.
- Use `TBD` for unsupported required details.
- Add only precise strategy-level questions in Open Questions and Gaps.
- Record unclear requirement behavior as a requirement risk or assumption, not as a strategy question.
- Do not block the entire output.

If documents conflict:

- Prefer the most project-specific, approved, and current source when that status is explicit.
- Do not infer which source is current if the repository does not say.
- Record the conflict and affected section.

## Completion Response

After generating the file, report concisely:

- Output path
- Documents analyzed
- Main confirmed decisions reflected
- Number and themes of gaps, without inventing counts if not calculated
- Any sections marked `TBD`

Do not claim the strategy is approved. State that it is generated for review.

Output location: `project-knowledge/`

## Knowledge Sources
<!-- Standards, Checklists, Templates, Examples to load -->

### Standards
- `project-knowledge/*`
- `standards/*`

### Checklists
- `checklists/test-strategy-checklist.md`

### Templates
- `templates/test-strategy-template.md`

### Examples
- `examples/test-strategy-example.md`