import puppeteer from 'puppeteer'

const b = await puppeteer.launch({ headless: true, timeout: 120000 })
const p = await b.newPage()
await p.setViewport({width:1440, height:900})

try {
  await p.goto('http://localhost:3004', { waitUntil: 'networkidle2', timeout: 120000 })
  await new Promise(r => setTimeout(r, 2000))
  
  const body = await p.evaluate(() => {
    return {
      title: document.title,
      hasUslugi: !!document.querySelector('#uslugi'),
      hasAutomatyzacje: !!document.querySelector('#automatyzacje'),
      bodyHTML: document.body.innerHTML.substring(0, 500)
    }
  })
  
  console.log('Page info:', JSON.stringify(body, null, 2))
} catch (e) {
  console.error('Error:', e.message)
} finally {
  await b.close()
}
