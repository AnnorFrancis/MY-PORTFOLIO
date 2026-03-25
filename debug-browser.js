import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const logs = [];

  page.on('console', (msg) => {
    logs.push({ type: msg.type(), text: msg.text() });
  });

  page.on('pageerror', (err) => {
    logs.push({ type: 'pageerror', text: err.message });
  });

  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });

  // Capture a screenshot for visual verification
  await page.screenshot({ path: 'debug-screenshot.png', fullPage: true });

  console.log('--- Console logs ---');
  logs.forEach((log) => console.log(`${log.type}: ${log.text}`));

  await browser.close();
})();
