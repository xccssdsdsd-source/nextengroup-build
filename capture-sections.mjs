import puppeteer from 'puppeteer'

const b = await puppeteer.launch({ headless: true })
const p = await b.newPage()
await p.setViewport({width:1440, height:900})

try {
  await p.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 120000 })
  await new Promise(r => setTimeout(r, 2000))

  // Scroll to Strony WWW section
  await p.evaluate(() => {
    document.querySelector('#uslugi')?.scrollIntoView({ block: 'center' })
  })
  await new Promise(r => setTimeout(r, 1000))
  await p.screenshot({path: 'temporary screenshots/01-strony-www.png'})
  console.log('1. Saved Strony WWW')

  // Scroll to Automatyzacje section
  await p.evaluate(() => {
    document.querySelector('#automatyzacje')?.scrollIntoView({ block: 'center' })
  })
  await new Promise(r => setTimeout(r, 1000))
  await p.screenshot({path: 'temporary screenshots/02-automatyzacje.png'})
  console.log('2. Saved Automatyzacje')

  // Scroll down to see AI cards
  await p.evaluate(() => {
    window.scrollBy(0, 400)
  })
  await new Promise(r => setTimeout(r, 1000))
  await p.screenshot({path: 'temporary screenshots/03-ai-cards.png'})
  console.log('3. Saved AI Cards')

} catch (e) {
  console.error('Error:', e.message)
} finally {
  await b.close()
}
