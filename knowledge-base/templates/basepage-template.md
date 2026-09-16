# BasePage Template

## Purpose

BasePage provides common navigation, wait, and utility methods that all page objects inherit. This ensures consistency and reduces duplication across page object classes.

## Structure

```typescript
import type { Page } from '@playwright/test';

export abstract class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

  async getUrl(): Promise<string> {
    return this.page.url();
  }

  async reload(): Promise<void> {
    await this.page.reload();
  }

  async waitForUrl(url: string | RegExp): Promise<void> {
    await this.page.waitForURL(url);
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
  }
}
```

## Usage

All page objects should extend BasePage:

```typescript
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // Page-specific locators and methods
}
```

## Principles

- Keep BasePage minimal and focused on cross-cutting concerns
- Avoid business logic in BasePage
- Add methods that are genuinely reusable across multiple page objects
- Do not add page-specific behavior
