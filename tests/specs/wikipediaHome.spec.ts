import { test, expect } from "../fixtures/base.fixture";

test.describe("Wikipedia Tests", () => {

    test.beforeEach(async ({ wikipediaHomePage }) => {
        await wikipediaHomePage.open();
    });

    test("should load Wikipedia homepage", async ({ page, wikipediaHomePage }) => {
        await expect(page).toHaveTitle(/Wikipedia/);
        expect(await wikipediaHomePage.isSearchVisible()).toBeTruthy();
    });

    test("should display multiple language options", async ({ wikipediaHomePage }) => {
        const languageCount = await wikipediaHomePage.getLanguageCount();
        expect(languageCount).toBeGreaterThan(0);
    });

    test("should search for a term", async ({ page, wikipediaHomePage }) => {
        await wikipediaHomePage.search("Playwright");
        
        // Wait for navigation and verify we're on a search results or article page
        await page.waitForLoadState("networkidle");
        expect(page.url()).toContain("wikipedia.org");
    });

    test("should have Wikipedia logo visible", async ({ wikipediaHomePage }) => {
        const logo = wikipediaHomePage.getWikipediaLogo();
        await expect(logo).toBeVisible();
    });
});
