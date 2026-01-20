# Playwright Test Automation suite for SiteGround Web Application

## Test Cases
1. Add an email account.
2. Add an empty email Forwarder.

## Project Structure
```
├── .github/workflows/        # GitHub Actions workflows for CI/CD
│   └── playwright.yml          # Workflow for the Playwright tests
├── pages/                    # Page Objects for reusable locators and custom methods
│   ├── emailPage.ts            # Page object for the Email section
│   └── navigation.ts           # Page object for the Navigation menu     
├── test-data/                # Test data
│   └── testData.json           # Test data file              
├── tests/                    # E2E tests folder
│   └── emailSection.spec.ts    # Tests for new email account and new email forwarder
├── utils/                    # Utils folder
│     └── utils.ts              # File for helping functions
├── global-setup.ts           # Global setup for authentication with a token and saving browser state
└── playwright.config.ts      # Playwright configuration
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
npx playwright test tests/emailSection.spec.ts
```
### Run a specific test by its title:
```bash
npx playwright test --grep "Add a New Email Account"
```

### Run tests in headed mode:
```bash
npx playwright test --headed
```