import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    headless: true,
    args: ['--no-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto('http://localhost:3002', { waitUntil: 'networkidle2', timeout: 20000 });
  await page.screenshot({ path: './temporary screenshots/screenshot-hero.png' });
  console.log('Saved hero screenshot');
  
  // Scroll to services section
  await page.evaluate(() => {
    document.getElementById('uslugi').scrollIntoView({ behavior: 'smooth' });
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: './temporary screenshots/screenshot-services.png' });
  console.log('Saved services screenshot');
  
  await browser.close();
})();
