import { expect } from '@playwright/test';
import { apiTest } from './api.fixture';
import { testDataFixtures, type TestDataFixtures } from './test-data.fixture';

export const test = apiTest.extend<TestDataFixtures>({
  userData: async ({}, use) => {
    await use(testDataFixtures.userData);
  },
  bookTitle: async ({}, use) => {
    await use(testDataFixtures.bookTitle);
  },
  searchKeywords: async ({}, use) => {
    await use(testDataFixtures.searchKeywords);
  },
});

export { expect };
