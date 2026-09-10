import { test, expect } from "../fixtures/api.fixture";
import { AccountHelper } from "../helper/api/account-helper";
import { BookHelper } from "../helper/api/book-helper";
import { BrowserManagement } from "../core/browser/browser-management";
import { userData } from "../test-data/UserData";
import { bookData } from "../test-data/BookData";

test("Delete book via API", async ({ request }) => {
    BrowserManagement.request = request;

    const genTokenResponse = await AccountHelper.generateToken(request, userData.username, userData.password);
    expect(genTokenResponse.ok()).toBeTruthy();

    const jsonTokenResponse: { token: string } = await genTokenResponse.json();
    const token = jsonTokenResponse.token;
    expect(token).toBeTruthy();

    const addBookResponse = await BookHelper.addBook(token, bookData.isbn, userData.userId);
    expect(addBookResponse.ok()).toBeTruthy();

    const deleteBookResponse = await BookHelper.deleteBook(token, bookData.isbn, userData.userId);
    expect(deleteBookResponse.ok()).toBeTruthy();

    const deleteBookResponseText = await deleteBookResponse.text();

    if (deleteBookResponseText) {
        const jsonDeleteBookResponse: { isbn?: string; userId?: string; status?: string } =
            JSON.parse(deleteBookResponseText);

        expect(jsonDeleteBookResponse).toMatchObject({
            isbn: bookData.isbn,
            userId: userData.userId,
        });
        expect(jsonDeleteBookResponse.status).toBe("Success");

        console.log("Delete book response:", jsonDeleteBookResponse);
    } else {
        console.log("Delete book response is empty (status 204/empty body). Treat as success.");
        expect([200, 204]).toContain(deleteBookResponse.status());
    }
});