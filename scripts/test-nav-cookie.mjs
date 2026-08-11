import puppeteer from 'puppeteer'
const browser = await puppeteer.launch({ headless: true })

// 1. Cookie consent banner on true first visit (no localStorage seed)
{
  const page = await browser.newPage()
  await page.setViewport({ width: 390, height: 844 })
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0', timeout: 60000 })
  await new Promise(r => setTimeout(r, 1000))
  await page.screenshot({ path: './temporary screenshots/cookie-consent-mobile.png' })
  await page.close()
}

// 2. Mobile hamburger nav menu open state
{
  const page = await browser.newPage()
  await page.setViewport({ width: 390, height: 844 })
  await page.evaluateOnNewDocument(() => localStorage.setItem('getbuild_cookie_consent_v1', 'rejected'))
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0', timeout: 60000 })
  await new Promise(r => setTimeout(r, 500))
  const btn = await page.evaluate(() => {
    const b = document.querySelector('nav button[aria-label*="enu" i], nav button[aria-expanded]')
    if (b) { b.id = b.id || '__navbtn__'; return '#' + b.id }
    return null
  })
  console.log('nav button selector:', btn)
  if (btn) {
    await page.click(btn)
    await new Promise(r => setTimeout(r, 600))
    await page.screenshot({ path: './temporary screenshots/mobile-nav-open.png' })
  }
  await page.close()
}

await browser.close()
