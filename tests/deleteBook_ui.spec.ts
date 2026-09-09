import { test } from "../fixtures";
import { userData } from '../test-data/UserData';
import { bookTitle } from '../test-data/BookData';

test(
    "Scenario 1: Delete book successfully with UI",
    async ({ loginPage, bookStorePage, profilePage }) => {

        // Login
        await loginPage.goto();
        await loginPage.login(
            userData.username,
            userData.password
        );

        // Ensure book not exists
        await profilePage.gotoProfilePage();
        await profilePage.deleteBookIfExists(
            bookTitle
        );

        await profilePage.verifyBookDisplayed(
            bookTitle,
            false
        );


        // Add book via UI
        await bookStorePage.goto();
        await bookStorePage.searchBook(
            bookTitle
        );

        await bookStorePage.addBookByTitle(
            bookTitle
        );

        // Verify book added
        await console.log("Added book:", bookTitle);
        await profilePage.gotoProfilePage();
        await profilePage.verifyBookDisplayed(
            bookTitle,
            true
        );

        // Delete book
        await console.log("Deleting book:", bookTitle);
        await profilePage.deleteTheBook(
            bookTitle
        );

        // Verify book deleted
        await profilePage.verifyBookDisplayed(
            bookTitle,
            false
        );
    });
