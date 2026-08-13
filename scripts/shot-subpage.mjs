import puppeteer from 'puppeteer'

const url = process.argv[2]
const tag = process.argv[3] || 'subpage'

const browser = await puppeteer.launch({ headless: true })
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })
await page.evaluateOnNewDocument(() => localStorage.setItem('getbuild_cookie_consent_v1', 'rejected'))
await page.goto(url, { waitUntil: 'networkidle0', timeout: 90000 })
await page.evaluate(async () => {
  let y = 0
  while (y < document.body.scrollHeight) {
    y += 600
    window.scrollTo(0, y)
    await new Promise(r => setTimeout(r, 60))
  }
})
await new Promise(r => setTimeout(r, 900))
await page.evaluate(() => document.querySelector('#kontakt')?.scrollIntoView({ block: 'start' }))
await new Promise(r => setTimeout(r, 900))
const el = await page.$('#kontakt')
if (el) await el.screenshot({ path: `./temporary screenshots/${tag}.png` })
else await page.screenshot({ path: `./temporary screenshots/${tag}.png`, fullPage: false })
await browser.close()
console.log('done')
