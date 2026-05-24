import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    headless: true,
    args: ['--no-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 2000, deviceScaleFactor: 1 });
  await page.goto('http://localhost:3002', { waitUntil: 'networkidle2', timeout: 20000 });
  await page.screenshot({ path: './temporary screenshots/screenshot-fullpage.png', fullPage: true });
  console.log('Saved fullpage screenshot');
  await browser.close();
})();
