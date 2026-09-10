import { test as baseTest, expect as baseExpect, APIRequestContext } from '@playwright/test';
import { pageFixtures } from './page.fixture';

export type ApiFixtures = {
  request: APIRequestContext;
};

export const apiTest = pageFixtures.extend<ApiFixtures>({
  request: async ({ request }, use) => {
    await use(request);
  },
});

export const test = apiTest;
export const expect = baseExpect;
