import puppeteer from 'puppeteer'

const b = await puppeteer.launch({ headless: true })
const p = await b.newPage()

try {
  await p.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 120000 })
  await new Promise(r => setTimeout(r, 2000))

  const svgCount = await p.evaluate(() => {
    return document.querySelectorAll('svg').length
  })

  const aiCardsInfo = await p.evaluate(() => {
    const h3s = Array.from(document.querySelectorAll('h3'))
    const hasAiCard = h3s.some(h => h.textContent.includes('Automatyzacja'))
    return {
      h3Count: h3s.length,
      hasAiCard: hasAiCard,
      svgCount: document.querySelectorAll('svg').length
    }
  })

  console.log('SVG Elements on page:', svgCount)
  console.log('AI Cards Info:', aiCardsInfo)

  // Check if ProcessFlowDiagram rendered
  const hasProcessDiagrams = await p.evaluate(() => {
    const svgs = document.querySelectorAll('svg')
    let count = 0
    svgs.forEach(svg => {
      if (svg.getAttribute('viewBox') === '0 0 200 64') count++
    })
    return count
  })

  console.log('Process Flow Diagrams found:', hasProcessDiagrams)

  // Check canvas elements
  const canvasCount = await p.evaluate(() => {
    return document.querySelectorAll('canvas').length
  })
  console.log('Canvas elements:', canvasCount)

} catch (e) {
  console.error('Error:', e.message)
} finally {
  await b.close()
}
