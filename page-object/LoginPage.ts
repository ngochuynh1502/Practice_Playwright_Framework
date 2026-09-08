import { expect, Page, Locator, type APIRequestContext } from '@playwright/test';
import { BasePage } from './BasePage';
import { Login_API_URL, Login_URL } from '../constants/url.ts';

export class LoginPage extends BasePage {
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('#userName');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login');
  }

  async goto() {
    await super.goto(Login_URL);
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await expect(this.page).toHaveURL(/\/profile/);
    await expect(this.page.locator('#userName-value')).toHaveText(username);
  }

  // //Login via API and return token and userId.
  // static async generateToken(request: APIRequestContext, username: string, password: string) {
  //   const resp = await request.post(Login_API_URL, {
  //     data: { userName: username, password },
  //     headers: { 'Content-Type': 'application/json' }
  //   });
  //   if (!resp.ok()) {
  //     throw new Error(`Login API failed: ${resp.status()} ${await resp.text()}`);
  //   }
  //   const body = await resp.json();
  //   return { token: body.token, userId: body.userId || body.userID };
  // }
  //get token and userId from UI after login
  async getTokenFromUI(): Promise<{ token: string | null; userId: string | null }> {
    await this.page.waitForFunction(() =>
      document.cookie.includes('token')
    );
    const cookies = await this.page.context().cookies();
    const tokenCookie = cookies.find(c => /token/i.test(c.name));
    const userCookie = cookies.find(c => /userID/i.test(c.name));
    return { token: tokenCookie?.value ?? null, userId: userCookie?.value ?? null };
  }
}