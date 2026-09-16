import { test, expect } from "../fixtures/page.fixture";
import { validUser, invalidUserData } from "../test-data/WebtablesUserData";

test("Scenario 1: Add a user from test data", async ({
    basePage,
    webtablesPage,
}) => {
    await basePage.goToWebtablesPage();

    await webtablesPage.addUser(validUser.AddUserData);
    console.log(`Checking user: ${JSON.stringify(validUser.AddUserData)}`);

    await webtablesPage.searchUser(validUser.AddUserData.email);
    const rows = await webtablesPage.getVisibleUsers();

    console.log(`Search result: ${JSON.stringify(rows).replace(/\\t/g, " | ")}`);
    expect(
        rows.some((row) =>
            Object.values(validUser.AddUserData).every((value) =>
                row.includes(value),
            ),
        ),
    ).toBe(true);
});

test("Scenario 2: Add 11 random users to the web table", async ({
    basePage,
    webtablesPage,
}) => {
    await basePage.goToWebtablesPage();

    const users = await webtablesPage.addRandomUsers(11);

    for (const user of users) {
        console.log(`Checking user: ${JSON.stringify(user)}`);
        await webtablesPage.searchUser(user.email);

        const rows = await webtablesPage.getVisibleUsers();
        console.log(`Search result: ${JSON.stringify(rows).replace(/\\t/g, " | ")}`,);
        expect(
            rows.some((row) =>
                Object.values(user).every((value) => row.includes(value)),
            ),
        ).toBe(true);
    }
});

test("Scenario 3: Verify invalid email formats block submission", async ({
    basePage,
    webtablesPage,
}) => {
    await basePage.goToWebtablesPage();

    const data = invalidUserData.invalidEmail;

    for (const invalidEmail of data.invalidEmails) {
        await webtablesPage.addUser({...data.baseUser.AddUserData, email: invalidEmail});
        console.log(`Input user email: ${invalidEmail}`,);

        // Form should still be visible when email validation fails
        expect(await webtablesPage.isRegistrationDialogVisible()).toBe(true);

        await webtablesPage.closeRegistrationDialog();

        await webtablesPage.searchUser(invalidEmail);
        const users = await webtablesPage.getVisibleUsers();
        expect(users).toHaveLength(0);
        console.log(`${invalidEmail} is not added`)
    }
});
