import { APIRequestContext } from '@playwright/test';
import {
  Login_API_URL,
  GenerateToken_API_URL
} from '../constants/url';

export class AuthApi {

  constructor(
    private readonly request: APIRequestContext
  ) { }

  async login(
    username: string,
    password: string
  ) {

    const response =
      await this.request.post(
        Login_API_URL,
        {
          data: {
            userName: username,
            password
          }
        }
      );

    const body =
      await response.json();

    return {
      userId: body.userId
    };
  }

  async generateToken(
    username: string,
    password: string
  ) {

    const response =
      await this.request.post(
        GenerateToken_API_URL,
        {
          data: {
            userName: username,
            password
          }
        }
      );

    const body =
      await response.json();

    return body.token;
  }
}
