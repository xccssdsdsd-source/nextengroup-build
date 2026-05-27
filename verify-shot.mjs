import puppeteer from 'puppeteer'
import fs from 'fs'

const browser = await puppeteer.launch()

const page = await browser.newPage()
await page.setViewport({ width: 1920, height: 1080 })
await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' })

const htmlContent = await page.content()
if (htmlContent.includes('Budujemy')) {
  console.log('Content found in HTML')
} else {
  console.log('Content NOT in HTML')
}

await page.screenshot({ path: 'screenshots/verify.png', fullPage: false })
await page.screenshot({ path: 'screenshots/verify-full.png', fullPage: true })
console.log('Screenshots saved')
await browser.close()
