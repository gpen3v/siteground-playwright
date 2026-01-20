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
    await expect(page.locator('h1')).toHaveText(`Hello, ${firstName}!`);
  });

  test('Add a New Email Account', async ({ page }) => {
    
    await navigation.emailNavigationGroup.click();
    await navigation.emailLink.click();
    await expect(page.locator('h1')).toHaveText(testData.pageTitles.accounts);

    await emailSection.dropdownValidateAndSelect(emailSection.domainDropdown, domain);
    
    await emailSection.accountNameField.fill(`${testAccount}`);
    await emailSection.passwordGenerate.click();
    await expect(emailSection.passwordField).not.toHaveValue('');

    await emailSection.createButton.click();
    await expect(emailSection.notificationMessage).toHaveText(`Email account ${testAccount}@${domain} is created.`)

    await expect(emailSection.accountNameTableCell.getByText(`${testAccount}@${domain}`)).toBeVisible();
  });

  test('Add a New Empty Email Forwarder', async ({ page }) => {
  
    await navigation.emailNavigationGroup.click();
    await navigation.forwardersLink.click();
    await expect(page.locator('h1')).toHaveText(testData.pageTitles.forwarders);
  
    await emailSection.dropdownValidateAndSelect(emailSection.domainDropdown, domain);
  
    await emailSection.createButton.click();
    await expect(emailSection.forwarderNameFieldValidation).toHaveText(testData.validationRequiredField);
  });
});
