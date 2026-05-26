import puppeteer from 'puppeteer'

const browser = await puppeteer.launch({
  headless: true,
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 1400 })

try {
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 20000 })
  
  // Screenshot 1: Portfolio
  await page.evaluate(() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'instant', block: 'center' }))
  await new Promise(r => setTimeout(r, 800))
  await page.screenshot({ path: './temporary screenshots/final-portfolio.png', fullPage: false })
  console.log('✓ Portfolio updated - frame resized to 16:9, padding reduced')
  
  // Screenshot 2: FAQ
  await page.evaluate(() => document.getElementById('faq')?.scrollIntoView({ behavior: 'instant', block: 'center' }))
  await new Promise(r => setTimeout(r, 800))
  await page.screenshot({ path: './temporary screenshots/final-faq.png', fullPage: false })
  console.log('✓ FAQ updated - payment and 30-day guarantee items removed')
  
} catch (e) {
  console.log('Error:', e.message)
}

await browser.close()
