import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'

puppeteer.use(StealthPlugin())

try {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    args: ['--no-sandbox'],
  })

  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 720 })
  await page.goto('http://localhost:3003', { waitUntil: 'networkidle2', timeout: 30000 })
  
  // Wait for portfolio section
  await page.waitForSelector('#portfolio', { timeout: 5000 })
  
  // Scroll to portfolio
  await page.evaluate(() => {
    document.querySelector('#portfolio')?.scrollIntoView()
  })
  
  await page.waitForTimeout(800)
  await page.screenshot({ path: './temporary screenshots/portfolio-section.png' })
  
  console.log('✓ Portfolio section screenshot saved')
  await browser.close()
} catch (e) {
  console.error('Screenshot error:', e.message)
}
