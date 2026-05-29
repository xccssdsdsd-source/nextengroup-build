import puppeteer from 'puppeteer'
import fs from 'fs'

const browser = await puppeteer.launch()
const page = await browser.newPage()
await page.setViewport({ width: 1280, height: 800 })
await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 30000 })
await new Promise(resolve => setTimeout(resolve, 2000))
await page.screenshot({ path: 'screenshots/desktop-nav.png' })
console.log('Desktop screenshot taken')
await browser.close()
