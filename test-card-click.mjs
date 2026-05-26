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
  document.getElementById('uslugi')?.scrollIntoView({ behavior: 'instant', block: 'center' })
})
await new Promise(r => setTimeout(r, 800))

// Click folder to open
const folderBtn = await page.$('[role="button"]')
if (folderBtn) {
  await folderBtn.click()
  await new Promise(r => setTimeout(r, 1500))
  
  console.log('Folder opened')
  
  // Get all cards in grid
  const cards = await page.$$eval('.grid > div', els => els.length)
  console.log(`Found ${cards} cards`)
  
  // Click first card using evaluate
  await page.evaluate(() => {
    const cards = document.querySelectorAll('.grid > div')
    if (cards.length > 0) {
      cards[0].click()
      console.log('First card clicked')
    }
  })
  
  await new Promise(r => setTimeout(r, 1000))
  
  // Screenshot of expanded card
  await page.screenshot({ path: './temporary screenshots/expanded-card.png', fullPage: false })
  console.log('Expanded card screenshot taken')
}

await browser.close()
