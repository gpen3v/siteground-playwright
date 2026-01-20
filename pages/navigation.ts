import { type Locator, type Page } from '@playwright/test';

export class Navigation {
  readonly page: Page;
  readonly navigation: Locator;
  readonly emailNavigationGroup: Locator;
  readonly emailLink: Locator;
  readonly forwardersLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navigation = page.getByTestId('navigation');
    this.emailNavigationGroup = this.navigation.getByRole('listitem').getByTestId('navigation-group-mail');
    this.emailLink = page.getByTestId('navigation-list-item-email');
    this.forwardersLink = page.getByTestId('navigation-list-item-email-forward');
  }
}