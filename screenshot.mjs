import puppeteer from 'puppeteer'
import fs from 'fs'

const browser = await puppeteer.launch()
const page = await browser.newPage()
await page.setViewport({ width: 375, height: 667 })
const url = process.argv[2] || 'http://localhost:3001'
await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 })
await new Promise(resolve => setTimeout(resolve, 2000))
await fs.promises.mkdir('screenshots', { recursive: true })
const screenshots = await page.screenshot({ path: 'screenshots/full-page.png', fullPage: true })
console.log('Screenshot taken:', 'screenshots/full-page.png')
await browser.close()
