import puppeteer from 'puppeteer'

const browser = await puppeteer.launch()
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })

await page.goto('http://localhost:3004', { waitUntil: 'domcontentloaded' })

// Wait for page to settle
await new Promise(resolve => setTimeout(resolve, 1000))

// Scroll to absolute bottom
await page.evaluate(() => {
  window.scrollTo(0, document.body.scrollHeight)
})

await new Promise(resolve => setTimeout(resolve, 500))

await page.screenshot({ 
  path: 'temporary screenshots/bottom-scroll.png',
  fullPage: false
})

console.log('Screenshot saved - bottom of page')
await browser.close()
