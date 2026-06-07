import puppeteer from 'puppeteer'
const url = process.argv[2] || 'http://localhost:3000'
const selector = process.argv[3] || '#uslugi'
const out = process.argv[4] || 'temporary screenshots/shot.png'

const b = await puppeteer.launch({ headless: true, timeout: 120000 })
const p = await b.newPage()
await p.setViewport({width:1440, height:900})
try {
  await p.goto(url, { waitUntil: 'networkidle2', timeout: 120000 })
  await new Promise(r => setTimeout(r, 1500))

  await p.evaluate((sel) => {
    const el = document.querySelector(sel)
    if (el) el.scrollIntoView({ behavior: 'auto', block: 'center' })
  }, selector)

  await new Promise(r => setTimeout(r, 800))
  await p.screenshot({path: out, fullPage: false})
  console.log('saved', out)
} catch (e) {
  console.error('Error:', e.message)
  try {
    await p.screenshot({path: out, fullPage: false})
    console.log('saved (partial)', out)
  } catch (e2) {
    console.error('Could not save screenshot:', e2.message)
  }
} finally {
  await b.close()
}
