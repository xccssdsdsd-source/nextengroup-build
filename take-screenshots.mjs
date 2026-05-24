import puppeteer from 'puppeteer'
import { mkdirSync } from 'fs'
import { join } from 'path'

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})

try {
  mkdirSync('temporary screenshots', { recursive: true })

  const page = await browser.newPage()

  // Desktop screenshot
  console.log('Taking desktop screenshot...')
  await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 })
  await page.goto('http://localhost:3004', { waitUntil: 'networkidle0', timeout: 30000 })
  await new Promise(r => setTimeout(r, 1000))
  await page.screenshot({ path: 'temporary screenshots/desktop.png', fullPage: false })
  console.log('✓ Desktop screenshot saved')

  // Mobile screenshot
  console.log('Taking mobile screenshot (375px)...')
  await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 1 })
  await page.goto('http://localhost:3004', { waitUntil: 'networkidle0', timeout: 30000 })
  await new Promise(r => setTimeout(r, 1000))
  await page.screenshot({ path: 'temporary screenshots/mobile.png', fullPage: false })
  console.log('✓ Mobile screenshot saved')

  await page.close()
} finally {
  await browser.close()
}
