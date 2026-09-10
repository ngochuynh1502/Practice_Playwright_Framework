import { BrowserManagement } from "../browser/browser-management";

export enum LocatorType {
    ROLE = 0,
    TEXT = 1,
    LABEL = 2,
    PLACEHOLDER = 3,
    ALT_TEXT = 4,
    TITLE = 5,
    TEST_ID = 6,
    DEFAULT = 7
}

interface ElementOptions {
    [key: string]: any;
}

export class Element {
    locator: any;
    locatorType: LocatorType;
    options: ElementOptions;
    constructor(locator: any, locatorType: LocatorType = LocatorType.DEFAULT, options: ElementOptions = {}) {
        this.locator = locator;
        this.locatorType = locatorType;
        this.options = options;
    }

    getElement() {
        const page = BrowserManagement.page;
        switch (this.locatorType) {
            case LocatorType.ROLE:
                return page.getByRole(this.locator, this.options);
            case LocatorType.TEXT:
                return page.getByText(this.locator, this.options);
            case LocatorType.LABEL:
                return page.getByLabel(this.locator, this.options);
            case LocatorType.PLACEHOLDER:
                return page.getByPlaceholder(this.locator, this.options);
            case LocatorType.ALT_TEXT:
                return page.getByAltText(this.locator, this.options);
            case LocatorType.TITLE:
                return page.getByTitle(this.locator, this.options);
            case LocatorType.TEST_ID:
                return page.getByTestId(this.locator);
            default:
                return page.locator(this.locator);
        }
    }

    async getElements(): Promise<number> {
        const handles = await this.getElement().elementHandles();
        const visibilityChecks = await Promise.all(
            handles.map(element => element.isVisible())
        );
        return visibilityChecks.filter(Boolean).length;
    }

    async getNumberOfElements(): Promise<number> {
        return await this.getElement().count();
    }

    async click() {
        await this.getElement().click();
    }

    async clickWithIndex(index: number = 0) {
        const element = await this.getElement();
        const resolved = await element.count();
        if (resolved > 1) {
            await element.nth(index).click();
        } else {
            await element.click();
        }
    }
    async enter(text: string) {
        await this.getElement().type(text);
    }

    async getText() {
        return await this.getElement().textContent();
    }

    async isVisible() {
        return await this.getElement().isVisible();
    }

    async waitForElement(options: any) {
        await this.getElement().waitFor(options);
    }

    async waitForElementToBeVisible(timeout: number = 5000) {
        await this.getElement().waitFor({ state: 'visible', timeout: timeout });
    }

    async waitForElementToBeHidden() {
        await this.getElement().waitFor({ state: 'hidden' });
    }

    async fillText(text: string) {
        await this.getElement().fill(text);
    }

    async clear() {
        await this.getElement().fill('');
    }

    async hover() {
        await this.getElement().hover();
    }
}