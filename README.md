# Playwright Test Automation suite for SiteGround Web Application

This project contains an end-to-end test automation suite built with Playwright
to validate functionality in the Email section of the SiteGround web application.

## Test Cases Coverage
TC#1: Add an email account.
TC#2: Add an empty email forwarder.

## Project Structure
```
├── .github/workflows/          # GitHub Actions workflows for CI/CD
│   └── playwright.yml            # Workflow for the Playwright tests
├── pages/                      # Page Objects for reusable locators and custom methods
│   ├── emailPage.ts              # Page object for the Email section
│   └── navigation.ts             # Page object for the Navigation menu     
├── test-data/                  # Test data
│   └── testData.json             # Test data file              
├── tests/                      # E2E tests folder
│   └── emailSectionTests.spec.ts # Tests for new email account and new email forwarder
├── utils/                      # Utils folder
│     └── utils.ts                # Helpier functions file
├── global-setup.ts             # Global setup for authentication with a token and saving browser state
└── playwright.config.ts        # Playwright configuration
```

## Installation

### Prerequisites

- Node.js (LTS version)
- npm (comes with Node.js)

### Installation steps

1. Clone the repository:
```bash
git clone https://github.com/gpen3v/siteground-playwright.git
cd siteground-playwright
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install --with-deps
```

## Running Tests

### Run all tests:
```bash
npx playwright test
```

### Run a specific test file:
```bash
npx playwright test tests/emailSectionTests.spec.ts
```
### Run a specific test by its title:
```bash
npx playwright test --grep "Add a New Email Account"
```

### Run tests in headed mode:
```bash
npx playwright test --headed
```

## Additional Information

- A global setup is implemented to perform authentication with a token and persist browser state.
- Tests run automatically as part of a GitHub Actions CI/CD workflow.
- The dotenv package is added, with sensitive data such as URLs, tokens, and credentials stored locally in a `.env` file and as repository secrets for CI/CD execution.
- Playwright test reports are generated and published to GitHub Pages - https://gpen3v.github.io/siteground-playwright/