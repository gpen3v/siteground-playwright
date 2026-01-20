import { expect, type Locator, type Page } from '@playwright/test';
import { domains } from '../test-data/testData.json'

export class EmailPage {
  readonly page: Page;
  // Common locators
  readonly domainDropdown: Locator;
  readonly domainDropdownInput: Locator;
  readonly domainDropdownOption: Locator;
  // Email Accounts locators
  readonly accountNameField: Locator;
  readonly passwordComponent: Locator;
  readonly passwordField: Locator;
  readonly passwordGenerate: Locator;
  readonly createButton: Locator;
  readonly notificationMessage: Locator;
  readonly accountNameTableCell: Locator;
  // Email Forwarders locators
  readonly forwarderNameField: Locator;
  readonly forwarderNameFieldValidation: Locator;

  constructor(page: Page) {
    this.page = page;
    // Common locators
    this.domainDropdown = page.getByTestId('domain-select');
    this.domainDropdownInput = this.domainDropdown.locator('input');
    this.domainDropdownOption = this.domainDropdown.getByRole('option');
    // Email Accounts locators
    this.accountNameField = page.getByTestId('text-input-name');
    this.passwordComponent = page.getByTestId('form-password-password-label');
    this.passwordField = this.passwordComponent.getByTestId('form-password-password');
    this.passwordGenerate = this.passwordComponent.getByTestId('password-generate');
    this.createButton = page.getByTestId('create-box-submit');
    this.notificationMessage = page.getByTestId('box-notification').locator('h3');
    this.accountNameTableCell = page.getByTestId('table-cell').locator('p');
    // Email Forwarders locators
    this.forwarderNameField = page.getByTestId('forward-crate-name-label');
    this.forwarderNameFieldValidation = this.forwarderNameField.getByTestId('validation');
  }

  /**
   * Clicks on the domain dropdown, validates available options against test data,
   * selects the specified domain, and verifies it is selected.
   * @param option - The domain value to select from the dropdown.
   */
  async domainDropdownValidateAndSelect(option: string) {
    await this.domainDropdown.click();
    const options = this.domainDropdownOption;
    await expect(
      options,
      `${await options.count()} options in the Select Domain dropdown, ${domains.length} domains in testData.json`
    ).toHaveCount(domains.length);
    const optionTexts = await options.allTextContents();
    expect(
      optionTexts,
      `Domain options: ${optionTexts}`
    ).toEqual(domains);
    await this.domainDropdownOption.getByText(option).click();
    await expect(
      this.domainDropdownInput,
      `${option} is selected in the Select Domain dropdown`
    ).toHaveAttribute('placeholder', option);
  }
}