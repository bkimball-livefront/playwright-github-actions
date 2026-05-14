# Claude QA Review — Setup Guide

This repo includes an automated QA review workflow powered by [Claude Code](https://claude.ai/code). When a PR is labeled `qa-review`, Claude analyzes the diff, checks existing test coverage, and posts a traceability matrix comment with a verdict directly on the PR.

## How it works

1. A reviewer adds the `qa-review` label to a PR
2. GitHub Actions triggers the workflow
3. Claude reads the diff, inspects the test files, and builds a coverage matrix
4. A comment is posted on the PR with a markdown table of covered/missing scenarios and a verdict: **READY** / **NEEDS TESTS** / **NEEDS MANUAL VERIFICATION**
5. The label is automatically removed when the review is complete

The workflow can also be triggered manually from the Actions tab with a PR number, without needing to add a label.

---

## Setup instructions for a new repo

### 1. Add the workflow file

Copy [`.github/workflows/qa-review.yml`](.github/workflows/qa-review.yml) into your repo at the same path. No changes required to get started — see [Customizing the prompt](#customizing-the-prompt) below if you want to tailor it to your stack.

### 2. Add Claude Code permissions

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

> **Important:** The workflow restores `.claude` from the default branch for security, so this file must be merged to `main` before the workflow will work correctly.

### 3. Add the GitHub secret

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

### 4. Create the `qa-review` label

In your GitHub repo, go to **Issues → Labels → New label** and create a label named exactly `qa-review`. The color and description are up to you.

Or create it via CLI:

```bash
gh label create qa-review --repo owner/repo --description "Trigger Claude QA review" --color 0075ca
```

---

## Usage

**Via label:** Open any PR and add the `qa-review` label. The workflow triggers automatically.

**Via Actions tab:** Go to **Actions → QA Review → Run workflow**, enter the PR number, and click Run.

---

## Customizing the prompt

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
