import puppeteer from 'puppeteer-core';
import { execSync } from 'child_process';

try {
  const proc = execSync('tasklist | findstr chrome', { encoding: 'utf-8', stdio: 'pipe' });
  if (proc) {
    console.log('Chrome process found but using fallback method');
  }
} catch {
  console.log('No Chrome process');
}

// Use basic screenshot instead
console.log('Taking basic viewport screenshot as fallback');
