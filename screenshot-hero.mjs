import puppeteer from 'puppeteer'
const sleep = ms => new Promise(r => setTimeout(r, ms))
const b = await puppeteer.launch({headless: 'new'})
const p = await b.newPage()
await p.setViewport({width:1440,height:900})

// Add logging to page
await p.on('console', msg => console.log('PAGE LOG:', msg.text()))

await p.goto('http://localhost:3000',{waitUntil:'networkidle2',timeout:60000})

// Check which paragraph is shown
const checkWhichVersion = async (label) => {
  const result = await p.evaluate(() => {
    const elements = Array.from(document.querySelectorAll('p')).filter(el =>
      el.textContent.includes('Budujemy Twój biznes przez')
    )

    return {
      text: elements[0]?.textContent,
      // Try to find parent div with animation
      hasAnimation: elements[0]?.parentElement?.querySelector('div.relative') !== null
    }
  })
  console.log(`${label}:`, result)
}

await sleep(500)
await checkWhichVersion('t=0.5s')
await sleep(3000)
await checkWhichVersion('t=3.5s')
await sleep(3000)
await checkWhichVersion('t=6.5s')

await b.close()
