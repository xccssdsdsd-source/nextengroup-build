import puppeteer from 'puppeteer'
import fs from 'fs'
import path from 'path'

const url = process.argv[2] || 'http://localhost:3000'
const tag = process.argv[3] || 'baseline'
const mobile = process.argv.includes('--mobile')

const dir = './temporary screenshots'
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

const browser = await puppeteer.launch({ headless: true })
const page = await browser.newPage()
await page.setViewport(mobile ? { width: 390, height: 844, deviceScaleFactor: 2 } : { width: 1440, height: 900 })
await page.evaluateOnNewDocument(() => {
  localStorage.setItem('getbuild_cookie_consent_v1', 'rejected')
})
await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 90000 })
await new Promise(r => setTimeout(r, 4000))

await page.evaluate(async () => {
  document.querySelectorAll('img').forEach(img => { img.loading = 'eager' })
  await new Promise(r => {
    let y = 0
    const step = () => {
      y += 700
      window.scrollTo(0, y)
      if (y < document.body.scrollHeight) setTimeout(step, 120)
      else r()
    }
    step()
  })
  await Promise.all([...document.querySelectorAll('img')].map(i => i.decode().catch(() => {})))
  window.scrollTo(0, 0)
})
await new Promise(r => setTimeout(r, 1500))

const sections = ['hero', 'uslugi', 'automatyzacje', 'proces', 'portfolio', 'opinie', 'faq', 'kontakt']
const suffix = mobile ? '-m' : ''

for (const id of sections) {
  const found = await page.evaluate(sel => {
    const el = document.querySelector(sel)
    if (!el) return false
    el.scrollIntoView({ block: 'start', behavior: 'instant' })
    return true
  }, `#${id}`)
  if (!found) continue
  await new Promise(r => setTimeout(r, 1000))
  await page.screenshot({ path: path.join(dir, `${tag}-${id}${suffix}.png`) })
}

await page.evaluate(() => window.scrollTo(0, 0))
await new Promise(r => setTimeout(r, 800))
await page.screenshot({ path: path.join(dir, `${tag}-full${suffix}.png`), fullPage: true })
console.log('done')
await browser.close()
