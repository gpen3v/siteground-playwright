import { expect, type Locator, type Page } from '@playwright/test';
import { domains } from '../test-data/testData.json'

export class EmailPage {
  readonly page: Page;
  readonly domainDropdown: Locator;
  readonly domainDropdownInput: Locator;
  readonly domainDropdownOption: Locator;
  readonly accountNameField: Locator;
  readonly passwordComponent: Locator;
  readonly passwordField: Locator;
  readonly passwordGenerate: Locator;
  readonly createButton: Locator;
  readonly notificationMessage: Locator;
  readonly accountNameTableCell: Locator;

  constructor(page: Page) {
    this.page = page;
    this.domainDropdown = page.getByTestId('domain-select');
    this.domainDropdownInput = this.domainDropdown.locator('input');
    this.domainDropdownOption = this.domainDropdown.getByRole('option');
    this.accountNameField = page.getByTestId('text-input-name');
    this.passwordComponent = page.getByTestId('form-password-password-label');
    this.passwordField = this.passwordComponent.getByTestId('form-password-password');
    this.passwordGenerate = this.passwordComponent.getByTestId('password-generate');
    this.createButton = page.getByTestId('create-box-submit');
    this.notificationMessage = page.getByTestId('box-notification').locator('h3');
    this.accountNameTableCell = page.getByTestId('table-cell').locator('p');
  }

  async validateDropdownOptions(dropdown: Locator) {
    const options = dropdown.getByRole('option');
    await expect(options).toHaveCount(domains.length);
    const optionTexts = await options.allTextContents();
    expect(optionTexts).toEqual(domains);
  }
}