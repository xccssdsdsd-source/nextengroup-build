import puppeteer from 'puppeteer'

const browser = await puppeteer.launch()
const page = await browser.newPage()
await page.setViewport({ width: 1920, height: 1080 })
await page.goto('http://localhost:3000', { waitUntil: 'load' })
await new Promise(r => setTimeout(r, 2000))

const fullHeight = await page.evaluate(() => document.documentElement.scrollHeight)
console.log('Full page height:', fullHeight)

await page.screenshot({ path: 'screenshots/full-1920.png', fullPage: true })
console.log('Full page screenshot saved')

await browser.close()
