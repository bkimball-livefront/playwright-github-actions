import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class WikipediaArticlePage extends BasePage {
    // Locators
    public readonly articleTitle: Locator;
    public readonly articleContent: Locator;

    constructor(page: Page) {
        super(page);
        this.articleTitle = page.locator('#firstHeading');
        this.articleContent = page.locator('#mw-content-text');
    }

    /**
     * Navigate directly to a Wikipedia article
     */
    async navigateToArticle(articlePath: string) {
        await this.page.goto(`https://en.wikipedia.org/wiki/${articlePath}`);
        await this.waitForPageLoad();
    }

    /**
     * Get the article title text
     */
    async getArticleTitle(): Promise<string> {
        return (await this.articleTitle.textContent()) || "";
    }

    /**
     * Verify the current article URL matches expected path
     */
    async verifyArticleUrl(expectedPath: string): Promise<boolean> {
        const currentUrl = this.getCurrentURL();
        return currentUrl.includes(expectedPath);
    }

    /**
     * Check if we're on a specific article page
     */
    isOnArticlePage(articleName: string): boolean {
        return this.getCurrentURL().includes(`/wiki/${articleName}`);
    }

    /**
     * Wait for article to load
     */
    async waitForArticleLoad() {
        await this.articleTitle.waitFor({ state: 'visible' });
        await this.waitForPageLoad();
    }
}