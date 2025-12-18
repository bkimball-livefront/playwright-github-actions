import { expect, test } from "../fixtures/base.fixture";

test.describe("Additional Wiki tests", () => {

    test.beforeEach(async ({ wikipediaHomePage }) => {
        await wikipediaHomePage.open();
        await wikipediaHomePage.closeDonationModalIfVisible();
    })

    test("Validate Wikipedia exact match search", async ({ page, wikipediaHomePage, wikipediaArticlePage }) => {
        const SEARCH_TERM = "Playwright (software)"
        await wikipediaHomePage.typeSearchAndWaitForSuggestions(SEARCH_TERM);
        await expect(wikipediaHomePage.suggestionLinks).toHaveCount(1);
        await wikipediaHomePage.clickSuggestionByTitle(SEARCH_TERM);
        expect(wikipediaArticlePage.getCurrentURL()).toBe("https://en.wikipedia.org/wiki/Playwright_(software)");
        await expect(page).toHaveTitle(`${SEARCH_TERM} - Wikipedia`);


        /**
         * enter search term "playwright (software)"
         * validate search results
         * select result
         * validate correct article diisplays
         *   verify url
         *   verify page title is displayed with expected text
        **/
    })
})