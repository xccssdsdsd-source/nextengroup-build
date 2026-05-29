import puppeteer from 'puppeteer'

const browser = await puppeteer.launch()
const page = await browser.newPage()
await page.setViewport({ width: 1200, height: 800 })
await page.goto('http://127.0.0.1:3000/#konsultacja', { waitUntil: 'domcontentloaded' })
await new Promise(resolve => setTimeout(resolve, 2000))
await page.screenshot({ path: 'screenshots/consultation-form.png' })
console.log('Screenshot saved')
await browser.close()
