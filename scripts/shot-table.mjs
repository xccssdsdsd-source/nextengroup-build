import puppeteer from 'puppeteer'

const browser = await puppeteer.launch({ headless: true })
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })
await page.evaluateOnNewDocument(() => localStorage.setItem('getbuild_cookie_consent_v1', 'rejected'))
await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 90000 })

// Warm up every lazy (content-visibility) section first, same as shot-all.mjs,
// otherwise #przewagi is still a collapsed placeholder and scrollIntoView /
// getBoundingClientRect land on whatever real content happens to sit there.
await page.evaluate(async () => {
  let y = 0
  while (y < document.body.scrollHeight) {
    y += 600
    window.scrollTo(0, y)
    await new Promise(r => setTimeout(r, 90))
  }
})
await new Promise(r => setTimeout(r, 800))

await page.evaluate(() => document.querySelector('#przewagi')?.scrollIntoView({ block: 'start' }))
await new Promise(r => setTimeout(r, 900))
const el = await page.$('#przewagi .compare-wrap')
await el.screenshot({ path: './temporary screenshots/compare-table-full.png' })
const section = await page.$('#przewagi')
await section.screenshot({ path: './temporary screenshots/compare-section-full.png' })
await browser.close()
console.log('done')
