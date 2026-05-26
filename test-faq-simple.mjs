import puppeteer from 'puppeteer'

const browser = await puppeteer.launch({
  headless: true,
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 1200 })
await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 20000 })

// Get all FAQ questions from the page
const faqCount = await page.evaluate(() => {
  const faqs = document.querySelectorAll('[role="button"]')
  const faqQuestions = []
  faqs.forEach(faq => {
    const text = faq.textContent
    if (text && text.trim().length > 0) faqQuestions.push(text.trim())
  })
  return faqQuestions
})

console.log('FAQ questions found:', faqCount.length)
faqCount.forEach((q, i) => console.log(`${i + 1}. ${q.substring(0, 60)}...`))

// Scroll to FAQ and screenshot
await page.evaluate(() => {
  document.getElementById('faq')?.scrollIntoView({ behavior: 'instant', block: 'center' })
})
await new Promise(r => setTimeout(r, 800))

await page.screenshot({ path: './temporary screenshots/faq-section.png', fullPage: false })
console.log('FAQ section screenshot taken')

await browser.close()
