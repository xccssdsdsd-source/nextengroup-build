import puppeteer from 'puppeteer'
import fs from 'fs'
import path from 'path'

const viewports = [
  { name: 'mobile', width: 375, height: 1200 },
  { name: 'tablet', width: 768, height: 1200 },
  { name: 'desktop', width: 1440, height: 900 },
]

async function captureHero() {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()

  console.log('Starting hero verification...')

  for (const viewport of viewports) {
    try {
      await page.setViewport({ width: viewport.width, height: viewport.height })
      await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 })

      // Wait for hero animations to complete
      await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1500)))

      const screenshotPath = path.join('.', `hero-${viewport.name}.png`)
      await page.screenshot({ path: screenshotPath, fullPage: false })
      console.log(`✅ ${viewport.name} screenshot saved: ${screenshotPath}`)
    } catch (err) {
      console.error(`❌ ${viewport.name} failed:`, err.message)
    }
  }

  await browser.close()
  console.log('Done.')
}

captureHero()
