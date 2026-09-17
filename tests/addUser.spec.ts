import { test, expect } from "../fixtures/page.fixture";
import { validUser, invalidUserData } from "../test-data/WebtablesUserData";
import { createRandomUser } from "../test-data/UserGenerator";

test("Scenario 1: Add a user from test data", async ({
    basePage,
    webtablesPage,
}) => {
    await basePage.goToWebtablesPage();

    await webtablesPage.addUser(validUser.AddUserData);
    console.log(`Checking user: ${JSON.stringify(validUser.AddUserData)}`);

    await webtablesPage.searchUser(validUser.AddUserData.email);
    const rows = await webtablesPage.showNumberOfRecord(50);

    console.log(`Search result: ${JSON.stringify(rows).replace(/\\t/g, " | ")}`);
    const userFound = rows.some(
        (row) =>
            row.includes(validUser.AddUserData.firstName) &&
            row.includes(validUser.AddUserData.lastName) &&
            row.includes(validUser.AddUserData.email) &&
            row.includes(validUser.AddUserData.age) &&
            row.includes(validUser.AddUserData.salary) &&
            row.includes(validUser.AddUserData.department),
    );
    expect(userFound).toBe(true);
});

test("Scenario 2: Add random users to the web table", async ({
    basePage,
    webtablesPage,
}) => {
    await basePage.goToWebtablesPage();

    const users = Array.from({ length: 10 }, (_, index) =>
        createRandomUser(index),
    );

    for (const user of users) {
        await webtablesPage.addUser(user);
        //const users = await webtablesPage.addRandomUsers(10);
        console.log(`Checking user: ${JSON.stringify(user)}`);
        await webtablesPage.searchUser(user.email);

        const rows = await webtablesPage.showNumberOfRecord(50);

        console.log(
            `Search result: ${JSON.stringify(rows).replace(/\\t/g, " | ")}`,
        );

        const userFound = rows.some(
            (row) =>
                row.includes(user.firstName) &&
                row.includes(user.lastName) &&
                row.includes(user.email) &&
                row.includes(user.age) &&
                row.includes(user.salary) &&
                row.includes(user.department),
        );
        expect(userFound).toBe(true);
    }
});

test("Scenario 3: Verify invalid email formats block submission", async ({
    basePage,
    webtablesPage,
}) => {
    await basePage.goToWebtablesPage();

    const data = invalidUserData.invalidEmail;

    for (const invalidEmail of data.invalidEmails) {
        await webtablesPage.addUser({
            ...data.baseUser.AddUserData,
            email: invalidEmail,
        });
        console.log(`Input user email: ${invalidEmail}`);

        // Form should still be visible when email validation fails
        expect(await webtablesPage.isRegistrationDialogVisible()).toBe(true);

        await webtablesPage.closeRegistrationDialog();
        await webtablesPage.searchUser(invalidEmail);

        const users = await webtablesPage.showNumberOfRecord(50);
        expect(users).toHaveLength(0);
        console.log(`${invalidEmail} is not added`);
    }
});
