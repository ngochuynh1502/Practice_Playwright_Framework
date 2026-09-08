import { APIRequestContext } from "@playwright/test";
import {
  Post_Book_API_URL,
  Delete_Book_API_URL,
  GetUser_API_URL
} from "../constants/url";

export class BookApi {

  constructor(
    private readonly request: APIRequestContext
  ) { }

  async addBook(
    userId: string,
    token: string,
    isbn: string
  ) {

    return await this.request.post(
      Post_Book_API_URL,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        data: {
          userId,
          collectionOfIsbns: [
            { isbn }
          ]
        }
      }
    );
  }

  async deleteBook(
    userId: string,
    token: string,
    isbn: string
  ) {

    return await this.request.delete(
      Delete_Book_API_URL,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        data: {
          isbn,
          userId
        }
      }
    );
  }

  async getUserInfo(
    userId: string,
    token: string
  ) {

    const response = await this.request.get(`${GetUser_API_URL}/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return response;
  }

}
