const {join} = require('path');
const puppeteer = require('puppeteer');
/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  // Changes the cache location for Puppeteer.
  cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
  chrome: {
    executablePath: puppeteer.executablePath(),
  },
};