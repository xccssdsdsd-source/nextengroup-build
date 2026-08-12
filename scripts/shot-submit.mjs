import puppeteer from 'puppeteer'
import path from 'path'
import fs from 'fs'

const url = process.argv[2] || 'http://localhost:3000'
const tag = process.argv[3] || 'submit'
const dir = './temporary screenshots'
fs.mkdirSync(dir, { recursive: true })

const browser = await puppeteer.launch({ headless: true, args: ['--force-device-scale-factor=1'] })
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 })
await page.evaluateOnNewDocument(() => {
  localStorage.setItem('getbuild_cookie_consent_v1', 'rejected')
  const s = document.createElement('style')
  s.textContent = 'html{scroll-behavior:auto !important}'
  document.addEventListener('DOMContentLoaded', () => document.head.appendChild(s))
})

await page.setRequestInterception(true)
page.on('request', (r) => {
  if (r.url().includes('/api/inquiry')) {
    setTimeout(() => r.respond({ status: 200, contentType: 'application/json', body: '{"ok":true}' }), 1400)
    return
  }
  r.continue()
})

const errors = []
page.on('pageerror', (e) => errors.push('PAGEERROR ' + e.message.slice(0, 200)))
page.on('console', (m) => { if (m.type() === 'error') errors.push('CONSOLE ' + m.text().slice(0, 200)) })

await page.goto(url, { waitUntil: 'networkidle0', timeout: 120000 })
await page.evaluate(async () => {
  await new Promise((r) => {
    let y = 0
    const step = () => {
      y += 600
      window.scrollTo(0, y)
      if (y < document.body.scrollHeight) setTimeout(step, 90)
      else r()
    }
    step()
  })
})
await new Promise((r) => setTimeout(r, 800))
await page.evaluate(() => document.querySelector('#kontakt')?.scrollIntoView({ block: 'center' }))
await new Promise((r) => setTimeout(r, 2200))

const btnBox = async () => {
  const r = await page.evaluate(() => {
    const el = document.querySelector('.sbtn') || document.querySelector('.contact__done')
    const b = el.getBoundingClientRect()
    // screenshot({clip}) is in document space, getBoundingClientRect is not.
    return { x: b.left + scrollX - 24, y: b.top + scrollY - 24, width: b.width + 48, height: b.height + 48 }
  })
  return r
}
const shot = async (name, clip) =>
  page.screenshot({ path: path.join(dir, `${tag}-${name}.png`), clip: clip || (await btnBox()) })

await shot('01-idle')

await page.type('#k-name', 'Anna')
await page.type('#k-email', 'anna@biuro.pl')
await page.click('.contact__consent input')

// One clip for the whole run: the button must not move between frames, and
// re-measuring after the panel swap would silently reframe the comparison.
const clip = await btnBox()

await page.click('.sbtn')
const start = Date.now()
for (const ms of [90, 240, 700, 1500, 2100, 2350, 2700, 3200, 3800]) {
  const wait = ms - (Date.now() - start)
  if (wait > 0) await new Promise((r) => setTimeout(r, wait))
  await shot(`03-t${String(ms).padStart(4, '0')}`, clip)
}
await new Promise((r) => setTimeout(r, 1200))
const done = await page.$('.contact__form-wrap')
await done.screenshot({ path: path.join(dir, `${tag}-04-panel.png`) })

console.log('errors:', errors.length ? errors.join('\n') : 'none')
await browser.close()
