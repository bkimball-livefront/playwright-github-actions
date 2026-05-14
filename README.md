# Playwright GitHub Actions

A Playwright test automation framework with GitHub Actions integration, featuring page object model design pattern and comprehensive Wikipedia test coverage.

## 🚀 Features

- **Page Object Model (POM)** - Organized test structure with reusable page components
- **Custom Fixtures** - Extended Playwright test fixtures for better test organization
- **Parallel Execution** - Tests run in parallel for faster execution
- **Multiple Browsers** - Chromium, Firefox, and WebKit support
- **GitHub Actions Ready** - Pre-configured for CI/CD integration
- **Visual Debugging** - Screenshots and videos on test failures
- **Comprehensive Reporting** - HTML and blob reports for test results

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/bkimball-livefront/playwright-github-actions.git
cd playwright-github-actions
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

## 🏗️ Project Structure

```
playwright-github-actions/
├── tests/
│   ├── fixtures/
│   │   └── base.fixture.ts        # Custom test fixtures
│   ├── pageObject/
│   │   ├── base.page.ts           # Base page object
│   │   ├── wikipediaHome.page.ts  # Wikipedia home page object
│   │   └── wikipediaArticle.page.ts # Wikipedia article page object
│   └── specs/
│       ├── wikipediaHome.spec.ts  # Home page tests
│       └── wikipediaArticle.spec.ts # Article page tests
├── playwright.config.ts           # Playwright configuration
├── package.json                   # Project dependencies
└── README.md                      # This file
```

## 🧪 Running Tests

### Run all tests
```bash
npx playwright test
```

### Run tests in UI mode
```bash
npx playwright test --ui
```

### Run specific test file
```bash
npx playwright test tests/specs/wikipediaHome.spec.ts
```

### Run tests with specific tag
```bash
npx playwright test --grep @smoke
```

### Run tests in headed mode
```bash
npx playwright test --headed
```

### Run tests in specific browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Debug tests
```bash
npx playwright test --debug
```

## 📊 View Test Reports

After running tests, view the HTML report:
```bash
npx playwright show-report
```

## 🏷️ Test Tags

Tests are organized with the following tags:
- `@smoke` - Quick smoke tests
- `@sanity` - Sanity test suite

Filter tests by tags:
```bash
npx playwright test --grep @smoke
```

## 🔧 Configuration

Test configuration is managed in [playwright.config.ts](playwright.config.ts):

- **Base URL**: `https://www.wikipedia.org/`
- **Retries**: 2 retries on CI, 0 locally
- **Workers**: 1 worker on CI, parallel locally
- **Screenshots**: Captured on failure
- **Videos**: Retained on failure
- **Trace**: Captured on first retry

## 📝 Writing Tests

Tests use the Page Object Model pattern with custom fixtures:

```typescript
import { test, expect } from "../fixtures/base.fixture";

test("example test", async ({ wikipediaHomePage }) => {
    await wikipediaHomePage.open();
    await expect(page).toHaveTitle(/Wikipedia/);
});
```

## 🤖 GitHub Actions Integration

This project is configured to run with GitHub Actions. The configuration includes:
- Automated test execution on push/pull requests
- Blob reporter for CI environments
- Artifact uploading for test reports

## 🔍 Available Test Suites

### Wikipedia Home Page Tests
- Homepage loading verification
- Language options display
- Search functionality
- Logo visibility

### Wikipedia Article Tests
Additional article-specific tests (see [wikipediaArticle.spec.ts](tests/specs/wikipediaArticle.spec.ts))

## 🛡️ Best Practices

- Use page objects for better maintainability
- Leverage custom fixtures for common setup
- Tag tests appropriately for filtering
- Keep tests independent and idempotent
- Use meaningful test descriptions

## 📚 Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Page Object Model](https://playwright.dev/docs/pom)

## 📄 License

ISC

## 👤 Author

Benjamin Kimball

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🐛 Issues

Report issues at: https://github.com/bkimball-livefront/playwright-github-actions/issues