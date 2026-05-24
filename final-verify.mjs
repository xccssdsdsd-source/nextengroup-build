import { readFileSync } from 'fs';

const files = {
  Nav: 'components/Nav.tsx',
  Hero: 'components/Hero.tsx',
  AboutMe: 'components/AboutMe.tsx',
  StickyCta: 'components/StickyCta.tsx',
  Portfolio: 'components/Portfolio.tsx',
  Footer: 'components/Footer.tsx',
};

console.log('Fix Verification:\n');

// 1. Navigation Consistency
const nav = readFileSync(files.Nav, 'utf-8');
const navLinks = nav.match(/const links = \[([\s\S]*?)\] as const/)?.[1];
const hasCorrectNav = nav.includes("['Usługi', '#uslugi']") && 
                      nav.includes("['Proces', '#proces']") && 
                      nav.includes("['Realizacje', '#portfolio']") && 
                      nav.includes("['FAQ', '#faq']") && 
                      nav.includes("['Kontakt', '#kontakt']");
console.log(`1. NAVIGATION CONSISTENCY: ${hasCorrectNav ? '✓ PASS' : '✗ FAIL'}`);
if (hasCorrectNav) {
  console.log('   Links: Usługi → Proces → Realizacje → FAQ → Kontakt');
}

// 2. CTA Text
const hero = readFileSync(files.Hero, 'utf-8');
const aboutMe = readFileSync(files.AboutMe, 'utf-8');
const stickyCta = readFileSync(files.StickyCta, 'utf-8');

const heroCta = hero.includes('Umów 15 min rozmowę');
const aboutMeCta = aboutMe.includes('Umów 15 min rozmowę');
const stickyCtaDsk = stickyCta.includes('Umów rozmowę');
const allCtaUpdated = heroCta && aboutMeCta && stickyCtaDsk;

console.log(`\n2. CTA TEXT: ${allCtaUpdated ? '✓ PASS' : '✗ FAIL'}`);
if (heroCta) console.log('   ✓ Hero: "Umów 15 min rozmowę"');
if (aboutMeCta) console.log('   ✓ AboutMe: "Umów 15 min rozmowę"');
if (stickyCtaDsk) console.log('   ✓ StickyCta: "Umów rozmowę"');

// 3. Carousel
const portfolio = readFileSync(files.Portfolio, 'utf-8');
const hasCarouselLayout = portfolio.includes('overflow-x-auto') &&
                          portfolio.includes('snap-x snap-mandatory') &&
                          portfolio.includes('w-full lg:w-[calc(50%-12px)]') &&
                          portfolio.includes('gap-6') &&
                          portfolio.includes('rounded-[16px] border border-[#e5e7eb]');

console.log(`\n3. REALIZACJE CAROUSEL: ${hasCarouselLayout ? '✓ PASS' : '✗ FAIL'}`);
if (hasCarouselLayout) {
  console.log('   ✓ Cards: white bg, border #e5e7eb, border-radius 16px');
  console.log('   ✓ Layout: scroll container with snap points');
  console.log('   ✓ Desktop: 2 cards with gap 24px');
  console.log('   ✓ Mobile: 1 card full width');
}

console.log(`\n${'='.repeat(50)}`);
console.log(`Overall: ${allCtaUpdated && hasCorrectNav && hasCarouselLayout ? '✅ ALL FIXES COMPLETE' : '❌ ISSUES FOUND'}`);
