import puppeteer from 'puppeteer'
const url = process.argv[2] || 'http://localhost:3000'
const out = process.argv[3] || 'repro'
const browser = await puppeteer.launch({ headless: 'new', args: ['--force-device-scale-factor=1'] })
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })
await page.evaluateOnNewDocument(() => localStorage.setItem('getbuild_cookie_consent_v1', 'rejected'))
await page.goto(url, { waitUntil: 'networkidle0', timeout: 90000 })
await page.mouse.move(700, 400)
for (let i = 0; i < 40; i++) {
  await page.mouse.wheel({ deltaY: 120 })
  await new Promise(r => setTimeout(r, 40))
}
await new Promise(r => setTimeout(r, 2500))
await page.screenshot({ path: `./temporary screenshots/${out}-a.png` })
for (let i = 0; i < 20; i++) {
  await page.mouse.wheel({ deltaY: 120 })
  await new Promise(r => setTimeout(r, 40))
}
await new Promise(r => setTimeout(r, 2500))
await page.screenshot({ path: `./temporary screenshots/${out}-b.png` })
const dupes = await page.evaluate(() => {
  const seen = {}
  document.querySelectorAll('h1,h2,h3,.package-price').forEach(el => {
    const t = el.textContent.trim().slice(0, 40)
    seen[t] = (seen[t] || 0) + 1
  })
  return Object.entries(seen).filter(([, n]) => n > 1)
})
console.log(JSON.stringify(dupes))
await browser.close()
