import puppeteer from 'puppeteer'

const browser = await puppeteer.launch()
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })

// Disable JavaScript to prevent Calendly widget loading
//await page.setJavaScriptEnabled(false)

await page.goto('http://localhost:3004', { waitUntil: 'domcontentloaded' })

// Wait for page to settle
await new Promise(resolve => setTimeout(resolve, 1000))

// Scroll down past FAQ
await page.evaluate(() => {
  window.scrollBy(0, window.innerHeight * 5)
})

await new Promise(resolve => setTimeout(resolve, 500))

await page.screenshot({ 
  path: 'temporary screenshots/scroll-test.png',
  fullPage: false
})

console.log('Screenshot saved')
await browser.close()
