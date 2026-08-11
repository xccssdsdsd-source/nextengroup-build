import puppeteer from 'puppeteer'
const browser = await puppeteer.launch({ headless: true })
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })
await page.evaluateOnNewDocument(() => localStorage.setItem('getbuild_cookie_consent_v1', 'rejected'))
const errors = []
page.on('pageerror', e => errors.push(e.message.slice(0, 200)))
page.on('console', m => { if (m.type() === 'error') errors.push('CONSOLE: ' + m.text().slice(0, 200)) })
await page.goto('http://localhost:3000/#agent-ai', { waitUntil: 'networkidle0', timeout: 60000 })
await page.evaluate(() => document.querySelector('#agent-ai')?.scrollIntoView({ block: 'center' }))
await new Promise(r => setTimeout(r, 800))
const input = await page.$('input[type="text"], textarea, [contenteditable]')
const chatInputSel = await page.evaluate(() => {
  const inputs = [...document.querySelectorAll('input, textarea')]
  const found = inputs.find(i => i.placeholder && i.placeholder.toLowerCase().includes('pytanie'))
  if (found) { found.id = found.id || '__chat_test_input__'; return '#' + found.id }
  return null
})
console.log('chat input selector:', chatInputSel)
if (chatInputSel) {
  await page.click(chatInputSel)
  await page.type(chatInputSel, 'Jak dziala panel ofert?', { delay: 20 })
  await page.keyboard.press('Enter')
  await new Promise(r => setTimeout(r, 4000))
  const lastMsg = await page.evaluate(() => {
    const msgs = [...document.querySelectorAll('[class*="chat"], [class*="message"]')]
    return msgs.length ? msgs[msgs.length - 1].textContent?.slice(0, 300) : null
  })
  console.log('last message on screen (heuristic):', lastMsg)
  await page.screenshot({ path: './temporary screenshots/chat-widget-test.png' })
}
console.log('errors:', errors.length ? [...new Set(errors)] : 'none')
await browser.close()
