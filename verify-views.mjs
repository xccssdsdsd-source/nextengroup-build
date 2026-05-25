import puppeteer from 'puppeteer'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

const browser = await puppeteer.launch({
  headless: true,
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  args: ['--no-sandbox']
})

const screenshotDir = join(__dirname, 'temporary screenshots')

// Mobile view
const mobilePage = await browser.newPage()
await mobilePage.setViewport({ width: 375, height: 812 })
await mobilePage.goto('http://localhost:3002', { waitUntil: 'networkidle0' })
await mobilePage.evaluate(() => new Promise(r => setTimeout(r, 1000)))
const mobileClip = { x: 0, y: 0, width: 375, height: 600 }
await mobilePage.screenshot({ path: join(screenshotDir, 'verify-mobile.png'), clip: mobileClip })

// Desktop view
const desktopPage = await browser.newPage()
await desktopPage.setViewport({ width: 1440, height: 900 })
await desktopPage.goto('http://localhost:3002', { waitUntil: 'networkidle0' })
await desktopPage.evaluate(() => new Promise(r => setTimeout(r, 1000)))
await desktopPage.screenshot({ path: join(screenshotDir, 'verify-desktop.png') })

await browser.close()
console.log('Verification screenshots saved')
