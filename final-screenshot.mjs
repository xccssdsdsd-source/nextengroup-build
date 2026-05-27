import puppeteer from 'puppeteer'
import fs from 'fs'

const browser = await puppeteer.launch()
const page = await browser.newPage()
await page.setViewport({ width: 1920, height: 1080 })

// Try port 3009 first (dev server with new code)
let url = 'http://localhost:3009'
try {
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 5000 })
} catch (e) {
  // Fallback to 3000
  url = 'http://localhost:3000'
  await page.goto(url, { waitUntil: 'networkidle2' })
}

console.log(`Using ${url}`)

const heroBox = await page.$eval('section', el => {
  const box = el.getBoundingClientRect()
  return { height: box.height }
})
console.log('Hero section height:', heroBox.height)

await fs.promises.mkdir('screenshots', { recursive: true })
await page.screenshot({ path: 'screenshots/final-viewport.png', fullPage: false })
await page.screenshot({ path: 'screenshots/final-full-page.png', fullPage: true })
console.log('Screenshots saved')
await browser.close()
