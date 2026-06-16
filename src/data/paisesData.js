// ms_tiempo/src/data/paisesData.js
// Esta capa de Datos es la única que sabe cómo hacer SQL puro, y solo hace eso (consulta a la base de datos). No tiene lógica de negocio ni formatea nada, solo devuelve datos crudos.
const sql = require('mssql/msnodesqlv8');
const { getConnection } = require('./db');

// Esta función SOLO hace la consulta a la base de datos
const obtenerPaisPorId = async (id) => {
    const pool = await getConnection();
    const result = await pool.request()
        .input('id', sql.Int, id) // Protegemos contra inyección SQL
        .query('SELECT * FROM Paises WHERE id = @id');
        
    return result.recordset[0]; // Retorna el país o 'undefined' si no existe
};

module.exports = { obtenerPaisPorId };