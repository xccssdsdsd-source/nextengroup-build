import puppeteer from 'puppeteer'

const browser = await puppeteer.launch()
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })

await page.goto('http://localhost:3004/polityka-prywatnosci', { waitUntil: 'networkidle2' })

// Scroll down to see more content
await page.evaluate(() => {
  window.scrollBy(0, window.innerHeight)
})

await new Promise(resolve => setTimeout(resolve, 500))

await page.screenshot({
  path: 'temporary screenshots/privacy-policy-scroll.png',
  fullPage: false
})

console.log('Scrolled privacy policy screenshot taken')
await browser.close()
