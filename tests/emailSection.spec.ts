import { test, expect } from '@playwright/test';
import { Navigation } from '../pages/navigation';
import { EmailPage } from '../pages/emailPage';
import { getFirstName } from '../utils/utils';
import testData from '../test-data/testData.json';

test.describe('SiteGround Web Application - Email Section tests', () => {
  let navigation: Navigation;
  let emailSection: EmailPage;
  let testAccount: string | undefined;
  let domain: string;

  test.beforeEach(async ({ page }) => {
    navigation = new Navigation(page);
    emailSection = new EmailPage(page);
    testAccount = process.env.TEST_ACCOUNT;
    domain = testData.domains[3];

    // Go to the web application
    await page.goto('/');
    const firstName = await getFirstName(page);
    await expect(
      page.locator('h1'),
      `Hello, ${firstName}! title is displayed`
    ).toHaveText(`Hello, ${firstName}!`);
  });

  test('Add a New Email Account', async ({ page }) => {
    
    // Navigate to Email Accounts
    await navigation.emailNavigationGroup.click();
    await navigation.emailLink.click();
    await expect(
      page.locator('h1'),
      `Page heading: ${testData.pageHeadings.accounts}`
    ).toHaveText(testData.pageHeadings.accounts);

    // Validate Select Domain dropdown and select a domain
    await emailSection.domainDropdownValidateAndSelect(domain);
    
    // Create an account with account name and generated password
    await emailSection.accountNameField.fill(`${testAccount}`);
    await emailSection.passwordGenerate.click();
    await expect(
      emailSection.passwordField,
      `Password is generated`
    ).not.toHaveValue('');
    await emailSection.createButton.click();
    await expect(
      emailSection.notificationMessage,
      `Successful message: Email account ${testAccount}@${domain} is created.`
    ).toHaveText(`Email account ${testAccount}@${domain} is created.`)
    
    // Validate the new account in the Manage Email Accounts table
    await expect(
      emailSection.accountNameTableCell.getByText(`${testAccount}@${domain}`),
      `${testAccount}@${domain} account appears in the “Manage Email Accounts table`
    ).toBeVisible();
  });

  test('Add a New Empty Email Forwarder', async ({ page }) => {
  
    // Navigate to Email Forwarders
    await navigation.emailNavigationGroup.click();
    await navigation.forwardersLink.click();
    await expect(
      page.locator('h1'),
      `Page heading: ${testData.pageHeadings.forwarders}`
    ).toHaveText(testData.pageHeadings.forwarders);

    // Validate Select Domain dropdown and select a domain
    await emailSection.domainDropdownValidateAndSelect(domain);
    
    // Validate the "Required field." error message for "Forward all messages sent to:” input
    await emailSection.createButton.click();
    await expect(
      emailSection.forwarderNameFieldValidation,
      `${testData.validationRequiredField} error message for`
    ).toHaveText(testData.validationRequiredField);
  });
});
