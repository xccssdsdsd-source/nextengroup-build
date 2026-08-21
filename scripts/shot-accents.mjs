import puppeteer from 'puppeteer'
import fs from 'fs'
const url = process.argv[2] || 'http://localhost:3000'
const tag = process.argv[3] || 'acc'
const dir = './temporary screenshots'
fs.mkdirSync(dir, { recursive: true })
const browser = await puppeteer.launch({ headless: true })
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 3 })
await page.evaluateOnNewDocument(() => {
  localStorage.setItem('getbuild_cookie_consent_v1', 'rejected')
  const s = document.createElement('style')
  s.textContent = 'html{scroll-behavior:auto !important}'
  document.addEventListener('DOMContentLoaded', () => document.head.appendChild(s))
})
await page.goto(url, { waitUntil: 'networkidle0', timeout: 120000 })
await page.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 50)) }
})
await new Promise(r => setTimeout(r, 2000))
const ids = ['problem', 'faq', 'proces', 'pakiety', 'kontakt']
for (const id of ids) {
  const h = (await page.$(`#${id} .section-head`)) || (await page.$(`#${id} .section-title`))
  if (!h) { console.log('miss', id); continue }
  await page.evaluate((id) => (document.querySelector(`#${id} .section-head`) || document.querySelector(`#${id} .section-title`)).scrollIntoView({ block: 'center' }), id)
  await new Promise(r => setTimeout(r, 600))
  await h.screenshot({ path: `${dir}/${tag}-${id}.png` }).catch(e => console.log('err', id, e.message))
  console.log('ok', id)
}
await browser.close()
