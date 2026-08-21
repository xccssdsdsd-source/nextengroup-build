import puppeteer from 'puppeteer'
const browser = await puppeteer.launch({ headless: true })
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })
await page.evaluateOnNewDocument(() => { localStorage.setItem('getbuild_cookie_consent_v1','rejected') })
await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' })
await new Promise(r => setTimeout(r, 1200))
for (const label of ['Pakiety', 'Proces', 'FAQ']) {
  const res = await page.evaluate(async (label) => {
    const link = [...document.querySelectorAll('.nav-pill')].find(a => a.textContent.trim() === label)
    if (!link) return 'missing ' + label
    const samples = []
    const t0 = performance.now()
    const id = setInterval(() => samples.push([Math.round(performance.now() - t0), Math.round(window.scrollY)]), 60)
    link.click()
    await new Promise(r => setTimeout(r, 1800))
    clearInterval(id)
    const target = document.getElementById(link.getAttribute('href').slice(1))
    const want = Math.round(target.getBoundingClientRect().top + window.scrollY - parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10))
    return { label, samples: samples.filter((_, i) => i % 2 === 0), final: Math.round(window.scrollY), want }
  }, label)
  console.log(JSON.stringify(res))
  await page.evaluate(() => window.scrollTo(0, 0))
  await new Promise(r => setTimeout(r, 900))
}
await browser.close()
