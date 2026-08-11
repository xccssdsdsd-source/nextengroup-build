import puppeteer from 'puppeteer'
import path from 'path'

const url = process.argv[2] || 'http://localhost:3000'
const tag = process.argv[3] || 'v2'
const mobile = process.argv.includes('--mobile')
const dir = './temporary screenshots'

const browser = await puppeteer.launch({ headless: true })
const page = await browser.newPage()
await page.setViewport(mobile ? { width: 390, height: 844, deviceScaleFactor: 2 } : { width: 1440, height: 900 })
await page.evaluateOnNewDocument(() => localStorage.setItem('getbuild_cookie_consent_v1', 'rejected'))

const errors = []
page.on('pageerror', e => errors.push(e.message.slice(0, 160)))
page.on('console', m => { if (m.type() === 'error') errors.push(m.text().slice(0, 160)) })

await page.goto(url, { waitUntil: 'networkidle0', timeout: 90000 })
await page.evaluate(async () => {
  document.querySelectorAll('img').forEach(i => { i.loading = 'eager' })
  await new Promise(r => {
    let y = 0
    const step = () => {
      y += 600
      window.scrollTo(0, y)
      if (y < document.body.scrollHeight) setTimeout(step, 90)
      else r()
    }
    step()
  })
  await Promise.all([...document.querySelectorAll('img')].map(i => i.decode().catch(() => {})))
})
await new Promise(r => setTimeout(r, 1200))

const suffix = mobile ? '-m' : ''
const ids = ['problem', 'uslugi', 'proces', 'agent-ai', 'przewagi', 'portfolio', 'opinie', 'pakiety', 'faq', 'kontakt']
for (const id of ids) {
  const ok = await page.evaluate(s => {
    const el = document.querySelector(s)
    if (!el) return false
    el.scrollIntoView({ block: 'start', behavior: 'instant' })
    return true
  }, `#${id}`)
  if (!ok) { console.log('MISSING #' + id); continue }
  await new Promise(r => setTimeout(r, 550))
  await page.screenshot({ path: path.join(dir, `${tag}-${id}${suffix}.png`) })
}

const h = await page.evaluate(() => document.body.scrollHeight)
console.log('page height:', h, '| errors:', errors.length ? errors.slice(0, 5) : 'none')
await browser.close()
