# Integration Test Execution Guide

## Purpose

This guide explains when, how, and in what order to execute integration tests for cross-feature validation.

---

## Execution Order

### Golden Rule

**Always run integration tests AFTER functional tests pass.**

```
┌─────────────────────────────────────────────────┐
│ Functional Tests (Single Feature)              │
│ ✅ US-001: View User List                      │
│ ✅ US-002: Search User                          │
│ ✅ US-003: Add User                             │
└─────────────────────────────────────────────────┘
                    ↓
         All functional tests PASS?
                    ↓
                  YES
                    ↓
┌─────────────────────────────────────────────────┐
│ Integration Tests (Cross-Feature)              │
│ TC_INT_001: Add User → Search User             │
│ TC_INT_002: Add User → View User List          │
└─────────────────────────────────────────────────┘
                    ↓
         All integration tests PASS?
                    ↓
                  YES
                    ↓
┌─────────────────────────────────────────────────┐
│ E2E Tests (Full Journeys)                      │
│ Complete administrator workflows               │
└─────────────────────────────────────────────────┘
```

### If Functional Test Fails

```
❌ US-002 Search User FAILS
    ↓
STOP - Do NOT run integration tests
    ↓
FIX functional test first
    ↓
Re-run functional tests
    ↓
All PASS? → Proceed to integration tests
```

---

## Why This Order Matters

| Scenario | Problem | Solution |
|----------|---------|----------|
| Run integration before functional | Integration test fails, but you don't know if it's because Search is broken or Add→Search integration is broken | Run functional first to isolate feature-level bugs |
| Functional fails, but continue integration | Waste time debugging integration when root cause is in functional layer | Stop at first failure, fix functional, then proceed |
| Skip integration tests | Integration bugs (API contract mismatch, data sync issues) escape to production | Always run integration after functional passes |

---

## Incremental Integration Testing Strategy

### Sprint 1: View, Search, Add

**Functional Tests:**
```
tests/US001-View-User-List.spec.ts
tests/US002-Search-User.spec.ts
tests/US003-Add-User.spec.ts
```

**Integration Tests:**
```
tests/integration/INT001-Add-Then-Search.spec.ts
tests/integration/INT002-Add-Then-View.spec.ts
```

**Execution:**
```powershell
# Step 1: Run functional tests
npx playwright test tests/US001*.spec.ts
npx playwright test tests/US002*.spec.ts
npx playwright test tests/US003*.spec.ts

# Step 2: If all pass, run integration
npx playwright test tests/integration/
```

---

### Sprint 2: Add Edit User (US-004)

**New Functional Tests:**
```
tests/US004-Edit-User.spec.ts
```

**New Integration Tests:**
```
tests/integration/INT003-Add-Then-Edit.spec.ts
tests/integration/INT006-Edit-Then-Search.spec.ts
tests/integration/INT007-Edit-Then-View.spec.ts
```

**Execution:**
```powershell
# Step 1: Run NEW functional test
npx playwright test tests/US004*.spec.ts

# Step 2: Run EXISTING functional tests (regression)
npx playwright test tests/US001*.spec.ts tests/US002*.spec.ts tests/US003*.spec.ts

# Step 3: If all pass, run FULL integration suite
npx playwright test tests/integration/
```

**Integration Test Matrix (After Sprint 2):**
```
From ↓ / To →  | View      | Search    | Edit
---------------|-----------|-----------|----------
Add            | INT_002   | INT_001   | INT_003
Edit           | INT_007   | INT_006   | -
```

---

### Sprint 3: Add Delete User (US-005)

**New Functional Tests:**
```
tests/US005-Delete-User.spec.ts
```

**New Integration Tests:**
```
tests/integration/INT004-Add-Then-Delete.spec.ts
tests/integration/INT008-Delete-Then-Search-NotFound.spec.ts
tests/integration/INT009-Delete-Then-View-Removed.spec.ts
tests/integration/INT010-Edit-Then-Delete.spec.ts
```

**Execution:**
```powershell
# Step 1: Run NEW functional test
npx playwright test tests/US005*.spec.ts

# Step 2: Run EXISTING functional tests (regression)
npx playwright test tests/US001*.spec.ts tests/US002*.spec.ts tests/US003*.spec.ts tests/US004*.spec.ts

# Step 3: If all pass, run FULL integration suite
npx playwright test tests/integration/
```

**Integration Test Matrix (After Sprint 3):**
```
From ↓ / To →  | View      | Search    | Edit      | Delete
---------------|-----------|-----------|-----------|----------
Add            | INT_002   | INT_001   | INT_003   | INT_004
Edit           | INT_007   | INT_006   | -         | INT_010
Delete         | INT_009   | INT_008   | -         | -
```

---

## Decision Tree: When to Add New Integration Tests

```
New feature added?
    ↓
  YES
    ↓
Does it CREATE data?
    ↓
  YES → Add integration with: View, Search, Edit (if exists), Delete (if exists)
    |
    ↓ NO
    |
Does it READ data from another feature?
    ↓
  YES → Add integration with: Create feature that produces that data
    |
    ↓ NO
    |
Does it UPDATE data?
    ↓
  YES → Add integration with: View, Search (verify updated data visible)
    |
    ↓ NO
    |
Does it DELETE data?
    ↓
  YES → Add integration with: View (verify removed), Search (verify not found)
    |
    ↓ NO
    |
Feature is isolated → No integration tests needed
```

---

## Common Integration Test Patterns

### Pattern 1: Create → Read

```typescript
test('TC_INT_001 - Verify newly added user can be found via Search', async () => {
  // CREATE via Add User
  await addUserPage.createUser({
    firstName: 'Integration',
    email: 'integration@test.com',
    // ...
  });
  
  // READ via Search User
  await searchPage.search('integration@test.com');
  await expect(searchResults).toContainText('Integration');
});
```

### Pattern 2: Create → Update → Read

```typescript
test('TC_INT_006 - Verify edited user appears with updated data in Search', async () => {
  // CREATE
  await addUserPage.createUser({ firstName: 'Original', email: 'edit@test.com' });
  
  // UPDATE via Edit User
  await editUserPage.editUser('edit@test.com', { firstName: 'Updated' });
  
  // READ via Search
  await searchPage.search('edit@test.com');
  await expect(searchResults).toContainText('Updated');
  await expect(searchResults).not.toContainText('Original');
});
```

### Pattern 3: Create → Delete → Read (Negative)

```typescript
test('TC_INT_008 - Verify deleted user not found in Search', async () => {
  // CREATE
  await addUserPage.createUser({ email: 'delete@test.com' });
  
  // DELETE via Delete User
  await deleteUserPage.deleteUser('delete@test.com');
  
  // READ via Search (expect NOT FOUND)
  await searchPage.search('delete@test.com');
  await expect(searchResults).toHaveText('No records found');
});
```

---

## Regression Strategy

### When to Run Integration Tests

| Trigger | Scope | Rationale |
|---------|-------|-----------|
| After any functional test change | Full integration suite | Functional change may break integration contracts |
| Before release | Full integration suite | Final validation that all features work together |
| Nightly CI build | Full integration suite | Early detection of integration regressions |
| PR merge to main | Affected integration tests only | Fast feedback on integration impact |

### Integration Test Regression Matrix

| Change Type | Run Functional | Run Integration | Run E2E |
|-------------|----------------|-----------------|---------|
| Bug fix in US-003 (Add) | US-003 only | All Add→* integration tests | Full E2E |
| New feature US-004 (Edit) | US-004 + All existing | Full integration suite | Full E2E |
| Refactor (no behavior change) | Changed features | Smoke integration tests | Smoke E2E |

---

## Execution Commands

### Run All Tests in Correct Order

```powershell
# Full test suite (functional → integration → e2e)
npx playwright test tests/US*.spec.ts && `
  npx playwright test tests/integration/ && `
  npx playwright test tests/e2e/
```

### Run Only Integration Tests

```powershell
# Run integration suite (assumes functional tests already passed)
npx playwright test tests/integration/
```

### Run Integration Tests for Specific Feature

```powershell
# Run all Add User related integration tests
npx playwright test tests/integration/ --grep "Add.*User"

# Run all Search related integration tests  
npx playwright test tests/integration/ --grep "Search"
```

---

## Troubleshooting Integration Test Failures

### Failure Analysis Decision Tree

```
Integration test fails
    ↓
Step 1: Re-run functional tests
    ↓
Functional tests PASS?
    ↓
  YES → Integration layer issue (API contract, data sync, timing)
    |     Fix integration code, not feature code
    |
    ↓ NO
    |
Functional tests FAIL → Feature regression
    |     Fix functional test first
    |     Re-run integration after functional passes
```

### Common Integration Failure Root Causes

| Symptom | Likely Cause | Fix |
|---------|--------------|-----|
| Data created in Add not visible in Search | API contract mismatch or state sync delay | Add explicit wait or verify API response |
| Search returns stale data after Edit | Cache not invalidated | Refresh page or clear cache before search |
| Deleted user still appears in View | Frontend state not updated after delete | Reload list after delete operation |

---

## Summary

✅ **Always run integration tests AFTER functional tests pass**
✅ **Add integration tests incrementally as new features are added**
✅ **Use integration test matrix to identify required test cases**
✅ **Run full integration suite before release**
✅ **If integration fails, check functional tests first**
