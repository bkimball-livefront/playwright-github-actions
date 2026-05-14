import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

/**
 * Page Object Model for Wikipedia homepage
 */
export class WikipediaHomePage extends BasePage {
    // Locators
    public readonly searchInput: Locator;
    public readonly searchButton: Locator;
    public readonly languageLinks: Locator;
    public readonly suggestionLinks: Locator;
    public readonly suggestionTitles: Locator;
    public readonly suggestionDescriptions: Locator;

    constructor(page: Page) {
        super(page);
        this.searchInput = page.getByRole('searchbox', { name: 'Search Wikipedia' });
        this.searchButton = page.locator('button[type="submit"]');
        this.languageLinks = page.locator('.central-featured-lang');
        this.suggestionLinks = page.locator('a.suggestion-link');
        this.suggestionTitles = page.locator('.suggestion-title');
        this.suggestionDescriptions = page.locator('.suggestion-description');
    }

    /**
     * Navigate to Wikipedia homepage
     */
    async open() {
        await this.goto();
        await this.waitForPageLoad();
    }

    /**
     * Search for a term on Wikipedia
     */
    async search(searchTerm: string) {
        await this.searchInput.fill(searchTerm);
        await this.searchButton.click();
        await this.waitForPageLoad();
    }

    /**
     * Select a language from the homepage
     */
    async selectLanguage(language: string) {
        const languageLink = this.page.locator(`a[data-lang="${language}"]`);
        await languageLink.click();
        await this.waitForPageLoad();
    }

    /**
     * Get all available language options
     */
    async getLanguageCount(): Promise<number> {
        return await this.languageLinks.count();
    }

    /**
     * Check if search input is visible
     */
    async isSearchVisible(): Promise<boolean> {
        return await this.searchInput.isVisible();
    }


    /**
     * Get count of search suggestion links
     */
    async getSuggestionCount(): Promise<number> {
        return await this.suggestionLinks.count();
    }

    /**
     * Get a specific suggestion link by title
     */
    getSuggestionByTitle(title: string): Locator {
        return this.page.locator(`a.suggestion-link:has(.suggestion-title:text-is("${title}"))`);
    }

    /**
     * Get a specific suggestion link by description
     */
    getSuggestionByDescription(description: string): Locator {
        return this.page.locator(`a.suggestion-link:has(.suggestion-description:text-is("${description}"))`);
    }

    /**
     * Get a specific suggestion link by both title and description
     */
    getSuggestionByTitleAndDescription(title: string, description: string): Locator {
        return this.page.locator(
            `a.suggestion-link:has(.suggestion-title:text-is("${title}")):has(.suggestion-description:text-is("${description}"))`
        );
    }

    /**
     * Click a suggestion by title
     */
    async clickSuggestionByTitle(title: string) {
        await this.getSuggestionByTitle(title).click();
        await this.waitForPageLoad();
    }

    /**
     * Type in search and wait for suggestions to appear
     */
    async typeSearchAndWaitForSuggestions(searchTerm: string) {
        await this.searchInput.fill(searchTerm);
        await this.suggestionLinks.first().waitFor({ state: 'visible' });
    }
    /**
     * Get the Wikipedia logo element
     */
    getWikipediaLogo(): Locator {
        return this.page.locator('.central-textlogo');
    }
}
