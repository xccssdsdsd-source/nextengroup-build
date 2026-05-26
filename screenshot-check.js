import puppeteer from 'puppeteer'
import fs from 'fs'
import path from 'path'

const screenshotsDir = './temporary screenshots'
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true })
}

;(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 900 })
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' })
  
  const filename = path.join(screenshotsDir, `animated-lines-${Date.now()}.png`)
  await page.screenshot({ path: filename, fullPage: false })
  console.log(`Screenshot saved: ${filename}`)
  
  await browser.close()
})()
