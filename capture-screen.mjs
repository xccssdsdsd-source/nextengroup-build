import puppeteer from 'puppeteer'
import fs from 'fs'
import path from 'path'

const screenshotDir = './temp-screenshots'
if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir, { recursive: true })
}

const pages = [
  { url: 'http://localhost:3000', name: 'homepage' },
  { url: 'http://localhost:3000#uslugi', name: 'services' },
  { url: 'http://localhost:3000#automatyzacje', name: 'automation' },
  { url: 'http://localhost:3000#kontakt', name: 'contact' },
]

async function captureScreenshots() {
  const browser = await puppeteer.launch()

  try {
    for (const page of pages) {
      const browserPage = await browser.newPage()
      await browserPage.goto(page.url, { waitUntil: 'networkidle2' })
      await browserPage.setViewport({ width: 1920, height: 1080 })

      const filePath = path.join(screenshotDir, `${page.name}.png`)
      await browserPage.screenshot({ path: filePath })
      console.log(`✅ Screenshot saved: ${filePath}`)

      await browserPage.close()
    }
  } finally {
    await browser.close()
  }
}

captureScreenshots().catch(console.error)
