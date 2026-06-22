import puppeteer from 'puppeteer';

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1600, height: 1200 });

    // Go to homepage
    await page.goto('http://localhost:3000', {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    await new Promise(r => setTimeout(r, 800));

    // Scroll to portfolio section - scroll down a bit more
    await page.evaluate(() => {
      const elem = document.getElementById('portfolio');
      if (elem) {
        elem.scrollIntoView({ behavior: 'instant', block: 'start' });
        window.scrollBy(0, 200);
      }
    });

    await new Promise(r => setTimeout(r, 500));

    // Take screenshot of slide 1
    await page.screenshot({
      path: './temporary screenshots/final-01.png',
      fullPage: false
    });
    console.log('✓ Slide 01: PM Apartments');

    // Click next
    await page.click('button[aria-label="Następna realizacja"]');
    await new Promise(r => setTimeout(r, 700));

    // Take screenshot of slide 2
    await page.screenshot({
      path: './temporary screenshots/final-02.png',
      fullPage: false
    });
    console.log('✓ Slide 02: MS Design Studio');

    // Click next
    await page.click('button[aria-label="Następna realizacja"]');
    await new Promise(r => setTimeout(r, 700));

    // Take screenshot of slide 3
    await page.screenshot({
      path: './temporary screenshots/final-03.png',
      fullPage: false
    });
    console.log('✓ Slide 03: Dorimari');

    await browser.close();
    console.log('\n✓ All slides captured successfully');
  } catch (e) {
    console.error('Error:', e.message);
    process.exit(1);
  }
})();
