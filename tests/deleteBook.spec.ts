import { test, expect } from '../fixtures';
import { userData } from '../test-data/UserData';
import { bookTitle } from '../test-data/BookData';

test('Scenario 2: Delete book successfully', async ({ loginPage, bookStorePage, profilePage, bookApi }) => {
    await loginPage.goto();
    await loginPage.login(userData.username, userData.password);

    const { token, userId } = await loginPage.getTokenFromUI();
    console.log('Token from UI:', token);
    console.log('UserId from UI:', userId);

    await bookStorePage.goto();
    await bookStorePage.searchBook(bookTitle);

    const isbn = await bookStorePage.getIsbnFromFirstResult();
    expect(isbn).toBeTruthy();

    const addResp = await bookApi.addBook(userId!, token!, isbn!);
    console.log('Status:', addResp.status());
    console.log('Body:', await addResp.text());
    expect(addResp.ok()).toBeTruthy();

    await profilePage.gotoProfilePage();
    await profilePage.verifyBookDisplayed(bookTitle, true);

    // page.on('dialog', async dialog => {
    //     await dialog.accept();
    // });
    await profilePage.deleteTheBook(bookTitle);
    await profilePage.verifyBookDisplayed(bookTitle, false);
});