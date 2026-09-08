import { test, expect } from '../fixtures';

test('Scenario 1: Add book successfully', async ({
  bookStorePage,
  profilePage,
  authApi,
  bookApi,
  userData,
  bookTitle
}) => {
    // Get userId 
    const { userId } = await authApi.login( userData.username, userData.password );

    // Gen token
    const token = await authApi.generateToken( userData.username, userData.password );
    console.log('UserId:', userId); console.log('Token:', token);

    //search book and get isbn
    await bookStorePage.goto();
    await bookStorePage.searchBook(bookTitle); 
    const isbn = await bookStorePage.getIsbnFromFirstResult();
    console.log("ISBN:", isbn);
    expect(isbn).toBeTruthy();

    // cleanup 
    await bookApi.deleteBook( userId!, token!, isbn! );

    //add book by API
    const addResp = await bookApi.addBook(userId!, token!, isbn!);
    console.log('Status:', addResp.status());
    console.log('Body:', await addResp.text());

    expect(addResp.ok()).toBeTruthy();

    await profilePage.verifyBookDisplayed( bookTitle, true );
});
