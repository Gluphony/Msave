// ms_tiempo/src/services/tiempoService.js
// Esta es la capa de Servicios, aquí va toda la lógica de negocio, cálculos, transformaciones, etc.
// No sabe nada de HTTP ni de SQL puro, solo de lógica de negocio
const paisesData = require('../data/paisesData');

// Esta función calcula la hora real, no sabe nada de HTTP ni de SQL puro
const calcularHoraPais = async (id) => {
    // 1. Le pedimos a la capa de Datos que busque el país
    const pais = await paisesData.obtenerPaisPorId(id);
    
    if (!pais) {
        throw new Error('El país solicitado no existe en la base de datos.');
    }

    // 2. Lógica mágica: Calculamos la hora usando su zona_horaria
    const opciones = {
        timeZone: pais.zona_horaria,
        hour12: true,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    // Usamos el reloj interno de Node.js formateado al español
    const formatter = new Intl.DateTimeFormat('es-ES', opciones);
    const horaLocal = formatter.format(new Date());

    // 3. Devolvemos la respuesta limpia
    return {
        pais: pais.nombre,
        capital: pais.capital,
        zona_horaria: pais.zona_horaria,
        fecha_y_hora: horaLocal
    };
};

module.exports = { calcularHoraPais };