import { BookApi } from '../api/BookApi';
import { AuthApi } from '../api/AuthApi';
import { pageTest } from './page.fixture';

export type ApiFixtures = {
  authApi: AuthApi;
  bookApi: BookApi;
};

export const apiTest = pageTest.extend<ApiFixtures>({
  authApi: async ({ request }, use) => {
    await use(new AuthApi(request));
  },
  bookApi: async ({ request }, use) => {
    await use(new BookApi(request));
  },
});
