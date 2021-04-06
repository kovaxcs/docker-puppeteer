const puppeteer = require('puppeteer');
const express = require('express');
const app = express()
const port = 3100;
const C = require('./constants');
const LOGIN_POPUP = '#block-menu-block-1 > div > ul > li.last.leaf.menu-mlid-387 > a';
const USERNAME_SELECTOR = '#login-email';
const PASSWORD_SELECTOR = '#login-password';
const CTA_SELECTOR = '#signin-submit';
const REQUEST_UPDATE = 'body > div.l-page.has-no-sidebars > div.canvas-content > section > div > div.vizhub-view > section.viz-metadata.clearfix.can-edit > div > figcaption > div.viz-workbook__details > div > div.extended > dl > div:nth-child(1) > dd > button';

app.get('/', (req, res) => run(req, res));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

async function run(req, res) {
  res.send('Run started!');
  console.log('Run started!');
  let browser;
    try {
        console.log("Opening the browser......");
        browser = await puppeteer.launch({
            headless: false,
            args: ["--disable-setuid-sandbox"],
            'ignoreHTTPSErrors': true
        });
    } catch (err) {
        console.log("Could not create a browser instance => : ", err);
    }
    return browser;
  const page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
  });

  await page.goto('https://public.tableau.com/profile/erdelystat#!/vizhome/ErdlyikoronamonitorII_/Overall');
  await page.click(LOGIN_POPUP);
  await page.click(USERNAME_SELECTOR);
  await page.keyboard.type(C.username);
  await page.click(PASSWORD_SELECTOR);
  await page.keyboard.type(C.password);
  await page.click(CTA_SELECTOR);
  await page.waitForNavigation({waitUntil: 'networkidle0'});
  await page.click(REQUEST_UPDATE);

  //res.send('Button pressed!');
  console.log('Button pressed!');
  browser.close();
}
