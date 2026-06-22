import puppeteer from 'puppeteer';

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    // Go to homepage
    await page.goto('http://localhost:3000', {
      waitUntil: 'domcontentloaded',
      timeout: 15000
    });

    // Wait a bit for images to load
    await new Promise(r => setTimeout(r, 1000));

    // Scroll to portfolio and center it
    await page.evaluate(() => {
      const elem = document.getElementById('portfolio');
      if (elem) {
        elem.scrollIntoView({ behavior: 'instant', block: 'center' });
        // Extra scroll down to show more of the carousel
        window.scrollBy(0, 200);
      }
    });

    await new Promise(r => setTimeout(r, 500));

    // Take slide 1
    await page.screenshot({ path: './temporary screenshots/slide-01.png' });
    console.log('✓ Slide 01: PM Apartments');

    // Click next
    await page.click('button[aria-label="Następna realizacja"]');
    await new Promise(r => setTimeout(r, 600));

    // Take slide 2
    await page.screenshot({ path: './temporary screenshots/slide-02.png' });
    console.log('✓ Slide 02: MS Design Studio');

    // Click next
    await page.click('button[aria-label="Następna realizacja"]');
    await new Promise(r => setTimeout(r, 600));

    // Take slide 3
    await page.screenshot({ path: './temporary screenshots/slide-03.png' });
    console.log('✓ Slide 03: Dorimari');

    await browser.close();
    console.log('\n✓ All slides captured');
  } catch (e) {
    console.error('Error:', e.message);
    process.exit(1);
  }
})();
