import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 1 });

  await page.goto('http://localhost:3001', { waitUntil: 'networkidle2', timeout: 20000 });
  await page.waitForFunction(() => document.readyState === 'complete', { timeout: 5000 });
  await new Promise(r => setTimeout(r, 500));

  // Test button click
  const buttons = await page.$$('a[href="#kontakt"], a[href="/realizacje"]');
  console.log(`Found ${buttons.length} action buttons`);

  // Check if section exists
  const sections = await page.$$('section');
  console.log(`Found ${sections.length} sections`);

  // Screenshot at different scroll positions
  await page.screenshot({ path: './temporary screenshots/mobile-0.png' });
  console.log('0% scroll');

  await page.evaluate(() => window.scrollBy(0, 300));
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: './temporary screenshots/mobile-mid.png' });
  console.log('Mid scroll');

  await page.evaluate(() => window.scrollBy(0, 400));
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: './temporary screenshots/mobile-bottom.png' });
  console.log('Bottom scroll');

  await browser.close();
})();
