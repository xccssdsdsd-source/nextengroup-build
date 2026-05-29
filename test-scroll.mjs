import puppeteer from 'puppeteer-core';
import { execSync } from 'child_process';

async function testScroll() {
  let browser;
  try {
    // Launch browser
    browser = await puppeteer.launch({
      executablePath: 'C:\Program Files\Google\Chrome\Application\chrome.exe',
      headless: true,
      args: ['--no-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto('http://localhost:3002', { waitUntil: 'networkidle2', timeout: 10000 });

    // Test if page can scroll
    const scrollHeight = await page.evaluate(() => {
      return document.documentElement.scrollHeight;
    });

    const clientHeight = await page.evaluate(() => {
      return document.documentElement.clientHeight;
    });

    const canScroll = scrollHeight > clientHeight;
    console.log(`ScrollHeight: ${scrollHeight}, ClientHeight: ${clientHeight}`);
    console.log(`Can scroll: ${canScroll}`);

    if (canScroll) {
      console.log('✓ Scroll is enabled - page height exceeds viewport');
      return true;
    } else {
      console.log('✗ Cannot scroll - page height equals or is less than viewport');
      return false;
    }
  } catch (error) {
    console.error('Test failed:', error.message);
    return false;
  } finally {
    if (browser) await browser.close();
  }
}

testScroll().then(result => process.exit(result ? 0 : 1));
