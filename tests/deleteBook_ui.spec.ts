import { test, expect } from "@playwright/test";
import { BookHelper } from "../helper/api/book-helper";
import { AccountHelper } from "../helper/api/account-helper";
import { BrowserManagement } from "../core/browser/browser-management";
import { BASE_URL } from "../constants/url";

import { bookData } from "../test-data/BookData";
import { userData } from "../test-data/UserData";

import { LoginPage } from "../page-object/LoginPage";
import { ProfilePage } from "../page-object/ProfilePage";
import { BookStorePage } from "../page-object/BookStorePage";

test.beforeEach(async ({ request }) => {
    const genTokenResponse = await AccountHelper.generateToken(userData.username, userData.password);
    const jsonTokenResponse: { token: string } = await genTokenResponse.json();
    const token: string = jsonTokenResponse["token"];

    await BookHelper.addBook(token, bookData.isbn, userData.userId);
});

test("Verify delete book successfully @smoke", async ({ page }) => {
    BrowserManagement.setCurrentPage(page);
    await page.goto(BASE_URL);

    const loginPage = new LoginPage(page);
    const profilePage = new ProfilePage(page);
    const bookStorePage = new BookStorePage(page);

    await bookStorePage.goToLoginPage();
    await loginPage.login(userData.username, userData.password);

    await bookStorePage.waitForUserNameDisplayed();
    await bookStorePage.goToProfilePage();

    await profilePage.deleteBookByName("Learning JavaScript Design Patterns");

    const doesBookExist = await profilePage.doesBookExist("Learning JavaScript Design Patterns");
    expect(doesBookExist).toBe(false);
});