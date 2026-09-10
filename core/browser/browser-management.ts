import { APIRequestContext, Browser, BrowserContext, Page } from "@playwright/test";

export class BrowserManagement {
    static browser: Browser;
    static browserContext: BrowserContext;
    static page: Page;
    static request: APIRequestContext;

    static initialize(browser: Browser, browserContext: BrowserContext, page: Page, request: APIRequestContext) {
        this.browser = browser;
        this.browserContext = browserContext;
        this.page = page;
        this.request = request;
    }

    static setCurrentContext(browserContext: BrowserContext) {
        this.browserContext = browserContext;
    }

    static setCurrentPage(page: Page) {
        this.page = page;
    }
}