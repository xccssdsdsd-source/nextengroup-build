import puppeteer from 'puppeteer'

const browser = await puppeteer.launch({headless: 'new'})
const page = await browser.newPage()
await page.setViewport({width: 1280, height: 1000})
await page.goto('http://localhost:3001', {waitUntil: 'networkidle0'})
const elem = await page.$('section[id="portfolio"]')
if (elem) {
  const box = await elem.boundingBox()
  await page.screenshot({
    path: 'temporary screenshots/portfolio-section.png',
    clip: {
      x: 0,
      y: Math.max(0, box.y - 80),
      width: 1280,
      height: 700
    }
  })
  console.log('Portfolio section screenshot taken')
} else {
  console.log('Portfolio element not found')
}
await browser.close()
