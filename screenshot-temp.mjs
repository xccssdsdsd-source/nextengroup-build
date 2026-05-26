import puppeteer from 'puppeteer'

const browser = await puppeteer.launch({ headless: 'new' })
const page = await browser.newPage()
await page.goto('http://localhost:3002', { waitUntil: 'load', timeout: 60000 })
await page.setViewport({ width: 1200, height: 800 })
await new Promise(r => setTimeout(r, 3000))
await page.screenshot({ path: 'temporary screenshots/home-correct-port.png' })
console.log('✓ Screenshot saved: temporary screenshots/home-correct-port.png')
await browser.close()
