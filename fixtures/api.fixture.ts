import { BookApi } from '../api/BookApi';
import { AuthApi } from '../api/AuthApi';
import { pageFixtures } from './page.fixture';

export type ApiFixtures = {
  authApi: AuthApi;
  bookApi: BookApi;
};

export const apiTest = pageFixtures.extend<ApiFixtures>({
  authApi: async ({ request }, use) => {
    await use(new AuthApi(request));
  },
  bookApi: async ({ request }, use) => {
    await use(new BookApi(request));
  },
});

// import { AuthApi } from "../api/AuthApi";
// import { BookApi } from "../api/BookApi";
// import type { APIRequestContext } from "@playwright/test";

// export const apiFixtures = {
//   authApi: async (
//     { request }: { request: APIRequestContext },
//     use: any
//   ) => {
//     await use(new AuthApi(request));
//   },

//   bookApi: async (
//     { request }: { request: APIRequestContext },
//     use: any
//   ) => {
//     await use(new BookApi(request));
//   },
// };