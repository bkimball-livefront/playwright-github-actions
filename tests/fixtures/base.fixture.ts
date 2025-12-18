import { test as base, expect } from "@playwright/test";
import { BasePage } from "../pageObject/base.page";
import { WikipediaHomePage } from "../pageObject/wikipediaHome.page";
import { WikipediaArticlePage } from "../pageObject/wikipediaArticle.page";

/**
 * Extended test fixture with custom setup and teardown
 * This allows you to inject custom fixtures into your tests
 */
type BaseTestFixtures = {
    basePage: BasePage;
    wikipediaHomePage: WikipediaHomePage;
    wikipediaArticlePage: WikipediaArticlePage;
};

/**
 * Custom test fixture that extends Playwright's base test
 * Page objects are automatically initialized and available in all tests
 * Usage in test files: import { test, expect } from '../fixtures/base.fixture';
 */
export const test = base.extend<BaseTestFixtures>({
    basePage: async ({ page }, use) => {
        await use(new BasePage(page));
    },
    
    wikipediaHomePage: async ({ page }, use) => {
        await use(new WikipediaHomePage(page));
    },
    
    wikipediaArticlePage: async ({ page }, use) => {
        await use(new WikipediaArticlePage(page));
    },
});

export { expect };
