import puppeteer from 'puppeteer-core';
import { execSync } from 'child_process';

const browser = execSync('wmic process where name="chrome.exe" get ProcessId', { encoding: 'utf-8' }).trim();
if (!browser) {
  console.log('Chrome not found for debugging, using full-page approach');
  process.exit(0);
}

