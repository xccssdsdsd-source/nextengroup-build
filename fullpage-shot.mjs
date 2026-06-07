import puppeteer from 'puppeteer'
const url = process.argv[2] || 'http://localhost:3000'
const selector = process.argv[3] || '#automatyzacje'
const out = process.argv[4] || 'temporary screenshots/fullpage.png'

const b = await puppeteer.launch({ headless: true, timeout: 120000 })
const p = await b.newPage()
await p.setViewport({width:1440, height:2000})
try {
  await p.goto(url, { waitUntil: 'networkidle2', timeout: 120000 })
  await new Promise(r => setTimeout(r, 1500))

  if (selector) {
    await p.evaluate((sel) => {
      const el = document.querySelector(sel)
      if (el) el.scrollIntoView({ behavior: 'auto', block: 'start' })
    }, selector)
    await new Promise(r => setTimeout(r, 800))
  }

  await p.screenshot({path: out, fullPage: true})
  console.log('saved', out)
} catch (e) {
  console.error('Error:', e.message)
} finally {
  await b.close()
}
