import puppeteer from 'puppeteer'

const browser = await puppeteer.launch({ headless: true })
for (const mobile of [false, true]) {
  const page = await browser.newPage()
  await page.setViewport(mobile ? { width: 390, height: 844, deviceScaleFactor: 2 } : { width: 1440, height: 900 })
  await page.evaluateOnNewDocument(() => localStorage.setItem('getbuild_cookie_consent_v1', 'rejected'))
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 90000 })
  await new Promise(r => setTimeout(r, 1200))
  await page.screenshot({ path: `./temporary screenshots/hero-check${mobile ? '-m' : ''}.png` })
  await page.close()
}
await browser.close()
console.log('done')
