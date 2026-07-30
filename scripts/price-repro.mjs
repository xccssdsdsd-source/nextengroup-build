import puppeteer from 'puppeteer'
const browser = await puppeteer.launch({ headless: 'new' })
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })
await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' })
await new Promise(r => setTimeout(r, 800))

const el = await page.$('.service-package-card')
await el.evaluate((e) => e.scrollIntoView({ block: 'center' }))
await new Promise(r => setTimeout(r, 300))

const cards = await page.$$('.service-package-card')
const boxes = []
for (const c of cards) boxes.push(await c.boundingBox())

// jitter mouse rapidly across all three cards to stress the hover tilt/anime.js path
for (let i = 0; i < 40; i++) {
  const b = boxes[i % boxes.length]
  const x = b.x + b.width * (0.2 + 0.6 * Math.random())
  const y = b.y + b.height * (0.2 + 0.6 * Math.random())
  await page.mouse.move(x, y)
  await new Promise(r => setTimeout(r, 15))
}
await page.screenshot({ path: 'temporary screenshots/price-repro.png' })
await browser.close()
