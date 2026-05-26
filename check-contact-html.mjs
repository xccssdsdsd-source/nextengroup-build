import puppeteer from 'puppeteer'

const browser = await puppeteer.launch()
const page = await browser.newPage()
await page.setViewport({ width: 1920, height: 1080 })
await page.goto('http://localhost:3000', { waitUntil: 'load' })
await new Promise(r => setTimeout(r, 2000))

const content = await page.$eval('#kontakt', el => el.outerHTML)
console.log('Contact section HTML length:', content.length)
console.log('First 500 chars:', content.substring(0, 500))

await browser.close()
