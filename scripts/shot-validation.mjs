import puppeteer from 'puppeteer'

const browser = await puppeteer.launch({ headless: true })
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })
await page.evaluateOnNewDocument(() => localStorage.setItem('getbuild_cookie_consent_v1', 'rejected'))
page.on('console', m => console.log('[page]', m.text()))
await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 90000 })
await page.evaluate(async () => {
  let y = 0
  while (y < document.body.scrollHeight) {
    y += 600
    window.scrollTo(0, y)
    await new Promise(r => setTimeout(r, 60))
  }
})
await page.evaluate(() => document.querySelector('#kontakt')?.scrollIntoView({ block: 'center' }))
await new Promise(r => setTimeout(r, 800))
const info = await page.evaluate(() => {
  const form = document.querySelector('.contact__form')
  const btn = form?.querySelector('button[type="submit"]')
  btn?.click()
  return { hasForm: !!form, hasBtn: !!btn, disabled: btn?.disabled }
})
console.log(JSON.stringify(info))
await new Promise(r => setTimeout(r, 600))
const errs = await page.evaluate(() =>
  [...document.querySelectorAll('#kontakt .field-error')].map(e => e.textContent),
)
console.log('errors:', JSON.stringify(errs))
await page.evaluate(() => document.querySelector('#kontakt')?.scrollIntoView({ block: 'start' }))
await new Promise(r => setTimeout(r, 400))
const el = await page.$('#kontakt')
await el.screenshot({ path: './temporary screenshots/kontakt-validation.png' })
await browser.close()
