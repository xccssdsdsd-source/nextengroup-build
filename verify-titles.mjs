import puppeteer from 'puppeteer'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const browser = await puppeteer.launch({
  headless: true,
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  args: ['--no-sandbox']
})

const screenshotDir = join(__dirname, 'temporary screenshots')

// Mobile title
const mobilePage = await browser.newPage()
await mobilePage.setViewport({ width: 375, height: 812 })
await mobilePage.goto('http://localhost:3002', { waitUntil: 'networkidle0' })
await mobilePage.evaluate(() => new Promise(r => setTimeout(r, 800)))
const mobileClip = { x: 0, y: 50, width: 375, height: 280 }
await mobilePage.screenshot({ path: join(screenshotDir, 'verify-mobile-title.png'), clip: mobileClip })

// Desktop title
const desktopPage = await browser.newPage()
await desktopPage.setViewport({ width: 1440, height: 900 })
await desktopPage.goto('http://localhost:3002', { waitUntil: 'networkidle0' })
await desktopPage.evaluate(() => new Promise(r => setTimeout(r, 800)))
const desktopClip = { x: 200, y: 20, width: 1040, height: 250 }
await desktopPage.screenshot({ path: join(screenshotDir, 'verify-desktop-title.png'), clip: desktopClip })

await browser.close()
console.log('Title detail screenshots saved')
