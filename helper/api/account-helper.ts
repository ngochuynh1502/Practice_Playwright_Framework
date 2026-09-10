import { BASE_API_URL, API_BOOKSTORE_ENDPOINTS } from "../../constants/url";
import { APIRequestContext } from "playwright-core";

export class AccountHelper {
  static async generateToken(
    request: APIRequestContext,
    userName: string,
    password: string,
  ) {
    return await request.post(
      `${BASE_API_URL}${API_BOOKSTORE_ENDPOINTS.GENERATE_TOKEN_ENDPOINT}`,
      {
        data: { userName, password },
      },
    );
  }
}
