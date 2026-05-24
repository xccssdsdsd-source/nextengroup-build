import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';

const html = await fetch('http://localhost:3003').then(r => r.text());
const dom = new JSDOM(html);
const navLinks = Array.from(dom.window.document.querySelectorAll('.nav-link')).map(a => a.textContent);
const buttons = Array.from(dom.window.document.querySelectorAll('button, a')).filter(el => el.textContent.includes('Umów') || el.textContent.includes('Zarezerwuj')).map(el => el.textContent.trim());

console.log('Nav links found:', navLinks);
console.log('CTA buttons:', buttons);
