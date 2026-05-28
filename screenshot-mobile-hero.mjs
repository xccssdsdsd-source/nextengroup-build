import puppeteer from 'puppeteer'

async function screenshot() {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  // Mobile 320px
  await page.setViewport({ width: 320, height: 667 })
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' })
  await page.screenshot({ path: './mobile-320-hero.png', fullPage: false })

  // Mobile 375px
  await page.setViewport({ width: 375, height: 667 })
  await page.screenshot({ path: './mobile-375-hero.png', fullPage: false })

  // Mobile 425px
  await page.setViewport({ width: 425, height: 667 })
  await page.screenshot({ path: './mobile-425-hero.png', fullPage: false })

  await browser.close()
  console.log('Screenshots taken')
}

screenshot()
