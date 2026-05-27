import puppeteer from 'puppeteer'
import fs from 'fs'

const browser = await puppeteer.launch()

// Mobile
const mob = await browser.newPage()
await mob.setViewport({ width: 375, height: 667 })
await mob.goto('http://localhost:3000', { waitUntil: 'networkidle2' })
await mob.screenshot({ path: 'screenshots/balanced-mobile.png', fullPage: false })
await mob.screenshot({ path: 'screenshots/balanced-mobile-full.png', fullPage: true })

// Desktop
const desk = await browser.newPage()
await desk.setViewport({ width: 1920, height: 1080 })
await desk.goto('http://localhost:3000', { waitUntil: 'networkidle2' })
await desk.screenshot({ path: 'screenshots/balanced-desktop.png', fullPage: false })

console.log('Balanced test screenshots saved')
await browser.close()
