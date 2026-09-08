import { test } from '../fixtures';
 
test('Scenario 1: Search book with multiple results', async ({ bookStorePage, searchKeywords }) => {
  for (const keyword of searchKeywords) {
    console.log('Search for: ' + keyword);
    await bookStorePage.goto();
    await bookStorePage.searchBook(keyword);
    const searchResults = await bookStorePage.verifyResult(keyword);
    console.log('Search result:', searchResults);
  }
})