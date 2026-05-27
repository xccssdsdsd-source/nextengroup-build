import puppeteer from 'puppeteer'

async function testSmallScreen() {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()

  await page.setViewport({ width: 320, height: 800 })
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' })

  // Check for horizontal overflow
  const hasOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth
  })

  if (hasOverflow) {
    console.log('⚠️ Horizontal overflow detected on 320px')
  } else {
    console.log('✅ No overflow on 320px')
  }

  await page.screenshot({ path: 'hero-320px.png' })
  await browser.close()
}

testSmallScreen()
