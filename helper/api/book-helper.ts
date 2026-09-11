import { BrowserManagement } from "../../core/browser/browser-management";
import { BASE_API_URL, API_BOOKSTORE_ENDPOINTS } from "../../constants/url";

export class BookHelper {
  static async deleteBook(
    token: string,
    bookIsbn: string,
    userID: string,
  ): Promise<any> {
    const response = await BrowserManagement.request.delete(
      `${BASE_API_URL}${API_BOOKSTORE_ENDPOINTS.BOOK_ENDPOINT}`,
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        data: {
          isbn: bookIsbn,
          userId: userID,
        },
      },
    );
    return response;
  }

  static async addBook(
    token: string,
    bookIsbn: string,
    userID: string,
  ): Promise<any> {
    const response = await BrowserManagement.request.post(
      `${BASE_API_URL}${API_BOOKSTORE_ENDPOINTS.BOOKS_ENDPOINT}`,
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        data: {
          userId: userID,
          collectionOfIsbns: [
            {
              isbn: bookIsbn,
            },
          ],
        },
      },
    );

    return response;
  }
}
