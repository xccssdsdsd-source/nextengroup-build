import fetch from 'node-fetch';

const html = await fetch('http://localhost:3000').then(r => r.text());

// Check Hero CTA
const heroCtaCheck = html.includes('Umów 15 min rozmowę') ? '✓' : '✗';
console.log(`${heroCtaCheck} Hero CTA "Umów 15 min rozmowę"`);

// Check footer nav order
const footerLinksMatch = html.match(/const footerLinks = \[([\s\S]{0,500}?)\] as const/);
console.log('\nFooter nav links config:');
if (footerLinksMatch) {
  const lines = footerLinksMatch[1].split('\n').filter(l => l.includes('[')).slice(0, 6);
  lines.forEach(line => {
    const match = line.match(/\['([^']+)',/);
    if (match) console.log(`  ${match[1]}`);
  });
}

// Check carousel responsive classes
const carouselCheck = html.includes('w-full lg:w-[calc(50%-12px)]') ? '✓' : '✗';
console.log(`\n${carouselCheck} Carousel 2-column layout CSS`);

// Check scroll snap
const snapCheck = html.includes('snap-x snap-mandatory') ? '✓' : '✗';
console.log(`${snapCheck} Scroll snap enabled`);
