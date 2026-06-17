// ms_tiempo/src/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const { getConnection } = require('./data/db');
const { obtenerTiempo } = require('./controllers/tiempoController');
const { obtenerClima } = require('./controllers/climaController');

const app = express();
app.use(cors({
origin: 'http://localhost:5173', // El puerto donde corre tu React
    methods: ['GET', 'POST'],
    credentials: true
}));
app.use(express.json());

// --- CONFIGURACIÓN SWAGGER (Forma Infalible) ---
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Tiempo y Clima',
            version: '1.0.0',
            description: 'Documentación de la API para consulta de tiempo y clima'
        },
        // Definimos las rutas directamente aquí usando objetos JS reales
        paths: {
            '/api/tiempo/{id}': {
                get: {
                    summary: 'Obtiene la hora actual de un país',
                    parameters: [{
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: { type: 'integer' },
                        description: 'ID del país en la base de datos'
                    }],
                    responses: {
                        200: { description: 'Hora obtenida exitosamente' },
                        500: { description: 'Error interno del servidor' }
                    }
                }
            },
            '/api/clima/{id}': {
                get: {
                    summary: 'Obtiene el clima actual de un país',
                    parameters: [{
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: { type: 'integer' },
                        description: 'ID del país en la base de datos'
                    }],
                    responses: {
                        200: { description: 'Clima obtenido exitosamente' },
                        500: { description: 'Error interno del servidor' }
                    }
                }
            }
        }
    },
    apis: [], // Dejamos esto vacío para que ignore los comentarios y no explote
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// --- RUTA PARA VER LA DOCUMENTACIÓN SWAGGER ---
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// --- RUTAS DE LA API ---
app.get('/api/tiempo/:id', obtenerTiempo);
app.get('/api/clima/:id', obtenerClima);

const PORT = 3001;

// --- INICIO DEL SERVIDOR ---
app.listen(PORT, async () => {
    console.log(` Servidor en: http://localhost:${PORT}`);
    console.log(` Documentación Swagger en: http://localhost:${PORT}/api-docs`);
    try {
        await getConnection();
        console.log('Base de datos conectada correctamente.');
    } catch (error) {
        console.log('No se pudo conectar a la base de datos.', error);
    }
});