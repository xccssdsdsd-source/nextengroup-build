import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

  await page.goto('http://localhost:3001', { waitUntil: 'networkidle2', timeout: 20000 });
  await page.waitForFunction(() => document.readyState === 'complete', { timeout: 5000 });
  await new Promise(r => setTimeout(r, 500));

  // Screenshot at 0% scroll
  await page.screenshot({ path: './temporary screenshots/scroll-0-percent.png' });
  console.log('Saved screenshot at 0% scroll');

  // Scroll to 50% of hero section
  await page.evaluate(() => {
    const heroSection = document.querySelector('section');
    if (heroSection) {
      const scrollHeight = heroSection.scrollHeight;
      window.scrollTo(0, scrollHeight * 0.5);
    }
  });
  await new Promise(r => setTimeout(r, 800));

  // Screenshot at 50% scroll
  await page.screenshot({ path: './temporary screenshots/scroll-50-percent.png' });
  console.log('Saved screenshot at 50% scroll');

  await browser.close();
})();
