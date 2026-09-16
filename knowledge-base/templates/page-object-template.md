# Page Object Template

## Purpose

Page Objects encapsulate page-specific locators and actions, providing a business-oriented interface for test scripts. They must extend BasePage and use environment config for navigation.

---

## Template

```typescript
import type { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { getPageUrl, pages } from '../config/environment.config';

export interface <PageName>Data {
  // Define data interface if needed
  fieldName: string;
  anotherField: string;
}

export class <PageName>Page extends BasePage {
  // Locators (private or readonly)
  readonly primaryButton: Locator;
  readonly inputField: Locator;
  readonly resultList: Locator;

  constructor(page: Page) {
    super(page);
    this.primaryButton = page.getByRole('button', { name: 'Submit' });
    this.inputField = page.getByLabel('Search');
    this.resultList = page.getByRole('list');
  }

  // Navigation
  async navigate(): Promise<void> {
    await super.navigate(getPageUrl(pages.<pageName>));
  }

  // Actions
  async performAction(input: string): Promise<void> {
    await this.inputField.fill(input);
    await this.primaryButton.click();
  }

  async getResults(): Promise<string[]> {
    const items = await this.resultList.locator('li').allTextContents();
    return items;
  }

  // Queries
  async isButtonEnabled(): Promise<boolean> {
    return this.primaryButton.isEnabled();
  }
}
```

---

## Key Principles

1. **Extend BasePage**: All page objects must extend BasePage to inherit common navigation and utility methods.

2. **Use Environment Config**: Always use `getPageUrl(pages.path)` for navigation instead of hardcoded URLs.

3. **Add Page Path to Config**: When creating a new page object, add the path to `pages` constant in environment config:
   ```typescript
   export const pages = {
     home: '/',
     login: '/login',
     yourNewPage: '/your-new-page',
   } as const;
   ```

4. **No Hardcoded Values**: Do not hardcode URLs, browser settings, or environment-specific values.

5. **No Assertions**: Keep assertions out of page objects. Page objects provide actions and queries, tests provide assertions.

6. **Stable Locators**: Use `getByRole`, `getByLabel`, `getByText`, `getByTestId` in preference to CSS or XPath.

7. **Business Methods**: Methods should represent business actions, not low-level interactions.

8. **Test Data Setup Methods**: For pages with CRUD operations, include helper methods to ensure minimum test data exists:
   ```typescript
   /**
    * Add a new record (combines open, fill, submit steps)
    */
   async addRecord(data: RecordData): Promise<void> {
     await this.openAddForm();
     await this.fillAddForm(data);
     await this.submitAddForm();
     await this.waitForTableStable();
   }

   /**
    * Ensure minimum number of records exist by adding test records if needed
    * 
    * ⚠️ WARNING: Only use if added records PERSIST (database-backed).
    * Do NOT use if records only exist in current session (reset on refresh).
    * For session-only data, tests should use test.skip() instead.
    */
   async ensureMinimumRecords(minimumCount: number): Promise<void> {
     const currentCount = await this.getVisibleRecordCount();
     const recordsToAdd = minimumCount - currentCount;

     if (recordsToAdd > 0) {
       for (let i = 0; i < recordsToAdd; i++) {
         const testRecord: RecordData = {
           name: `TestRecord${currentCount + i + 1}`,
           value: `Auto${currentCount + i + 1}`,
           // ... other fields with unique identifiers
         };
         await this.addRecord(testRecord);
       }
     }
   }
   ```

---

## Example Usage in Test

```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { config } from '../src/config/environment.config';

test.use({ channel: config.browser });

test('user can login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  await loginPage.navigate();
  await loginPage.login('user@example.com', 'password');
  
  await expect(page).toHaveURL(/dashboard/);
});
```
