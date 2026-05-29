import puppeteer from 'puppeteer'

const browser = await puppeteer.launch()
const page = await browser.newPage()
await page.setViewport({ width: 1200, height: 1600 })
await page.goto('http://127.0.0.1:3000', { waitUntil: 'domcontentloaded' })
await new Promise(resolve => setTimeout(resolve, 2000))

// Scroll to the middle of the page to see the form
await page.evaluate(() => {
  window.scrollBy(0, 2000)
})

await new Promise(resolve => setTimeout(resolve, 500))
await page.screenshot({ path: 'screenshots/form-visible.png' })
console.log('Form visible screenshot saved')
await browser.close()
