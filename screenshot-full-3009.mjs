import puppeteer from 'puppeteer'
import fs from 'fs'

const browser = await puppeteer.launch()
const page = await browser.newPage()
await page.setViewport({ width: 1920, height: 1080 })
await page.goto('http://localhost:3009', { waitUntil: 'networkidle2' })
await fs.promises.mkdir('screenshots', { recursive: true })
const screenshots = await page.screenshot({ path: 'screenshots/full-3009.png', fullPage: true })
console.log('Full page screenshot taken on 3009')
await browser.close()
