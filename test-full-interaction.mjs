import puppeteer from 'puppeteer'

const browser = await puppeteer.launch({
  headless: true,
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 1400 })
await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 20000 })

// Scroll to services
await page.evaluate(() => {
  document.getElementById('uslugi')?.scrollIntoView({ behavior: 'instant', block: 'center' })
})
await new Promise(r => setTimeout(r, 800))

// Screenshot 1: Folder closed
console.log('Taking screenshot 1: Folder closed')
await page.screenshot({ path: './temporary screenshots/demo-1-folder-closed.png', fullPage: false })

// Click folder
const folderBtn = await page.$('[role="button"]')
if (folderBtn) await folderBtn.click()
await new Promise(r => setTimeout(r, 1500))

// Screenshot 2: Folder open with cards visible
console.log('Taking screenshot 2: Cards visible')
await page.screenshot({ path: './temporary screenshots/demo-2-cards-visible.png', fullPage: false })

// Click first card
await page.evaluate(() => {
  document.querySelectorAll('.grid > div')[0]?.click()
})
await new Promise(r => setTimeout(r, 1000))

// Screenshot 3: First card expanded (Strony WWW)
console.log('Taking screenshot 3: First card expanded')
await page.screenshot({ path: './temporary screenshots/demo-3-card1-expanded.png', fullPage: false })

// Click back (on the card to close it)
await page.evaluate(() => {
  document.querySelector('.max-w-2xl')?.click()
})
await new Promise(r => setTimeout(r, 1000))

// Click second card
await page.evaluate(() => {
  document.querySelectorAll('.grid > div')[1]?.click()
})
await new Promise(r => setTimeout(r, 1000))

// Screenshot 4: Second card expanded (Automatyzacje AI)
console.log('Taking screenshot 4: Second card expanded')
await page.screenshot({ path: './temporary screenshots/demo-4-card2-expanded.png', fullPage: false })

// Click back
await page.evaluate(() => {
  document.querySelector('.max-w-2xl')?.click()
})
await new Promise(r => setTimeout(r, 1000))

// Click third card
await page.evaluate(() => {
  document.querySelectorAll('.grid > div')[2]?.click()
})
await new Promise(r => setTimeout(r, 1000))

// Screenshot 5: Third card expanded (Agenci AI)
console.log('Taking screenshot 5: Third card expanded')
await page.screenshot({ path: './temporary screenshots/demo-5-card3-expanded.png', fullPage: false })

console.log('All screenshots taken successfully!')
await browser.close()
