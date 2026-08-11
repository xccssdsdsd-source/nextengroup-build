import puppeteer from 'puppeteer'
import path from 'path'
import fs from 'fs'

const url = process.argv[2] || 'http://localhost:3000'
const tag = process.argv[3] || 'audit'
const mobile = process.argv.includes('--mobile')
const dir = './temporary screenshots'
fs.mkdirSync(dir, { recursive: true })

const browser = await puppeteer.launch({ headless: true, args: ['--force-device-scale-factor=1'] })
const page = await browser.newPage()
await page.setViewport(mobile ? { width: 390, height: 844, deviceScaleFactor: 2 } : { width: 1440, height: 900, deviceScaleFactor: 1 })
await page.evaluateOnNewDocument(() => {
  localStorage.setItem('getbuild_cookie_consent_v1', 'rejected')
  // The page sets `scroll-behavior: smooth` globally, so every scrollTo below
  // would animate and every measurement would land mid-flight.
  const s = document.createElement('style')
  s.textContent = 'html{scroll-behavior:auto !important}'
  document.addEventListener('DOMContentLoaded', () => document.head.appendChild(s))
})

const errors = []
page.on('pageerror', e => errors.push('PAGEERROR ' + e.message.slice(0, 200)))
page.on('console', m => { if (m.type() === 'error') errors.push('CONSOLE ' + m.text().slice(0, 200)) })
page.on('requestfailed', r => errors.push('REQFAIL ' + r.url().slice(0, 160)))

await page.goto(url, { waitUntil: 'networkidle0', timeout: 120000 })
await new Promise(r => setTimeout(r, 1500))

const suffix = mobile ? '-m' : ''
const shot = async name => page.screenshot({ path: path.join(dir, `${tag}-${name}${suffix}.png`) })

const heroH = await page.evaluate(() => document.querySelector('#hero')?.offsetHeight || 0)
const vh = await page.evaluate(() => window.innerHeight)
const range = Math.max(heroH - vh, 1)
for (const p of [0, 0.2, 0.45, 0.75, 1]) {
  await page.evaluate(y => window.scrollTo(0, y), Math.round(range * p))
  await new Promise(r => setTimeout(r, 700))
  await shot(`hero-${String(Math.round(p * 100)).padStart(3, '0')}`)
}

await page.evaluate(async () => {
  document.querySelectorAll('img').forEach(i => { i.loading = 'eager' })
  await new Promise(r => {
    let y = 0
    const step = () => {
      y += 500
      window.scrollTo(0, y)
      if (y < document.body.scrollHeight) setTimeout(step, 80)
      else r()
    }
    step()
  })
  await Promise.all([...document.querySelectorAll('img')].map(i => i.decode().catch(() => {})))
})
await new Promise(r => setTimeout(r, 1200))

const ids = await page.evaluate(() => [...document.querySelectorAll('section[id]')].map(s => s.id))
console.log('section ids:', ids.join(', '))
for (const id of ids) {
  if (id === 'hero') continue
  await page.evaluate(s => document.querySelector(s)?.scrollIntoView({ block: 'start', behavior: 'instant' }), `#${id}`)
  await new Promise(r => setTimeout(r, 600))
  await shot(id)
}

const h = await page.evaluate(() => document.body.scrollHeight)
console.log('page height:', h)
console.log('errors:', errors.length ? [...new Set(errors)].slice(0, 12) : 'none')
await browser.close()
