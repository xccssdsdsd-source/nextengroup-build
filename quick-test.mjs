import fetch from 'node-fetch'

const url = 'http://localhost:3003'
const response = await fetch(url)
const html = await response.text()

const hasPortfolio = html.includes('portfolio')
const hasContact = html.includes('Kontakt')
const hasHero = html.includes('dla Ciebie')

console.log('Portfolio section present:', hasPortfolio)
console.log('Contact with "Kontakt" heading:', hasContact)
console.log('Hero with "dla Ciebie":', hasHero)
