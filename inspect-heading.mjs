import puppeteer from 'puppeteer'

const b = await puppeteer.launch({ headless: true, timeout: 120000 })
const p = await b.newPage()
await p.setViewport({width:1440, height:900})

try {
  await p.goto('http://localhost:3004', { waitUntil: 'networkidle2', timeout: 120000 })
  await new Promise(r => setTimeout(r, 2000))
  
  await p.evaluate(() => {
    const el = document.querySelector('#automatyzacje')
    if (el) el.scrollIntoView({ behavior: 'auto', block: 'start' })
  })
  
  await new Promise(r => setTimeout(r, 1000))
  
  const info = await p.evaluate(() => {
    const section = document.querySelector('#automatyzacje')
    const heading = section?.querySelector('.section-heading')
    const h2 = heading?.querySelector('h2')
    return {
      sectionFound: !!section,
      headingFound: !!heading,
      h2Found: !!h2,
      h2Text: h2?.innerText,
      h2HTML: h2?.innerHTML
    }
  })
  
  console.log('Debug info:', JSON.stringify(info, null, 2))
  
  await p.screenshot({path: 'temporary screenshots/inspect.png', fullPage: false})
  console.log('Screenshot saved')
} catch (e) {
  console.error('Error:', e.message)
} finally {
  await b.close()
}
