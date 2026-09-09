import { expect } from '@playwright/test';
import { apiTest } from './api.fixture';
//import { testDataFixtures, TestDataFixtures } from './test-data.fixture';

export const test = apiTest;
export { expect };

////Remove it as not use test-data.fixture.ts

// .extend<TestDataFixtures>({
//   userData: async ({}, use) => {
//     await use(testDataFixtures.userData);
//   },
//   bookTitle: async ({}, use) => {
//     await use(testDataFixtures.bookTitle);
//   },
//   searchKeywords: async ({}, use) => {
//     await use(testDataFixtures.searchKeywords);
//   },
// });
//export { expect };


////Use this code if you want to separate api.fixture and page.fixture

// import {  test as base,  expect} from "@playwright/test";
// import { pageFixtures } from "./page.fixture";
// import { apiFixtures } from "./api.fixture";

// export const test = base
//   .extend(pageFixtures)
//   .extend(apiFixtures);

// export { expect };