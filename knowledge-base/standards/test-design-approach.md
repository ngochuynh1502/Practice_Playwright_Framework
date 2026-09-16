# Test Design Approach

This document defines the default approach for deriving test cases from requirements.

## Principles

- Use risk-based prioritization.
- Cover positive, negative, and boundary scenarios.
- Keep tests atomic and traceable to requirements.
- Avoid duplicate scenarios that validate the same behavior.

## Coverage Layers

1. Core happy-path workflows.
2. Alternate and exception flows.
3. Input and validation behavior.
4. State and transition behavior.
5. Integration touchpoints.

### Integration Touchpoints - When to Include Integration Test Cases

**Within Feature Scope (Include in functional test cases):**
- Internal feature dependencies (e.g., Add User → User appears in list within same feature)
- Same-screen/same-workflow integration (e.g., Form validation → Display error → Clear error on fix)

**Outside Feature Scope (Separate Integration Test Suite):**
- Cross-feature integration (e.g., Add User → Search User, Create Order → View Order History)
- Cross-module workflows (e.g., Login → Dashboard → Reports)
- Multi-step user journeys spanning multiple features
- API-to-UI integration across boundaries

**Decision Rule:**
If the test validates behavior **across two or more independently developed features**, create a separate integration test case in the integration test suite with ID format: `TC_INT_<SEQUENCE>`.

**Example:**
- Functional: `US003_TC_ADD_USER_004` - Verify user record is created (within Add User scope)
- Integration: `TC_INT_001` - Verify newly added user can be found via Search User (cross-feature)

## Technique Selection Guidance

- Use equivalence partitioning for input ranges and categories.
- Use boundary value analysis where limits exist.
- Use decision table testing for rule combinations.
- Use state transition testing for status-driven behavior.
- Use error guessing for known risk areas.

## Quality Criteria

- Expected results are observable and measurable.
- Preconditions are explicit.
- Test data is realistic and reusable.
- Every case maps back to a requirement or acceptance criterion.
