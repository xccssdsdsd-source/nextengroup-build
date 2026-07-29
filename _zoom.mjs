import puppeteer from 'puppeteer'
const url = 'http://localhost:3000'
const sel = process.argv[2]
const out = process.argv[3] || 'zoom'
const browser = await puppeteer.launch({ headless: 'new' })
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 })
await page.evaluateOnNewDocument(() => localStorage.setItem('getbuild_cookie_consent_v1', 'rejected'))
await page.goto(url, { waitUntil: 'networkidle0', timeout: 90000 })
await page.evaluate(async () => {
  await new Promise(r => {
    let y = 0
    const step = () => { y += 600; window.scrollTo(0, y); if (y < document.body.scrollHeight) setTimeout(step, 60); else r() }
    step()
  })
})
await new Promise(r => setTimeout(r, 2000))
const el = await page.$(sel)
await el.evaluate(e => e.scrollIntoView({ block: 'center', behavior: 'instant' }))
await new Promise(r => setTimeout(r, 1200))
await el.screenshot({ path: `./temporary screenshots/${out}.png` })
await browser.close()
