import puppeteer from 'puppeteer'
import fs from 'fs'

const browser = await puppeteer.launch()
const page = await browser.newPage()
await page.setViewport({ width: 1920, height: 1080 })
await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' })
await fs.promises.mkdir('screenshots', { recursive: true })
const screenshots = await page.screenshot({ path: 'screenshots/viewport.png', fullPage: false })
console.log('Viewport screenshot taken')
await browser.close()
