# Environment Config Template

## Purpose

Environment config centralizes all environment-specific settings (URLs, browser, timeouts) and provides a single source of truth for test execution configuration.

## Structure

```typescript
export interface EnvironmentConfig {
  baseUrl: string;
  browser: 'chromium' | 'firefox' | 'webkit' | 'chrome';
  timeout: number;
  headless: boolean;
}

const environments: Record<string, EnvironmentConfig> = {
  dev: {
    baseUrl: 'https://dev.example.com',
    browser: 'chrome',
    timeout: 30000,
    headless: false,
  },
  staging: {
    baseUrl: 'https://staging.example.com',
    browser: 'chrome',
    timeout: 30000,
    headless: false,
  },
  production: {
    baseUrl: 'https://example.com',
    browser: 'chrome',
    timeout: 30000,
    headless: true,
  },
};

declare const process: { env: Record<string, string | undefined> };
const currentEnv = (process.env.TEST_ENV || 'dev') as keyof typeof environments;

export const config: EnvironmentConfig = environments[currentEnv] || environments.dev;

export const pages = {
  home: '/',
  login: '/login',
  dashboard: '/dashboard',
} as const;

export function getPageUrl(pagePath: string): string {
  return `${config.baseUrl}${pagePath}`;
}
```

## Usage in Page Objects

```typescript
import { BasePage } from './BasePage';
import { getPageUrl, pages } from '../config/environment.config';

export class LoginPage extends BasePage {
  async navigate(): Promise<void> {
    await super.navigate(getPageUrl(pages.login));
  }
}
```

## Usage in Test Specs

```typescript
import { test } from '@playwright/test';
import { config } from '../src/config/environment.config';

test.use({ channel: config.browser });

test('example test', async ({ page }) => {
  // Test implementation
});
```

## Setting Environment

Run tests with different environments:

```powershell
$env:TEST_ENV="staging"; npx playwright test
```

```bash
TEST_ENV=production npx playwright test
```

## Principles

- Do not hardcode URLs, browser settings, or timeouts in page objects or specs
- Use `getPageUrl(pages.path)` for all navigation
- Add new page paths to the `pages` constant
- Keep environment-specific differences minimal and explicit
