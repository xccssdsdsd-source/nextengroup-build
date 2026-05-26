import puppeteer from 'puppeteer'

const browser = await puppeteer.launch()
const page = await browser.newPage()
await page.setViewport({ width: 1920, height: 1080 })
await page.goto('http://localhost:3000', { waitUntil: 'load' })
await new Promise(r => setTimeout(r, 2000))

const kontakt = await page.$('#kontakt')
if (kontakt) {
  const box = await kontakt.boundingBox()
  const viewport = await page.viewport()
  const height = Math.min(box.height + 100, 1200)
  
  await page.screenshot({
    path: 'screenshots/contact-new.png',
    clip: { x: 0, y: box.y - 50, width: 1920, height }
  })
  console.log('Contact section screenshot saved at y:', box.y)
} else {
  console.log('Contact section not found')
}

await browser.close()
