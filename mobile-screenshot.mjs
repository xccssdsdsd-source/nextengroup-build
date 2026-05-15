import puppeteer from 'puppeteer'

const browser = await puppeteer.launch({ headless: true })
const page = await browser.newPage()
await page.setViewport({ width: 375, height: 667, deviceScaleFactor: 2 })
await page.goto('http://localhost:3009', { waitUntil: 'networkidle2', timeout: 30000 })
await page.screenshot({ path: './temporary screenshots/mobile-screenshot.png', fullPage: true })
await browser.close()
console.log('Mobile screenshot saved')
