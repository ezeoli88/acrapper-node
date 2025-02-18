import 'dotenv/config'

import express from 'express';
import { SearchProductFromMercadoLibre } from './main.js';
import { Resend } from 'resend';

const resend = new Resend(process.env.API_KEY_RESEND);

const app = express();
const port = process.env.PORT || 3000;

// Endpoint para buscar productos
app.get('/search', async (req, res) => {
    try {
        const { q } = req.query;
        
        if (!q) {
            return res.status(400).json({
                error: 'El parámetro de búsqueda "q" es requerido'
            });
        }

        const productos = await SearchProductFromMercadoLibre(q);
        resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'ekiolivier@gmail.com',
            subject: `Productos encontrados para ${q}`,
            html: `<p>Productos encontrados para ${q}:</p><ul>${productos.map(producto => `<li>Modelo: ${producto.modelo} - Precio Original: ${producto.precioOriginal} - Precio Rebajado: ${producto.precioRebajado} - Rebaja: ${producto.rebaja} </li>`).join('')}</ul>`
            });
        res.json({
            message: 'Email enviado correctamente',
        });

    } catch (error) {
        console.error('Error en la búsqueda:', error);
        res.status(500).json({
            error: 'Error al buscar productos',
            message: error.message
        });
    }
});

// Ruta de inicio
app.get('/', (req, res) => {
    res.send(`
        <h1>API de Búsqueda MercadoLibre</h1>
        <p>Usa el endpoint /search?q=producto para buscar productos</p>
        <p>Ejemplo: <a href="/search?q=celulares">/search?q=celulares%20samsung</a></p>
    `);
});

app.listen(port, () => {
    console.log(`Servidor corriendo en puerto: ${port}`);
});
