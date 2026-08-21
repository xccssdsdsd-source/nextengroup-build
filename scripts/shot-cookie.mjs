import puppeteer from 'puppeteer'
const browser = await puppeteer.launch({ headless: true })
for (const [w,h,tag] of [[390,844,'m'],[1440,900,'d']]) {
  const page = await browser.newPage()
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 2 })
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' })
  await new Promise(r => setTimeout(r, 1400))
  const el = await page.$('.cookie-consent')
  if (el) await el.screenshot({ path: `./temporary screenshots/cookie-${tag}.png` })
  else console.log('no banner', tag)
  await page.close()
}
console.log('done')
await browser.close()
