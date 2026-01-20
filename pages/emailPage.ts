import { expect, type Locator, type Page } from '@playwright/test';
import { domains } from '../test-data/testData.json'

export class EmailPage {
  readonly page: Page;
  readonly domainDropdown: Locator;

  readonly accountNameField: Locator;
  readonly passwordComponent: Locator;
  readonly passwordField: Locator;
  readonly passwordGenerate: Locator;
  readonly createButton: Locator;
  readonly notificationMessage: Locator;
  readonly accountNameTableCell: Locator;

  readonly forwarderNameField: Locator;
  readonly forwarderNameFieldValidation: Locator;

  constructor(page: Page) {
    this.page = page;
    this.domainDropdown = page.getByTestId('domain-select');

    this.accountNameField = page.getByTestId('text-input-name');
    this.passwordComponent = page.getByTestId('form-password-password-label');
    this.passwordField = this.passwordComponent.getByTestId('form-password-password');
    this.passwordGenerate = this.passwordComponent.getByTestId('password-generate');
    this.createButton = page.getByTestId('create-box-submit');
    this.notificationMessage = page.getByTestId('box-notification').locator('h3');
    this.accountNameTableCell = page.getByTestId('table-cell').locator('p');

    this.forwarderNameField = page.getByTestId('forward-crate-name-label');
    this.forwarderNameFieldValidation = this.forwarderNameField.getByTestId('validation');
  }

  async dropdownValidateAndSelect(dropdown: Locator, option: string) {
    await dropdown.click();
    const options = dropdown.getByRole('option');
    await expect(options).toHaveCount(domains.length);
    const optionTexts = await options.allTextContents();
    expect(optionTexts).toEqual(domains);
    await dropdown.getByRole('option').getByText(option).click();
    await expect(dropdown.locator('input')).toHaveAttribute('placeholder', option);
  }
}