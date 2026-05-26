import puppeteer from 'puppeteer'

const browser = await puppeteer.launch()
const page = await browser.newPage()
await page.setViewport({ width: 1920, height: 1080 })
await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' })

const contactSection = await page.$('#kontakt')
if (contactSection) {
  const box = await contactSection.boundingBox()
  await page.screenshot({
    path: 'screenshots/contact-section.png',
    clip: { x: 0, y: box.y - 50, width: 1920, height: box.height + 100 }
  })
  console.log('Contact screenshot saved')
}

await browser.close()
