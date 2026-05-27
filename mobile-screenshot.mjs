import puppeteer from 'puppeteer'
import fs from 'fs'

const browser = await puppeteer.launch()
const page = await browser.newPage()
await page.setViewport({ width: 375, height: 667 })
await page.goto('http://localhost:3009', { waitUntil: 'networkidle2' })

const heroBox = await page.$eval('section', el => {
  const box = el.getBoundingClientRect()
  return { height: box.height, top: box.top }
})
console.log('Mobile hero:', heroBox)

await fs.promises.mkdir('screenshots', { recursive: true })
await page.screenshot({ path: 'screenshots/mobile-viewport.png', fullPage: false })
await page.screenshot({ path: 'screenshots/mobile-full.png', fullPage: true })
console.log('Mobile screenshots saved')
await browser.close()
