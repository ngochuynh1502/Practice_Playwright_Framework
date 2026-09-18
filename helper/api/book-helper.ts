import { APIRequestContext } from "@playwright/test";
import { BASE_API_URL, API_BOOKSTORE_ENDPOINTS } from "../../constants/url";

export class BookHelper {
  static async deleteBook(
    request: APIRequestContext,
    token: string,
    bookIsbn: string | null | undefined,
    userID: string | null | undefined,
  ): Promise<any> {
    const payload: Record<string, unknown> = {};

    if (userID !== undefined) {
      payload.userId = userID;
    }
    if (bookIsbn !== undefined) {
      payload.isbn = bookIsbn;
    }

    const response = await request.delete(
      `${BASE_API_URL}${API_BOOKSTORE_ENDPOINTS.BOOK_ENDPOINT}`,
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        data: payload,
        timeout: 15000,
        failOnStatusCode: false,
      },
    );
    return response;
  }

  static async addBook(
    request: APIRequestContext,
    token: string,
    bookIsbn: string,
    userID: string,
  ): Promise<any> {
    const response = await request.post(
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
        timeout: 15000,
        failOnStatusCode: false,
      },
    );

    return response;
  }
}
