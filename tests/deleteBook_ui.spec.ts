import { test, expect } from "../fixtures/page.fixture";
import { BookHelper } from "../helper/api/book-helper";
import { AccountHelper } from "../helper/api/account-helper";
import { BrowserManagement } from "../core/browser/browser-management";

import { bookData } from "../test-data/BookData";
import { userData } from "../test-data/UserData";

test.beforeEach(async ({ request }) => {
    BrowserManagement.request = request;

    const genTokenResponse = await AccountHelper.generateToken(request, userData.username, userData.password);
    const jsonTokenResponse: { token: string } = await genTokenResponse.json();
    const token: string = jsonTokenResponse["token"];

    await BookHelper.addBook(token, bookData.isbn, userData.userId);
});

test("Verify delete book successfully @smoke", async ({ page, basePage, loginPage, bookStorePage, profilePage }) => {
    BrowserManagement.setCurrentPage(page);
    // Log in to the application
    await basePage.goToLoginPage();
    await loginPage.login(userData.username, userData.password);
    await bookStorePage.waitForUserNameDisplayed();

    // Navigate to the profile page and delete the book if it exists
    await basePage.goToProfilePage();
    await profilePage.deleteBookIfExists(bookData.title);

    // Add the book to the collection again
    await basePage.goToBookStore();
    await bookStorePage.addBookToCollection(bookData.title);

    // Verify that the book exists in the profile before deletion
    await basePage.goToProfilePage();
    await profilePage.searchBookInProfile(bookData.title);
    

    const doesBookExistBeforeDelete = await profilePage.doesBookExist(bookData.title);
    expect(doesBookExistBeforeDelete).toBe(true);
    console.log(`Book "${bookData.title}" exists in profile before deletion: ${doesBookExistBeforeDelete}`);

    await profilePage.deleteBookByName(bookData.title);

    await profilePage.searchBookInProfile(bookData.title);
    const doesBookExistAfterDelete = await profilePage.doesBookExist(bookData.title);
    expect(doesBookExistAfterDelete).toBe(false);
    console.log(`Book "${bookData.title}" is exists in profile after deletion: ${doesBookExistAfterDelete}`);
});