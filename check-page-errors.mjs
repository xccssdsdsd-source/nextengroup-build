import puppeteer from 'puppeteer'

const b = await puppeteer.launch({ headless: true, timeout: 120000 })
const p = await b.newPage()
const errors = []

p.on('error', err => {
  errors.push('Page error: ' + err.message)
})

p.on('pageerror', err => {
  errors.push('Page error: ' + err.message)
})

await p.setViewport({width:1440, height:900})

try {
  await p.goto('http://localhost:3004', { waitUntil: 'networkidle0', timeout: 120000 })
  console.log('Page loaded')
  
  await new Promise(r => setTimeout(r, 5000))
  
  const info = await p.evaluate(() => {
    return {
      documentReady: document.readyState,
      hasBody: !!document.body,
      bodyChildrenCount: document.body?.children.length,
      sectionCount: document.querySelectorAll('section').length,
      allSectionIds: Array.from(document.querySelectorAll('section')).map(s => s.id)
    }
  })
  
  console.log('Page state:', JSON.stringify(info, null, 2))
  console.log('Errors:', errors)
  
} catch (e) {
  console.error('Error:', e.message)
  console.log('Errors collected:', errors)
} finally {
  await b.close()
}
