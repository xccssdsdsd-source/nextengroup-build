import puppeteer from 'puppeteer'

const browser = await puppeteer.launch({
  headless: true,
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 1200 })
await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 20000 })

// Scroll to services section
await page.evaluate(() => {
  const section = document.getElementById('uslugi')
  if (section) section.scrollIntoView({ behavior: 'instant', block: 'center' })
})
await new Promise(r => setTimeout(r, 1000))

// Screenshot 1: Folder closed
await page.screenshot({ path: './temporary screenshots/1-folder-closed.png', fullPage: false })
console.log('1. Folder closed')

// Find and click folder
const folderBtn = await page.$('[role="button"][aria-label*="folder"]')
if (folderBtn) {
  await folderBtn.click()
  await new Promise(r => setTimeout(r, 1200))
  
  // Screenshot 2: Folder open with cards
  await page.screenshot({ path: './temporary screenshots/2-folder-open-cards.png', fullPage: false })
  console.log('2. Folder open - cards visible')
  
  // Find first card and click it
  const firstCard = await page.$('.grid [style*="borderTop"]')
  if (firstCard) {
    await firstCard.click()
    await new Promise(r => setTimeout(r, 800))
    
    // Screenshot 3: Card expanded
    await page.screenshot({ path: './temporary screenshots/3-card-expanded.png', fullPage: false })
    console.log('3. First card expanded')
    
    // Click card again to close
    const expandedCard = await page.$('max-w-2xl')
    if (expandedCard) {
      await expandedCard.click()
      await new Promise(r => setTimeout(r, 500))
      
      // Screenshot 4: Back to cards list
      await page.screenshot({ path: './temporary screenshots/4-back-to-cards.png', fullPage: false })
      console.log('4. Back to cards list')
    }
  }
}

await browser.close()
