import { test as base } from '@playwright/test';
import { BookStorePage } from '../page-object/BookStorePage';
import { LoginPage } from '../page-object/LoginPage';
import { Profile } from '../page-object/ProfilePage';

export type PageFixtures = {
  loginPage: LoginPage;
  bookStorePage: BookStorePage;
  profilePage: Profile;
};

export const pageFixtures = base.extend<PageFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  bookStorePage: async ({ page }, use) => {
    await use(new BookStorePage(page));
  },
  profilePage: async ({ page }, use) => {
    await use(new Profile(page));
  },
});