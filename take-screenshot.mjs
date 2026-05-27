import puppeteer from 'puppeteer'
import fs from 'fs'

const browser = await puppeteer.launch({ headless: true })
const page = await browser.newPage()
await page.setViewport({ width: 1920, height: 1080 })

await page.goto('http://localhost:3000', { waitUntil: 'load', timeout: 60000 })
await page.screenshot({ path: './screenshots/performance-after.png', fullPage: true })

console.log('Screenshot taken: ./screenshots/performance-after.png')
await browser.close()
