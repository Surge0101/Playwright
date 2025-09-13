import { chromium } from "playwright";

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto("https://www.example.com");

  const headers = await page.$$eval("h1, h2, h3", elements =>
    elements.map(el => el.textContent?.trim() || "")
  );

  const body = await page.textContent("body");

  console.log("Headers:", headers);
  console.log("Body:", body?.trim());

  await browser.close();
}

run();