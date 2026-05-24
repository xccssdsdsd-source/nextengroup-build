import puppeteer from 'puppeteer'

const browser = await puppeteer.launch()
const page = await browser.newPage()
await page.setViewport({ width: 1280, height: 800 })
await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' })

await page.evaluate(() => {
  const section = document.querySelector('#portfolio')
  if (section) section.scrollIntoView({ behavior: 'instant', block: 'start' })
})

await page.waitForTimeout(500)
await page.screenshot({ path: './temporary screenshots/carousel-view.png', fullPage: false })
await browser.close()
