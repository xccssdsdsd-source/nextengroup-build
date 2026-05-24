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

  await page.screenshot({ path: './temporary screenshots/mobile-0-percent.png' });
  console.log('Saved mobile screenshot at 0% scroll');

  await page.evaluate(() => {
    const heroSection = document.querySelector('section');
    if (heroSection) {
      const scrollHeight = heroSection.scrollHeight;
      window.scrollTo(0, scrollHeight * 0.3);
    }
  });
  await new Promise(r => setTimeout(r, 800));

  await page.screenshot({ path: './temporary screenshots/mobile-30-percent.png' });
  console.log('Saved mobile screenshot at 30% scroll');

  await browser.close();
})();
