import { Dialog } from "@playwright/test";
import { BrowserManagement } from "./browser-management";

export class BrowserUtils {
    static alertEvent: Promise<string>;

    static async registerAlert(timeout: number = 5000, event: "accept" | "dismiss" = "accept"): Promise<void> {
        this.alertEvent = BrowserManagement.page.waitForEvent('dialog', { timeout: timeout })
            .then(async (dialog: Dialog) => {
                if (event === "accept") {
                    await dialog.accept();
                } else {
                    await dialog.dismiss();
                }
                return dialog.message();
            })
    }

    static async handleAlert(): Promise<string> {
        return await this.alertEvent;
    }
}