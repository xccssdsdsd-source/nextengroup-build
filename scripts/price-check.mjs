import puppeteer from 'puppeteer'
const browser = await puppeteer.launch({ headless: 'new' })
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })
await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' })
await new Promise(r => setTimeout(r, 1000))

const el = await page.$('.service-package-card')
if (el) {
  await el.evaluate((e) => e.scrollIntoView({ block: 'center' }))
}
await new Promise(r => setTimeout(r, 2500))
await page.screenshot({ path: 'temporary screenshots/price-check.png' })
await browser.close()
