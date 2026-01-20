import { test, expect } from '@playwright/test';
import { Navigation } from '../pages/navigation';
import { EmailPage } from '../pages/emailPage';
import { domains } from '../test-data/testData.json';

test('Add a New Email Account', async ({ page }) => {
  const navigation = new Navigation(page);
  const emailSection = new EmailPage(page);
  const testAccount = process.env.TEST_ACCOUNT;
  const domain = domains[3];

  await page.goto('/');

  await expect(page.locator('h1')).toHaveText('Hello, Q!');

  await navigation.emailNavigationGroup.click();
  await navigation.emailLink.click();
  await expect(page.locator('h1')).toHaveText('Email Accounts');

  await emailSection.domainDropdown.click();
  await emailSection.validateDropdownOptions(emailSection.domainDropdown);
  await emailSection.domainDropdownOption.getByText(domain).click();
  await expect(emailSection.domainDropdownInput).toHaveAttribute('placeholder', domain);
  
  await emailSection.accountNameField.fill(`${testAccount}`);
  await emailSection.passwordGenerate.click();
  await expect(emailSection.passwordField).not.toHaveValue('');

  await emailSection.createButton.click();
  await expect(emailSection.notificationMessage).toHaveText(`Email account ${testAccount}@${domain} is created.`)

  await expect(emailSection.accountNameTableCell.getByText(`${testAccount}@${domain}`)).toBeVisible();
});
