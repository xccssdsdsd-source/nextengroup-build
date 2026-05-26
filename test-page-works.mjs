import puppeteer from 'puppeteer'

const browser = await puppeteer.launch({ headless: 'new' })
const page = await browser.newPage()
await page.goto('http://localhost:3000', { waitUntil: 'load', timeout: 60000 })
await page.setViewport({ width: 1200, height: 800 })
await new Promise(r => setTimeout(r, 3000))
await page.screenshot({ path: 'temporary screenshots/home-full.png' })
console.log('✓ Homepage working')
await browser.close()
