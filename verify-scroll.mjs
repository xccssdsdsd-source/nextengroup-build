import puppeteer from 'puppeteer'
import fs from 'fs'

const browser = await puppeteer.launch()
const page = await browser.newPage()
await page.setViewport({ width: 1920, height: 1080 })

const dir = 'temporary screenshots'
await fs.promises.mkdir(dir, { recursive: true })

try {
  await page.goto('http://localhost:3003', { waitUntil: 'networkidle2' })

  console.log('1. Initial page load with hero buttons')
  await page.screenshot({ path: `${dir}/01-hero-buttons.png` })

  const inicialScroll = await page.evaluate(() => window.scrollY)
  console.log(`   Initial scroll position: ${inicialScroll}`)

  console.log('\n2. Clicking "Zobacz realizacje" button...')
  const buttons = await page.$$('a.btn')
  console.log(`   Found ${buttons.length} buttons`)
  let found = false
  for (const btn of buttons) {
    const text = await page.evaluate(el => el.textContent.trim(), btn)
    console.log(`   Button text: "${text}"`)
    if (text.includes('realizacje')) {
      await btn.click()
      found = true
      break
    }
  }

  if (!found) {
    console.log('   ❌ Button with "realizacje" not found')
  } else {
    await new Promise(r => setTimeout(r, 1500))
    const portfolioScroll = await page.evaluate(() => window.scrollY)
    const portfolioEl = await page.$('#portfolio')
    const portfolioPos = portfolioEl ? await page.evaluate(el => el.getBoundingClientRect().top + window.scrollY, portfolioEl) : null

    console.log(`   ✅ Button clicked`)
    console.log(`   Scroll position after click: ${portfolioScroll}`)
    console.log(`   Portfolio section position: ${portfolioPos}`)

    if (portfolioPos && Math.abs(portfolioScroll - portfolioPos) < 100) {
      console.log(`   ✅ Successfully scrolled to portfolio section`)
    } else {
      console.log(`   ⚠️  Scroll may not have reached portfolio (offset: ${Math.abs(portfolioScroll - portfolioPos)})`)
    }

    await page.screenshot({ path: `${dir}/02-portfolio-scrolled.png` })
  }

  console.log('\n3. Scrolling back to top...')
  await page.evaluate(() => window.scrollTo(0, 0))
  await new Promise(r => setTimeout(r, 800))

  console.log('\n4. Clicking "Umów 15 min rozmowę" button...')
  const buttons2 = await page.$$('a.btn')
  found = false
  for (const btn of buttons2) {
    const text = await page.evaluate(el => el.textContent.trim(), btn)
    if (text.includes('rozmowę') || text.includes('Umów')) {
      await btn.click()
      found = true
      break
    }
  }

  if (!found) {
    console.log('   ❌ Contact button not found')
  } else {
    await new Promise(r => setTimeout(r, 1500))
    const contactScroll = await page.evaluate(() => window.scrollY)
    const contactEl = await page.$('#kontakt')
    const contactPos = contactEl ? await page.evaluate(el => el.getBoundingClientRect().top + window.scrollY, contactEl) : null

    console.log(`   ✅ Button clicked`)
    console.log(`   Scroll position after click: ${contactScroll}`)
    console.log(`   Contact section position: ${contactPos}`)

    if (contactPos && Math.abs(contactScroll - contactPos) < 100) {
      console.log(`   ✅ Successfully scrolled to contact section`)
    } else {
      console.log(`   ⚠️  Scroll may not have reached contact (offset: ${Math.abs(contactScroll - contactPos)})`)
    }

    await page.screenshot({ path: `${dir}/03-contact-scrolled.png` })
  }

  console.log('\n5. Verifying no console errors...')
  let hasErrors = false
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log(`   ❌ Console error: ${msg.text()}`)
      hasErrors = true
    }
  })

  await page.evaluate(() => {})
  if (!hasErrors) {
    console.log('   ✅ No console errors detected')
  }

} finally {
  await browser.close()
  console.log('\n✅ Verification complete')
  console.log(`Screenshots saved to: ${dir}`)
}
