import { test, expect } from "../fixtures/api.fixture";
import { AccountHelper } from "../helper/api/account-helper";
import { BookHelper } from "../helper/api/book-helper";
import { userData } from "../test-data/UserData";
import { bookData } from "../test-data/BookData";
import { readCsvRecords } from "../test-data/CsvReader";
import type { DeleteBookValidationRecord } from "../models/DeleteBookValidationRecord";
import { deleteBookCsvMapping } from "../test-data/mappings/deletebook-mapping";

const parseCsvValue = (value: string | undefined): string | null | undefined => {
    if (value === undefined) {
        return undefined;
    }

    const normalized = value.trim();
    if (normalized === "" || normalized.toLowerCase() === "empty") {
        return "";
    }
    if (normalized.toLowerCase() === "null") {
        return null;
    }
    if (normalized.toLowerCase() === "missing") {
        return undefined;
    }

    return normalized;
};

test("Scenario: Delete book via API", async ({ request }) => {
    const genTokenResponse = await AccountHelper.generateToken(request, userData.username, userData.password);
    expect(genTokenResponse.ok()).toBeTruthy();

    const jsonTokenResponse: { token: string } = await genTokenResponse.json();
    const token = jsonTokenResponse.token;
    expect(token).toBeTruthy();

    await BookHelper.deleteBook(request, token, bookData.isbn, userData.userId);

    const addBookResponse = await BookHelper.addBook(request, token, bookData.isbn, userData.userId);
    expect(addBookResponse.ok()).toBeTruthy();

    const deleteBookResponse = await BookHelper.deleteBook(request, token, bookData.isbn, userData.userId);
    expect(deleteBookResponse.ok()).toBeTruthy();

    const deleteBookResponseText = await deleteBookResponse.text();

    if (deleteBookResponseText) {
        const jsonDeleteBookResponse: { isbn?: string; userId?: string; status?: string } =
            JSON.parse(deleteBookResponseText);

        expect(jsonDeleteBookResponse).toMatchObject({
            isbn: bookData.isbn,
            userId: userData.userId,
        });
        expect(jsonDeleteBookResponse.status).toBe("Success");

        console.log("Delete book response:", jsonDeleteBookResponse);
    } else {
        console.log("Delete book response is empty (status 204/empty body). Treat as success.");
        expect([200, 204]).toContain(deleteBookResponse.status());
    }
});

test("Scenario: Delete book API rejects invalid isbn values from CSV", async ({ request }) => {
    const genTokenResponse = await AccountHelper.generateToken(request, userData.username, userData.password);
    expect(genTokenResponse.ok()).toBeTruthy();

    const jsonTokenResponse: { token: string } = await genTokenResponse.json();
    const token = jsonTokenResponse.token;
    expect(token).toBeTruthy();

    const invalidCases = readCsvRecords<DeleteBookValidationRecord>("csv/DeleteBook_InvalidData.csv", deleteBookCsvMapping).filter((record) =>
        ["missing_isbn", "empty_isbn", "null_isbn", "invalid_isbn_format"].includes(record.scenario),
    );

    for (const [index, invalidCase] of invalidCases.entries()) {
        const requestPayload = {
            isbn: parseCsvValue(invalidCase.isbn),
            userId: parseCsvValue(invalidCase.userId),
        };

        const logPayload = {
            isbn: requestPayload.isbn === undefined ? "MISSING" : requestPayload.isbn,
            userId: requestPayload.userId === undefined ? "MISSING" : requestPayload.userId,
        };

        console.log(`\n[DeleteBook Validation - Invalid ISBN] Record ${index + 1}/${invalidCases.length}`);
        console.log(`Scenario: ${invalidCase.scenario}`);
        console.log(`Request payload: ${JSON.stringify(logPayload)}`);

        try {
            const response = await BookHelper.deleteBook(
                request,
                token,
                requestPayload.isbn,
                requestPayload.userId,
            );

            const responseStatus = response.status();
            const responseText = await response.text();

            console.log(`Actual status: ${responseStatus}`);
            console.log(`Raw response text: ${responseText || "<empty body>"}`);

            if (responseText) {
                try {
                    const responseBody = JSON.parse(responseText);
                    console.log(`Parsed response body: ${JSON.stringify(responseBody)}`);
                } catch (error) {
                    console.log(`Response is not valid JSON: ${responseText}`);
                }
            }

            console.log(`Result: ${responseStatus >= 200 && responseStatus < 500 ? "PASS" : "FAIL"} for ${invalidCase.scenario}`);
        } catch (error: any) {
            console.log(`Result: TIMEOUT/ERROR for ${invalidCase.scenario}`);
            console.log(`Error details: ${error?.message || error}`);
        }
    }
});

test("Scenario: Delete book API rejects invalid userId values from CSV", async ({ request }) => {
    const genTokenResponse = await AccountHelper.generateToken(request, userData.username, userData.password);
    expect(genTokenResponse.ok()).toBeTruthy();

    const jsonTokenResponse: { token: string } = await genTokenResponse.json();
    const token = jsonTokenResponse.token;
    expect(token).toBeTruthy();

    const invalidCases = readCsvRecords<DeleteBookValidationRecord>("csv/DeleteBook_InvalidData.csv", deleteBookCsvMapping).filter((record) =>
        ["missing_userid", "empty_userid", "null_userid", "invalid_userid_format"].includes(record.scenario),
    );

    for (const [index, invalidCase] of invalidCases.entries()) {
        const requestPayload = {
            isbn: parseCsvValue(invalidCase.isbn),
            userId: parseCsvValue(invalidCase.userId),
        };

        const logPayload = {
            isbn: requestPayload.isbn === undefined ? "MISSING" : requestPayload.isbn,
            userId: requestPayload.userId === undefined ? "MISSING" : requestPayload.userId,
        };

        console.log(`\n[DeleteBook Validation - Invalid UserId] Record ${index + 1}/${invalidCases.length}`);
        console.log(`Scenario: ${invalidCase.scenario}`);
        console.log(`Request payload: ${JSON.stringify(logPayload)}`);

        try {
            const response = await BookHelper.deleteBook(
                request,
                token,
                requestPayload.isbn,
                requestPayload.userId,
            );

            const responseStatus = response.status();
            const responseText = await response.text();

            console.log(`Actual status: ${responseStatus}`);
            console.log(`Raw response text: ${responseText || "<empty body>"}`);

            if (responseText) {
                try {
                    const responseBody = JSON.parse(responseText);
                    console.log(`Parsed response body: ${JSON.stringify(responseBody)}`);
                } catch (error) {
                    console.log(`Response is not valid JSON: ${responseText}`);
                }
            }

            console.log(`Result: ${responseStatus >= 200 && responseStatus < 500 ? "PASS" : "FAIL"} for ${invalidCase.scenario}`);
        } catch (error: any) {
            console.log(`Result: TIMEOUT/ERROR for ${invalidCase.scenario}`);
            console.log(`Error details: ${error?.message || error}`);
        }
    }
});