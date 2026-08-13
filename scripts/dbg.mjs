import puppeteer from 'puppeteer'
const browser = await puppeteer.launch({ headless: true })
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })
await page.evaluateOnNewDocument(() => localStorage.setItem('getbuild_cookie_consent_v1', 'rejected'))
page.on('console', m => { if (m.type() === 'error') console.log('CONSOLE', m.text().slice(0,200)) })
await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 90000 })
await page.evaluate(async () => {
  document.documentElement.style.scrollBehavior = 'auto'
  let y = 0
  while (y < document.body.scrollHeight) { y += 500; window.scrollTo(0, y); await new Promise(r => setTimeout(r, 90)) }
})
await new Promise(r => setTimeout(r, 1000))
console.log(await page.evaluate(() => [...document.querySelectorAll('section')].map(s => s.id || s.className).join('\n')))
await browser.close()
