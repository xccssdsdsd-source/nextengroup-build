import puppeteer from 'puppeteer'

const label = process.argv[2] ?? 'chat'
const browser = await puppeteer.launch({ headless: true })

for (const [name, viewport] of [['', { width: 1440, height: 900 }], ['-m', { width: 390, height: 844, deviceScaleFactor: 2 }]]) {
  const page = await browser.newPage()
  await page.setViewport(viewport)
  await page.evaluateOnNewDocument(() => localStorage.setItem('getbuild_cookie_consent_v1', 'rejected'))
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 90000 })
  await page.addStyleTag({ content: 'html{scroll-behavior:auto !important}' })
  await new Promise(r => setTimeout(r, 1500))
  await page.evaluate(() => document.querySelector('[class*="story"]')?.scrollIntoView({ block: 'center' }))
  await new Promise(r => setTimeout(r, 1500))
  await page.evaluate(() => {
    const li = [...document.querySelectorAll('li')].find(n => n.textContent?.trim().startsWith('5Twoja kolej') || n.textContent?.trim().endsWith('Twoja kolej'))
    ;(li?.querySelector('button') ?? li)?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  })
  await new Promise(r => setTimeout(r, 2500))
  const el = await page.$('.hero-chat')
  if (!el) { console.log(name || 'desktop', 'NO CHAT'); await page.close(); continue }
  await page.evaluate(() => document.querySelector('.hero-chat').scrollIntoView({ block: 'center' }))
  await new Promise(r => setTimeout(r, 900))
  await el.screenshot({ path: `./temporary screenshots/${label}${name}.png` })
  await page.screenshot({ path: `./temporary screenshots/${label}${name}-page.png` })
  console.log(name || 'desktop', await page.evaluate(() => {
    const r = document.querySelector('.hero-chat').getBoundingClientRect()
    return [Math.round(r.width), Math.round(r.height)]
  }))
  await page.close()
}
await browser.close()
