// ms_tiempo/src/index.js
// Este es el punto de entrada de nuestro microservicio de TIEMPO
// Aquí solo configuramos Express y las rutas, nada de lógica de negocio ni SQL
const express = require('express');
const cors = require('cors');
const { getConnection } = require('./data/db');
const { obtenerTiempo } = require('./controllers/tiempoController');

const app = express();
app.use(cors());
app.use(express.json());

// --- NUESTRA NUEVA RUTA N-CAPAS ---
// Cuando alguien entre a /api/tiempo/1, llamará al controlador
app.get('/api/tiempo/:id', obtenerTiempo);


const PORT = 3001;

//Validaciones para asegurar que la base de datos esté conectada antes de iniciar el servidor
app.listen(PORT, async () => {
    console.log(`Microservicio de TIEMPO corriendo en http://localhost:${PORT}`);
    try {
        await getConnection();
        console.log('Base de datos conectada correctamente.');
    } catch (error) {
        console.log('No se pudo conectar a la base de datos.');
    }
});