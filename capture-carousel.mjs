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
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    await new Promise(r => setTimeout(r, 1000));

    // Get the portfolio section element and screenshot just that area
    const portfolioBox = await page.$('#portfolio');
    if (!portfolioBox) {
      console.error('Portfolio section not found');
      process.exit(1);
    }

    const boundingBox = await portfolioBox.boundingBox();
    console.log('Portfolio bounding box:', boundingBox);

    // Screenshot slide 1
    // Take full page screenshot but adjusted to portfolio section
    const fullHeight = await page.evaluate(() => document.body.scrollHeight);
    await page.screenshot({
      path: './temporary screenshots/carousel-01.png',
      clip: {
        x: boundingBox.x,
        y: Math.max(0, boundingBox.y - 50),
        width: boundingBox.width,
        height: boundingBox.height + 100
      }
    });
    console.log('✓ Slide 01: PM Apartments');

    // Click next for slide 2
    await page.click('button[aria-label="Następna realizacja"]');
    await new Promise(r => setTimeout(r, 700));

    // Get updated bounding box
    const boundingBox2 = await portfolioBox.boundingBox();
    await page.screenshot({
      path: './temporary screenshots/carousel-02.png',
      clip: {
        x: boundingBox2.x,
        y: Math.max(0, boundingBox2.y - 50),
        width: boundingBox2.width,
        height: boundingBox2.height + 100
      }
    });
    console.log('✓ Slide 02: MS Design Studio');

    // Click next for slide 3
    await page.click('button[aria-label="Następna realizacja"]');
    await new Promise(r => setTimeout(r, 700));

    // Get updated bounding box
    const boundingBox3 = await portfolioBox.boundingBox();
    await page.screenshot({
      path: './temporary screenshots/carousel-03.png',
      clip: {
        x: boundingBox3.x,
        y: Math.max(0, boundingBox3.y - 50),
        width: boundingBox3.width,
        height: boundingBox3.height + 100
      }
    });
    console.log('✓ Slide 03: Dorimari');

    await browser.close();
    console.log('\n✓ All carousel slides captured');
  } catch (e) {
    console.error('Error:', e.message);
    process.exit(1);
  }
})();
