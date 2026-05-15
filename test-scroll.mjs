import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({headless: 'new', defaultViewport: {width: 1920, height: 1080}});
const page = await browser.newPage();
await page.goto('http://localhost:3000', {waitUntil: 'networkidle0', timeout: 30000});

// Wait for animations to settle
await page.waitForTimeout(2000);

// Take initial screenshot
await page.screenshot({path: 'temporary screenshots/hero.png', fullPage: false});

// Scroll to Services section
await page.evaluate(() => {
  const el = document.querySelector('#uslugi');
  if (el) el.scrollIntoView({behavior: 'auto'});
});
await page.waitForTimeout(2000);
await page.screenshot({path: 'temporary screenshots/services.png', fullPage: false});

// Scroll to Process section
await page.evaluate(() => {
  const el = document.querySelector('#proces');
  if (el) el.scrollIntoView({behavior: 'auto'});
});
await page.waitForTimeout(2000);
await page.screenshot({path: 'temporary screenshots/process.png', fullPage: false});

// Scroll to Portfolio section
await page.evaluate(() => {
  const el = document.querySelector('#portfolio');
  if (el) el.scrollIntoView({behavior: 'auto'});
});
await page.waitForTimeout(2000);
await page.screenshot({path: 'temporary screenshots/portfolio.png', fullPage: false});

await browser.close();
console.log('All screenshots taken');
