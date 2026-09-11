import { test as baseTest, expect as baseExpect, Page } from '@playwright/test';
import { BrowserManagement } from '../core/browser/browser-management';
import { BookStorePage } from '../page-object/BookStorePage';
import { LoginPage } from '../page-object/LoginPage';
import { ProfilePage } from '../page-object/ProfilePage';
import { BasePage } from '../page-object/BasePage';

export type PageFixtures = {
  basePage: BasePage;
  loginPage: LoginPage;
  bookStorePage: BookStorePage;
  profilePage: ProfilePage;
};

export const pageFixtures = baseTest.extend<PageFixtures>({
  loginPage: async ({ page }, use) => {
    BrowserManagement.setCurrentPage(page as Page);
    await use(new LoginPage(page));
  },
  bookStorePage: async ({ page }, use) => {
    BrowserManagement.setCurrentPage(page as Page);
    await use(new BookStorePage(page));
  },
  profilePage: async ({ page }, use) => {
    BrowserManagement.setCurrentPage(page as Page);
    await use(new ProfilePage(page));
  },
  basePage: async ({ page }, use) => {
    BrowserManagement.setCurrentPage(page as Page);
    await use(new BasePage(page));
  }
});

export const test = pageFixtures;
export const expect = baseExpect;