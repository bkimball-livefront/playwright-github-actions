import { Page, Locator, expect } from "@playwright/test";

export class BasePage {
    protected page: Page;
    protected baseURL: string = "https://www.wikipedia.org/";

    protected donationCloseButton: Locator;
    protected thankYouDonationCloseButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.donationCloseButton = page.getByRole('link', { name: 'I already donated' })
        this.thankYouDonationCloseButton = page.getByRole('button', { name: 'Close' })
    }

    /**
     * Navigate to the base URL or a specific path
     */
    async goto(path: string = "") {
        const url = path ? `${this.baseURL}${path}` : this.baseURL;
        await this.page.goto(url);
    }

    /**
     * Wait for the page to load completely
     */
    async waitForPageLoad() {
        await this.page.waitForLoadState("domcontentloaded");
        await this.page.waitForLoadState("networkidle");
    }

    /**
     * Get page title
     */
    async getTitle(): Promise<string> {
        return await this.page.title();
    }

    /**
     * Get current URL
     */
    getCurrentURL(): string {
        return this.page.url();
    }

    /**
     * Click on an element
     */
    async click(locator: string | Locator) {
        const element = typeof locator === "string" ? this.page.locator(locator) : locator;
        await element.click();
    }

    /**
     * Fill input field
     */
    async fill(locator: string | Locator, text: string) {
        const element = typeof locator === "string" ? this.page.locator(locator) : locator;
        await element.fill(text);
    }

    /**
     * Type text into input field
     */
    async type(locator: string | Locator, text: string, options?: { delay?: number }) {
        const element = typeof locator === "string" ? this.page.locator(locator) : locator;
        await element.pressSequentially(text, options);
    }

    /**
     * Get text content from an element
     */
    async getText(locator: string | Locator): Promise<string> {
        const element = typeof locator === "string" ? this.page.locator(locator) : locator;
        return (await element.textContent()) || "";
    }

    /**
     * Check if element is visible
     */
    async isVisible(locator: string | Locator): Promise<boolean> {
        const element = typeof locator === "string" ? this.page.locator(locator) : locator;
        return await element.isVisible();
    }

    /**
     * Click on an element only if it's visible
     * @param locator - Element to click
     * @param timeout - Time to wait for visibility check (default: 5000ms)
     * @returns true if clicked, false if element wasn't visible
     */
    async clickIfVisible(locator: string | Locator, timeout: number = 5000): Promise<boolean> {
        try {
            const element = typeof locator === "string" ? this.page.locator(locator) : locator;
            await element.waitFor({ state: "visible", timeout });
            await element.click();
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Wait for element to be visible
     */
    async waitForElement(locator: string | Locator, timeout: number = 30000) {
        const element = typeof locator === "string" ? this.page.locator(locator) : locator;
        await element.waitFor({ state: "visible", timeout });
    }

    /**
     * Wait for element to be hidden
     */
    async waitForElementHidden(locator: string | Locator, timeout: number = 30000) {
        const element = typeof locator === "string" ? this.page.locator(locator) : locator;
        await element.waitFor({ state: "hidden", timeout });
    }

    /**
     * Take a screenshot
     */
    async takeScreenshot(name: string) {
        await this.page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
    }

    /**
     * Press a keyboard key
     */
    async press(key: string) {
        await this.page.keyboard.press(key);
    }

    /**
     * Scroll to element
     */
    async scrollToElement(locator: string | Locator) {
        const element = typeof locator === "string" ? this.page.locator(locator) : locator;
        await element.scrollIntoViewIfNeeded();
    }

    /**
     * Get attribute value from an element
     */
    async getAttribute(locator: string | Locator, attribute: string): Promise<string | null> {
        const element = typeof locator === "string" ? this.page.locator(locator) : locator;
        return await element.getAttribute(attribute);
    }

    /**
     * Hover over an element
     */
    async hover(locator: string | Locator) {
        const element = typeof locator === "string" ? this.page.locator(locator) : locator;
        await element.hover();
    }

    /**
     * Select option from dropdown
     */
    async selectOption(locator: string | Locator, value: string) {
        const element = typeof locator === "string" ? this.page.locator(locator) : locator;
        await element.selectOption(value);
    }

    /**
     * Get element count
     */
    async getElementCount(locator: string | Locator): Promise<number> {
        const element = typeof locator === "string" ? this.page.locator(locator) : locator;
        return await element.count();
    }

    /**
     * Reload the current page
     */

    /**
     * Close donation modal if visible
     */
    async closeDonationModalIfVisible() {
        await this.clickIfVisible(this.donationCloseButton);
        await this.clickIfVisible(this.thankYouDonationCloseButton);
    }

    async reload() {
        await this.page.reload();
    }

    /**
     * Go back in browser history
     */
    async goBack() {
        await this.page.goBack();
    }

    /**
     * Go forward in browser history
     */
    async goForward() {
        await this.page.goForward();
    }
}