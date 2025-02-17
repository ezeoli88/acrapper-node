const { join } = require('path');

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  // Cambia la ubicación de caché para Puppeteer
  cacheDirectory: join(__dirname, 'dist', 'puppeteer'),
  // Configuración para Chrome
  chrome: {
    skipDownload: false, // Asegúrate de que Puppeteer descargue Chrome
  },
};
