import puppeteer from 'puppeteer'

const browser = await puppeteer.launch({ headless: true })
const page = await browser.newPage()
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 })
await page.evaluateOnNewDocument(() => localStorage.setItem('getbuild_cookie_consent_v1', 'rejected'))
await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 90000 })

await page.evaluate(async () => {
  let y = 0
  while (y < document.body.scrollHeight) {
    y += 600
    window.scrollTo(0, y)
    await new Promise(r => setTimeout(r, 60))
  }
})
await new Promise(r => setTimeout(r, 600))

await page.evaluate(() => document.querySelector('#przewagi')?.scrollIntoView({ block: 'start' }))
await new Promise(r => setTimeout(r, 700))
const section = await page.$('#przewagi')
await section.screenshot({ path: './temporary screenshots/compare-section-mobile.png' })
await browser.close()
console.log('done')
