// ms_tiempo/src/data/db.js
// Esta capa de Datos es la que se encarga de hablar con la base de datos
// Aquí SOLO hay lógica de conexión a SQL Server, nada de lógica de negocio ni HTTP
const sql = require('mssql/msnodesqlv8');

// Traducimos tu cadena de conexión al formato exacto que pide Node.js
// IMPORTANTE: Cambia TU_USUARIO y TU_CONTRASEÑA
const dbConfig = {
    connectionString: 'Driver={SQL Server};Server=MSI\\SQLEXPRESS;Database=ProyectoClimaHora;Uid=Marcelo ;Pwd=Pipizza21;'
};

const getConnection = async () => {
    try {
        const pool = await sql.connect(dbConfig);
        return pool;
    } catch (error) {
        console.error('❌ Error conectando a SQL Server:', error);
        throw error;
    }
};

module.exports = { getConnection };