# Automation Coverage Report - [US-ID] [Title]

**Generated**: [Date]  
**User Story**: [US-ID]  
**Total Test Cases**: [N]  
**Automation Target** (Automation = Yes): [N]  
**Implemented**: [N] ([%])  
**Pending**: [N] ([%])  

---

## Summary

| Status | Count | Percentage |
|--------|-------|------------|
| ✅ Implemented | [N] | [%] |
| ⏳ Pending | [N] | [%] |
| ⏸️ Blocked | [N] | [%] |
| ⊘ Skipped | [N] | [%] |

---

## Implemented Test Cases

| Test Case ID | Title | Spec File | Test Name | Implemented Date |
|--------------|-------|-----------|-----------|------------------|
| [ID] | [Title] | [filename.spec.ts] | [test name] | [YYYY-MM-DD] |

---

## Pending Test Cases

Tests that are skipped during execution or not yet implemented:

| Test Case ID | Title | Priority | Reason | Blocker | Target Resolution | Notes |
|--------------|-------|----------|--------|---------|-------------------|-------|
| [ID] | [Title] | [High/Medium/Low] | [Reason] | [Yes/No] | [Sprint/Date] | [Additional context] |

### Reason Categories:
- **Test Data Control Required**: Case cần control chính xác test data (thêm/xóa/reset records)
- **API Integration Needed**: Case cần API test hoặc mock/stub
- **Complex State Management**: Case cần setup phức tạp hoặc state transition testing
- **External Dependency**: Case phụ thuộc service/environment external
- **Not Feasible with Current SUT**: System Under Test không support behavior này
- **Not Yet Implemented**: Test case exists but automation not yet written
- **Deferred - Low Priority**: Có thể implement nhưng chưa prioritize
- **Blocked by Bug/Issue**: Có bug đang block implementation

---

## Failed Test Cases

Tests that failed during the last execution with root cause analysis:

| Test Case ID | Title | Status | Root Cause | Fix Applied | Notes |
|--------------|-------|--------|------------|-------------|-------|
| [ID] | [Title] | [Status] | [Root cause summary] | [Fix description] | [Additional context] |

**Status Legend:**
- ✅ Fixed: Issue resolved, test passing
- 🔧 In Progress: Fix being implemented
- ⏳ Pending: Issue identified, fix pending
- ❌ Blocked: Cannot fix without external changes

**Note:** This section should be updated after each test run to track failures and resolutions.

---

## Blocked Test Cases

| Test Case ID | Title | Blocking Issue | Issue Link | Expected Resolution |
|--------------|-------|----------------|------------|---------------------|
| [ID] | [Title] | [Description] | [URL or ID] | [Date/Sprint] |

_If no blocked test cases: "No blocked test cases at this time."_

---

## Skipped Test Cases

| Test Case ID | Title | Reason | Decision Date | Approved By |
|--------------|-------|--------|---------------|-------------|
| [ID] | [Title] | [Reason for permanent skip] | [YYYY-MM-DD] | [Name/Role] |

---

## Resolution History

| Date | Test Case ID | Action | Notes |
|------|--------------|--------|-------|
| [YYYY-MM-DD] | [ID] | Implemented | [Context] |
| [YYYY-MM-DD] | [ID] | Blocked | [Issue description] |
| [YYYY-MM-DD] | [ID] | Skipped | [Decision rationale] |

---

## Traceability

- **Test Case Document**: `test-cases/TC-[US-ID]-[Title].md`
- **Automation Spec(s)**: `tests/[US-ID]-[Title].spec.ts`
- **Test Data Module**: `src/testdata/[US-ID]_[Module]/`
- **Page Object(s)**: `src/pages/[PageName].ts`

---

## Next Actions

- [ ] [Action item 1]
- [ ] [Action item 2]
- [ ] [Action item 3]

---

## Sign-off

**Reviewed by**: [Name]  
**Review Date**: [YYYY-MM-DD]  
**Approval Status**: [Approved / Pending / Rejected]  
**Comments**: [Optional feedback]
