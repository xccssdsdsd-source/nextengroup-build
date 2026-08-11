import puppeteer from 'puppeteer'

const id = process.argv[2]
const tag = process.argv[3] || id
const mobile = process.argv.includes('--mobile')

const browser = await puppeteer.launch({ headless: true })
const page = await browser.newPage()
await page.setViewport(mobile ? { width: 390, height: 844, deviceScaleFactor: 2 } : { width: 1440, height: 900 })
await page.evaluateOnNewDocument(() => localStorage.setItem('getbuild_cookie_consent_v1', 'rejected'))
await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 90000 })

await page.evaluate(async () => {
  let y = 0
  while (y < document.body.scrollHeight) {
    y += 600
    window.scrollTo(0, y)
    await new Promise(r => setTimeout(r, 70))
  }
})
await new Promise(r => setTimeout(r, 700))

await page.evaluate((s) => document.querySelector(s)?.scrollIntoView({ block: 'start' }), `#${id}`)
await new Promise(r => setTimeout(r, 700))
const el = await page.$(`#${id}`)
await el.screenshot({ path: `./temporary screenshots/${tag}${mobile ? '-m' : ''}.png` })
await browser.close()
console.log('done')
