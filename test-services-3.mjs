import puppeteer from 'puppeteer'

const browser = await puppeteer.launch({
  headless: true,
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})
const page = await browser.newPage()

let consoleErrors = []
page.on('console', msg => {
  if (msg.type() === 'error') consoleErrors.push(msg.text())
})

await page.setViewport({ width: 1440, height: 900 })
await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 20000 })

// Wait for services section and folder to appear
try {
  await page.waitForSelector('#uslugi', { timeout: 5000 })
  console.log('Services section found')
} catch (e) {
  console.log('Services section not found:', e.message)
}

// Try to find the folder button
const folderBtn = await page.$('[role="button"]')
if (folderBtn) {
  console.log('Found folder button')
  
  // Scroll to make it visible
  await folderBtn.scrollIntoView()
  await new Promise(r => setTimeout(r, 500))
  
  // Take screenshot before click
  await page.screenshot({ path: './temporary screenshots/services-before.png', fullPage: false })
  console.log('Screenshot before folder click taken')
  
  // Click the folder
  await folderBtn.click()
  await new Promise(r => setTimeout(r, 1000))
  
  // Take screenshot after click
  await page.screenshot({ path: './temporary screenshots/services-after-open.png', fullPage: false })
  console.log('Screenshot after folder click taken')
  
  // Try to click first card
  const cards = await page.$$('.grid > div')
  if (cards.length > 0) {
    console.log(`Found ${cards.length} cards`)
    await cards[0].click()
    await new Promise(r => setTimeout(r, 800))
    
    // Take screenshot after card click
    await page.screenshot({ path: './temporary screenshots/services-card-expanded.png', fullPage: false })
    console.log('Screenshot after card click taken')
  }
} else {
  console.log('Folder button not found')
}

if (consoleErrors.length > 0) {
  console.log('Console errors:', consoleErrors)
}

await browser.close()
