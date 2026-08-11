import puppeteer from 'puppeteer'
const slugs = ['audyt-seo-co-zawiera-ile-kosztuje','ile-kosztuje-strona-internetowa-dla-firmy-b2b','jak-wybrac-agencje-seo-dla-firmy-b2b','seo-dla-firm-b2b-czy-warto-investowac','strona-internetowa-dla-producenta-krok-po-kroku']
const browser = await puppeteer.launch({ headless: true })
for (const slug of slugs) {
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 900 })
  const errors = []
  page.on('pageerror', e => errors.push('PAGEERROR: ' + e.message.slice(0,150)))
  page.on('console', m => { if (m.type()==='error') errors.push('CONSOLE: ' + m.text().slice(0,150)) })
  page.on('response', r => { if (r.status()>=400) errors.push('HTTP '+r.status()+': '+r.url().slice(0,140)) })
  let status
  try {
    const resp = await page.goto('http://localhost:3000/blog/'+slug, { waitUntil: 'networkidle0', timeout: 60000 })
    status = resp.status()
  } catch(e) { status = 'ERR:'+e.message.slice(0,100) }
  await new Promise(r=>setTimeout(r,500))
  const overflow = await page.evaluate(() => ({sw: document.documentElement.scrollWidth, iw: window.innerWidth}))
  console.log(slug, status, overflow, errors.length?[...new Set(errors)]:'none')
  await page.close()
}
await browser.close()
