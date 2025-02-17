import puppeteer from 'puppeteer';

export async function SearchProductFromMercadoLibre(productName) {
    try {
        const product = productName.replace(' ', '-');
        console.log(`Buscando el producto: ${product}...`);
        
        const browser = await puppeteer.launch({
            executablePath: '/usr/bin/chromium-browser',
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--no-zygote']
        });
        const page = await browser.newPage();
        const url = `https://listado.mercadolibre.com.ar/${product}`;
        
        console.log(`Visitando ${url}...`);
        await page.goto(url);
        
        await page.waitForSelector('.ui-search-layout__item');
        console.log('Obteniendo productos...');
        
        const productos = await page.evaluate(() => {
            const items = document.querySelectorAll('.ui-search-layout__item');
            const results = [];
            
            for (let i = 0; i < Math.min(10, items.length); i++) {
                const item = items[i];
                
                const modelo = item.querySelector('.poly-component__title')?.innerText || 'No disponible';
                const precioOriginal = item.querySelector('.andes-money-amount__fraction')?.innerText || 'No disponible';
                const precioRebajado = item.querySelector('.andes-money-amount--cents-superscript')?.innerText || 'No disponible';
                const rebaja = item.querySelector('.andes-money-amount__discount')?.innerText || 'No disponible';
                
                results.push({ modelo, precioOriginal, precioRebajado, rebaja });
            }
            return results;
        });
        console.log({ productos });
        await browser.close();
        return productos;
        
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}