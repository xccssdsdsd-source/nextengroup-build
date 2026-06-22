import puppeteer from 'puppeteer';

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: 'new', args: ['--disable-blink-features=AutomationControlled'] });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
    
    // Scroll to portfolio section
    await page.evaluate(() => {
      const elem = document.getElementById('portfolio');
      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
    });
    
    await page.waitForTimeout(800);
    await page.screenshot({ path: './temporary screenshots/slide-01-pm-apartments.png' });
    console.log('Captured slide 01');
    
    // Click next button to get slide 02
    const button = await page.$('button[aria-label="Następna realizacja"]');
    if (button) {
      await button.click();
      await page.waitForTimeout(600);
      await page.screenshot({ path: './temporary screenshots/slide-02.png' });
      console.log('Captured slide 02');
    }
    
    // Click next button again to get slide 03
    const button2 = await page.$('button[aria-label="Następna realizacja"]');
    if (button2) {
      await button2.click();
      await page.waitForTimeout(600);
      await page.screenshot({ path: './temporary screenshots/slide-03.png' });
      console.log('Captured slide 03');
    }
    
    await browser.close();
  } catch (e) {
    console.error(e);
  }
})();
