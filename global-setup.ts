import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const baseUrl = process.env.BASE_URL;
  const token = process.env.DEMO_TOKEN;

  await page.goto(`${baseUrl}/?demoToken=${token}`);

  await page.waitForLoadState('networkidle');

  await page.waitForFunction(() => localStorage.length > 0);

  await context.storageState({ path: 'storageState.json' });

  await browser.close();
}

export default globalSetup;
