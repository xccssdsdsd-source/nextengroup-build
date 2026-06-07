import puppeteer from 'puppeteer'

const b = await puppeteer.launch({ headless: true, timeout: 120000 })
const p = await b.newPage()
await p.setViewport({width:1440, height:900})

try {
  await p.goto('http://localhost:3004', { waitUntil: 'networkidle2', timeout: 120000 })
  await new Promise(r => setTimeout(r, 1500))
  
  await p.evaluate(() => {
    const el = document.querySelector('#automatyzacje')
    if (el) el.scrollIntoView({ behavior: 'auto', block: 'start' })
  })
  
  await new Promise(r => setTimeout(r, 800))
  
  const text = await p.evaluate(() => {
    const section = document.querySelector('#automatyzacje .section-heading')
    return section?.innerText
  })
  
  console.log('Heading text:')
  console.log(text)
} catch (e) {
  console.error('Error:', e.message)
} finally {
  await b.close()
}
