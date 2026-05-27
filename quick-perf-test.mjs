import puppeteer from 'puppeteer'

const browser = await puppeteer.launch({ headless: true })
const page = await browser.newPage()

try {
  console.log('Navigating...')
  await page.goto('http://localhost:3000', { waitUntil: 'load', timeout: 60000 })
  
  const perfData = await page.evaluate(() => {
    const navigation = performance.getEntriesByType('navigation')[0]
    const paints = performance.getEntriesByType('paint')
    
    return {
      dcl: navigation.domContentLoadedEventEnd,
      fcp: paints.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
      load: navigation.loadEventEnd,
    }
  })
  
  console.log('✓ DOMContentLoaded:', perfData.dcl.toFixed(0) + 'ms')
  console.log('✓ First Contentful Paint:', perfData.fcp.toFixed(0) + 'ms')
  console.log('✓ Load Complete:', perfData.load.toFixed(0) + 'ms')
} finally {
  await browser.close()
}
