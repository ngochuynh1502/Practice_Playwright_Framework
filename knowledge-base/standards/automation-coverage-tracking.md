# Automation Coverage Report - Usage Guide

## Purpose

Automation Coverage Reports provide transparency into test automation progress, helping teams:
- **Track** which test cases have been automated
- **Document** reasons for pending or blocked cases
- **Prioritize** remaining automation work
- **Report** automation status to stakeholders
- **Maintain** traceability from requirements to automation

---

## File Structure

### Individual Reports
```
reports/
├── Automation-Coverage-US-001.md
├── Automation-Coverage-US-002.md
└── Automation-Coverage-US-003.md
```

**One report per User Story**, documenting all test cases where `Automation = Yes`.

### Summary Report
```
reports/
└── Automation-Coverage-Summary.md
```

**Cross-user-story summary** showing overall automation health and priorities.

---

## When to Generate

### Initial Generation
- After first automation implementation for a User Story
- Using `ai-implement-automation` skill (auto-generates)

### Updates
- When new test cases are automated
- When pending cases move to implemented
- When blockers are resolved or identified
- During sprint planning or retrospectives
- Before release readiness reviews

---

## Report Sections

### 1. Summary
High-level metrics:
- Total test cases with Automation = Yes
- Implemented count and percentage
- Pending count and percentage
- Blocked and skipped counts

### 2. Implemented Test Cases
Table showing:
- Test Case ID
- Title
- Spec file location
- Test name
- Implementation date

### 3. Pending Test Cases
**Most important section** - tracks gaps with:
- Test Case ID and Title
- Priority (High/Medium/Low)
- **Reason** (why not implemented yet)
- Blocker flag (Yes/No)
- Target resolution (Sprint/Date)
- Notes (additional context)

#### Common Reason Categories

| Reason | Meaning | Action |
|--------|---------|--------|
| **Test Data Control Required** | Need exact dataset (e.g., 0 users, 10 users, 21 users) | Consider fixtures, API setup, or alternative approach |
| **API Integration Needed** | Need API test, mock, or stub | Add API test suite or Playwright route interception |
| **Complex State Management** | Complex setup or state transition | Break down or simplify test design |
| **External Dependency** | Depends on service/environment not available | Wait for dependency or mock |
| **Not Feasible with Current SUT** | System Under Test doesn't support this | Mark as manual or skip |
| **Deferred - Low Priority** | Can implement but not prioritized | Schedule for future sprint |
| **Blocked by Bug/Issue** | Bug prevents automation | Link issue, wait for fix |

### 4. Blocked Test Cases
Test cases with active blockers (bugs, environment issues, dependencies).

### 5. Skipped Test Cases
Test cases permanently marked as "will not automate" with approval.

### 6. Resolution History
Audit trail of status changes over time.

### 7. Traceability
Links to:
- Test case document
- Automation spec files
- Test data modules
- Page objects

### 8. Next Actions
Prioritized checklist for next steps.

### 9. Sign-off
Review approval section.

---

## How to Use

### For Test Engineers

**During Implementation**:
1. Generate coverage report after implementing automation
2. Document pending cases with clear reasons
3. Flag blockers and estimated resolution

**During Sprints**:
1. Update report when completing pending cases
2. Move items from Pending → Implemented
3. Add Resolution History entries
4. Update Next Actions

**Example workflow**:
```bash
# After implementing US-001 automation
1. Generate: reports/Automation-Coverage-US-001.md
2. Document: 5 implemented, 4 pending with reasons
3. Review: Are High priority cases feasible?
4. Update: Add to sprint backlog
```

### For Team Leads

**Sprint Planning**:
1. Review Summary report
2. Identify High priority pending cases
3. Assess feasibility and effort
4. Prioritize for upcoming sprint

**Release Readiness**:
1. Check Critical Path Coverage (must be 100%)
2. Review High Priority Coverage (target ≥90%)
3. Evaluate blockers and risks
4. Sign off on coverage status

**Example queries**:
- "What percentage of High priority test cases are automated?"
- "How many cases are blocked by environment issues?"
- "Which User Stories have lowest coverage?"

### For Stakeholders

**Progress Tracking**:
- Overall Automation Coverage %
- Coverage by User Story
- Trend over time (are we improving?)

**Risk Assessment**:
- Blocked test cases (what's preventing automation?)
- Not Feasible cases (what can't be automated?)
- High priority gaps

---

## Best Practices

### ✅ DO

- **Update regularly** - Keep reports current with actual automation status
- **Be specific** - Document clear, actionable reasons for pending cases
- **Prioritize accurately** - Match test case priority, not all are High
- **Link issues** - Reference bugs, tickets, dependencies
- **Review as team** - Discuss pending/blocked cases in sprint planning
- **Celebrate progress** - Track Resolution History to show improvements

### ❌ DON'T

- **Leave stale** - Don't create report once and forget
- **Be vague** - "Need more time" is not a valid reason
- **Ignore blockers** - Flag and escalate blocked cases
- **Over-commit** - Don't promise all pending cases in one sprint
- **Skip traceability** - Always link to test case docs and spec files

---

## Integration with Skills

### ai-implement-automation
**Auto-generates** coverage report as part of automation implementation.

**Expected behavior**:
- Reads test case document
- Identifies all `Automation = Yes` test cases
- Compares with generated spec file
- Documents implemented vs pending
- Generates `reports/Automation-Coverage-<US-ID>.md`

### ai-review-automation
**Validates** coverage report completeness.

**Checks**:
- Coverage report exists
- All Automation = Yes cases are documented
- Pending cases have reasons
- Traceability is complete

---

## Example: Resolving a Pending Case

### Before (Pending)
```markdown
| US002_TC_SEARCH_USER_009 | Verify pagination resets to the first page after filtering | High | Test Data Control Required | No | Sprint 1 | Need multi-page dataset (21+ records) |
```

### Implementation
1. Identify if feasible with DemoQA existing data ✅
2. Add Page Object methods for pagination state
3. Implement test in `US002-Search-User.spec.ts`
4. Add test data entry to `US002.testdata.ts`

### After (Implemented)
```markdown
| US002_TC_SEARCH_USER_009 | Verify pagination resets to the first page after filtering | US002-Search-User.spec.ts | US002_TC_SEARCH_USER_009 - Verify pagination resets to the first page after filtering | 2026-08-20 |
```

### Resolution History Entry
```markdown
| 2026-08-20 | US002_TC_SEARCH_USER_009 | Implemented | Used existing DemoQA data with 21+ records |
```

---

## Metrics and Targets

### Coverage Targets

| Metric | Target | Status Indicator |
|--------|--------|------------------|
| Critical Path | 100% | Must have |
| High Priority | ≥90% | Target |
| Overall Automation | ≥80% | Target |

**Critical Path**: Core happy path functionality (create, read, search).

### Example Calculation

**US-002 Search User**:
- Total test cases: 10
- Automation = Yes: 10
- Implemented: 8
- Coverage: 80%

**Status**: 🟢 Good (meets 80% target)

---

## FAQ

**Q: Who generates coverage reports?**  
A: Auto-generated by `ai-implement-automation` skill. Engineers update manually.

**Q: How often should reports be updated?**  
A: After each automation implementation, and during sprint planning/retrospectives.

**Q: What if a test case can't be automated?**  
A: Document in "Pending" with reason "Not Feasible with Current SUT". Consider manual test.

**Q: Should we automate 100% of test cases?**  
A: No. Prioritize based on risk, ROI, and feasibility. Target 80%+ overall, 100% critical path.

**Q: What if reason is "Test Data Control Required" but we can't control data?**  
A: Options: (1) Mock/fixtures, (2) API setup/teardown, (3) Manual test, (4) Alternative approach.

**Q: Can we have multiple reasons for one case?**  
A: Use the primary reason in table. Add details to Notes column or Next Actions.

---

## Related Documents

- [Automation Coverage Report Template](../knowledge-base/templates/automation-coverage-report-template.md)
- [ai-implement-automation Skill](../skills/ai-implement-automation/SKILL.md)
- [Automation Review Checklist](../knowledge-base/checklists/automation-review-checklist.md)
- [Test Case Templates](../knowledge-base/templates/test-case-template.md)

---

## Continuous Improvement

**Review coverage reports regularly** to:
- Identify patterns in pending reasons
- Address common blockers
- Improve test design for automation
- Invest in infrastructure (test data, environments)
- Celebrate automation wins

**Example insights**:
- "50% of pending cases need Test Data Control → Invest in data fixtures"
- "3 cases blocked by same bug → Prioritize bug fix"
- "Manual cases consistently low value → Reconsider test scope"
