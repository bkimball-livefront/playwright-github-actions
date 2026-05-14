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

---

## 🧠 Claude QA Review Setup

This repo includes an automated QA review workflow powered by [Claude Code](https://claude.ai/code). When a PR is labeled `qa-review`, Claude analyzes the diff, checks existing test coverage, and posts a traceability matrix comment with a verdict directly on the PR.

### How it works

1. A reviewer adds the `qa-review` label to a PR
2. GitHub Actions triggers the workflow
3. Claude reads the diff, inspects the test files, and builds a coverage matrix
4. A comment is posted on the PR with a markdown table of covered/missing scenarios and a verdict: **READY** / **NEEDS TESTS** / **NEEDS MANUAL VERIFICATION**
5. The label is automatically removed when the review is complete

The workflow can also be triggered manually from the Actions tab with a PR number, without needing to add a label.

---

### Setup instructions for a new repo

#### 1. Add the workflow file

Copy [`.github/workflows/qa-review.yml`](.github/workflows/qa-review.yml) into your repo at the same path. No changes required to get started — see [Customizing the prompt](#customizing-the-prompt) below if you want to tailor it to your stack.

#### 2. Add Claude Code permissions

Create `.claude/settings.local.json` in your repo with the following content. This grants Claude permission to run the `gh` CLI commands it needs to read the PR and post the comment:

```json
{
  "permissions": {
    "allow": [
      "Bash(git *)",
      "Bash(gh pr diff *)",
      "Bash(gh pr view *)",
      "Bash(gh pr comment *)",
      "Bash(gh pr list *)",
      "Bash(gh pr checks *)",
      "Bash(gh issue view *)",
      "Bash(gh issue list *)",
      "Bash(gh run view *)",
      "Bash(gh run list *)",
      "Bash(gh repo view *)",
      "Bash(find . *)"
    ]
  }
}
```

> **Note:** The workflow restores `.claude` from the default branch for security, so this file must be merged to `main` before the workflow will work correctly.

#### 3. Add the GitHub secret

The workflow authenticates with Claude using your Claude Code OAuth token. To add it:

1. Open the [Claude Code](https://claude.ai/code) desktop app or CLI and run `/login` if you haven't already
2. Run the following command to extract your token and set the secret in one step (replace `owner/repo` with your repo):

```bash
security find-generic-password -s "Claude Code-credentials" -w | \
  python3 -c "import json,sys; print(json.load(sys.stdin)['claudeAiOauth']['accessToken'])" | \
  gh secret set CLAUDE_CODE_OAUTH_TOKEN --repo owner/repo
```

3. Verify it was set: **GitHub repo → Settings → Secrets and variables → Actions → `CLAUDE_CODE_OAUTH_TOKEN`**

> **Troubleshooting:** If the workflow fails with `Header '14' has invalid value`, the secret contains a newline — re-run the command above to replace it with the correct single-line value.

#### 4. Create the `qa-review` label

In your GitHub repo, go to **Issues → Labels → New label** and create a label named exactly `qa-review`. The color and description are up to you.

Or create it via CLI:

```bash
gh label create qa-review --repo owner/repo --description "Trigger Claude QA review" --color 0075ca
```

---

### Usage

**Via label:** Open any PR and add the `qa-review` label. The workflow triggers automatically.

**Via Actions tab:** Go to **Actions → QA Review → Run workflow**, enter the PR number, and click Run.

---

### Customizing the prompt

The prompt in `qa-review.yml` works for any repo out of the box, but you can tailor it to your stack. Look for the `prompt:` block in the workflow and add context like:

- Your test framework (`Jest`, `Cypress`, `Playwright`, etc.)
- Specific directories to focus on
- Coverage thresholds or team conventions
- Types of tests you care about (unit, integration, E2E, accessibility, etc.)

Example addition to the prompt:

```yaml
prompt: |
  You are a QA engineer reviewing a React + Playwright repo.
  Unit tests are in `src/**/*.test.tsx`, E2E tests are in `tests/specs/`.
  ...
```

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