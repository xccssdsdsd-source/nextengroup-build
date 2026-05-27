import puppeteer from 'puppeteer'

const devices = {
  mobile: { width: 375, height: 667, deviceScaleFactor: 2 },
  tablet: { width: 768, height: 1024, deviceScaleFactor: 2 },
  desktop: { width: 1440, height: 900, deviceScaleFactor: 1 },
}

async function captureHero() {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  for (const [name, viewport] of Object.entries(devices)) {
    await page.setViewport(viewport)
    await page.goto('http://localhost:3010', { waitUntil: 'networkidle2' })

    const heroElement = await page.$('section:first-of-type')
    if (heroElement) {
      const boundingBox = await heroElement.boundingBox()
      if (boundingBox) {
        await page.screenshot({
          path: `hero-${name}.png`,
          clip: {
            x: 0,
            y: 0,
            width: viewport.width,
            height: Math.min(boundingBox.height + boundingBox.y, viewport.height),
          },
        })
        console.log(`Hero screenshot captured for ${name}`)
      }
    }
  }

  await browser.close()
}

captureHero().catch(console.error)
