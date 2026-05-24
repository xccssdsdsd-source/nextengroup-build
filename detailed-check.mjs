import fetch from 'node-fetch';

const html = await fetch('http://localhost:3000').then(r => r.text());

// Extract nav links
const navMatch = html.match(/const links = \[([\s\S]*?)\] as const/);
if (navMatch) {
  console.log('Nav links config:');
  console.log(navMatch[1]);
}

// Check for CTA text
const cta1 = html.includes('Umów 15 min rozmowę') ? '✓ Found "Umów 15 min rozmowę"' : '✗ Missing "Umów 15 min rozmowę"';
const cta2 = html.includes('Zarezerwuj') ? '✗ Still has old "Zarezerwuj" text' : '✓ Removed old CTA text';
const cta3 = html.includes('Umów rozmowę') ? '✓ Found "Umów rozmowę"' : '✗ Missing "Umów rozmowę"';

console.log('\nCTA checks:');
console.log(cta1);
console.log(cta2);
console.log(cta3);

// Check Portfolio component
const portfolioMatch = html.includes('flex-shrink-0 w-full lg:w-[calc(50%-12px)]') ? '✓ Carousel width CSS found' : '✗ Carousel CSS missing';
console.log('\nCarousel checks:');
console.log(portfolioMatch);
