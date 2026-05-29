import puppeteer from 'puppeteer-core'
import fs from 'fs'
import path from 'path'

const downloadPath = path.resolve('./temp-verify')
fs.mkdirSync(downloadPath, { recursive: true })

const browser = await puppeteer.connect({
  browserWSEndpoint: 'ws://127.0.0.1:3222'
}).catch(() => null)

if (!browser) {
  console.log('Browser not available, skipping verification')
  process.exit(0)
}

const page = await browser.newPage()
await page.setViewport({ width: 1280, height: 800 })
await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' })
await new Promise(r => setTimeout(r, 1500))

const buttonExists = await page.evaluate(() => {
  const btn = document.querySelector('button:has(svg[size="14"])')
  return btn ? btn.textContent.trim() : null
})

console.log('Button text:', buttonExists)

await page.click('button:has(svg[size="14"])').catch(() => console.log('Could not click button'))
await new Promise(r => setTimeout(r, 300))

const dropdownVisible = await page.evaluate(() => {
  const options = document.querySelectorAll('a[href*="kontakt"]')
  return options.length > 1
})

console.log('Dropdown shows multiple options:', dropdownVisible)
await browser.close()
