import { test, expect } from "../fixtures/page.fixture";
import { keywords, invalidKeywords } from "../test-data/SearchKeyword";

test("Scenario 1: Search book with multiple results", async ({ basePage,  bookStorePage}) => {
  await basePage.goToBookStore();
  for (const keyword of keywords) {
    console.log("Search for: " + keyword);
    await bookStorePage.searchBook(keyword);

    const titles = await bookStorePage.getSearchResults();
    expect(titles.length).toBeGreaterThan(0);
    
    titles.forEach((title) => {
      expect(title.toLowerCase()).toContain(keyword.toLowerCase());
      console.log('Search result:', title);
    });
  }
});

test("Scenario 2: Search book with no results", async ({ basePage,  bookStorePage}) => {
  await basePage.goToBookStore();
  for (const keyword of invalidKeywords) {
    console.log("Search for: " + keyword);
    await bookStorePage.searchBook(keyword);
    const results = await bookStorePage.getSearchResults();

    expect(results).toHaveLength(0);
    console.log('No results found for keyword:', keyword);
  }
});
