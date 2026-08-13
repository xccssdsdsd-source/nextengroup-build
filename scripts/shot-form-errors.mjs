import puppeteer from 'puppeteer'

const url = process.argv[2] || 'http://localhost:3000/strony-www'
const tag = process.argv[3] || 'form-errors'

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
    await new Promise(r => setTimeout(r, 50))
  }
})
await page.evaluate(() => document.querySelector('#kontakt')?.scrollIntoView({ block: 'center' }))
await new Promise(r => setTimeout(r, 900))

const errors = await page.evaluate(async () => {
  const form = document.querySelector('#kontakt form')
  form?.querySelector('button[type="submit"]')?.click()
  await new Promise(r => setTimeout(r, 400))
  return [...document.querySelectorAll('#kontakt .field-error')].map(e => e.textContent)
})
console.log('errors:', JSON.stringify(errors, null, 1))

await page.evaluate(() => document.querySelector('#kontakt')?.scrollIntoView({ block: 'start' }))
await new Promise(r => setTimeout(r, 400))
const el = await page.$('#kontakt')
await el.screenshot({ path: `./temporary screenshots/${tag}.png` })
await browser.close()
