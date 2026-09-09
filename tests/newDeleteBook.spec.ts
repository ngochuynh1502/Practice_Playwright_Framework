import { test, expect } from "../fixtures";
import { userData } from '../test-data/UserData';
import { bookTitle } from '../test-data/BookData';

test("Scenario 2: Delete book successfully", async ({ loginPage, bookStorePage, profilePage, bookApi}) => {

    // Login
    await loginPage.goto();
    await loginPage.login(userData.username, userData.password);


    // Get token from UI
    const { token, userId } = await loginPage.getTokenFromUI();
    console.log("Token:", token);
    console.log("UserId:", userId);


    await profilePage.gotoProfilePage();
    await profilePage.deleteBookIfExists(bookTitle);
    await profilePage.verifyBookDisplayed( bookTitle, false );


    // Search Book
    await bookStorePage.goto();
    await bookStorePage.searchBook(bookTitle);
    const isbn = await bookStorePage.getIsbnFromFirstResult();
    console.log('Isbn:', isbn);
    
    expect(isbn).toBeTruthy();


    // Add book by API
    const addResp = await bookApi.addBook(userId!, token!, isbn!);
    console.log('Add bookStatus:', addResp.status());
    console.log('Body:', await addResp.text());

    expect(addResp.ok()).toBeTruthy();


    // Verify
    await profilePage.gotoProfilePage();
    await profilePage.verifyBookDisplayed(bookTitle, true);


    // Delete
    await profilePage.deleteTheBook(bookTitle);
    console.log("Deleted book:", bookTitle);
    await profilePage.verifyBookDisplayed(bookTitle, false);
});