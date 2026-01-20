import { Page } from "@playwright/test";

/**
 * Retrieves the user's first name from the browser's localStorage.
 * @param page - The Playwright Page object to evaluate against
 * @returns The user's first name as a string, or null if the session data is unavailable 
 */
export async function getFirstName(page: Page) {
  const rawKey = await page.evaluate(() => {
    return localStorage.getItem('spanel_session');
  });
  const key = rawKey ? JSON.parse(rawKey) : null;
  const firstName = key.session.user.first_name;
  return firstName;
}