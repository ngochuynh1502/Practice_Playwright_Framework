import { test, expect } from "../fixtures/page.fixture";
import { bookData } from "../test-data/BookData";
import { userData } from "../test-data/UserData";


test("Verify delete book successfully", async ({ basePage, loginPage, bookStorePage, profilePage }) => {
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


    expect(await profilePage.doesBookExist(bookData.title, true));
    console.log(`Book "${bookData.title}" exists in profile before deletion`);

    await profilePage.deleteBookByName(bookData.title);
    //await profilePage.deleteBookByIsbn(bookData.isbn);

    await profilePage.searchBookInProfile(bookData.title);

    expect(await profilePage.doesBookExist(bookData.title, false));
    console.log(`Book "${bookData.title}" does not exist in profile after deletion`);
});