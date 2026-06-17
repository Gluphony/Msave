// ms_tiempo/src/services/climaService.js
require('dotenv').config(); // <-- Esta línea carga el archivo .env
const axios = require('axios');
const paisesData = require('../data/paisesData');

// Ahora accedemos a la variable de forma segura
const API_KEY = process.env.WEATHER_API_KEY; 

const obtenerClimaPorId = async (id) => {
    const pais = await paisesData.obtenerPaisPorId(id);
    if (!pais) throw new Error('País no encontrado');

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${pais.latitud}&lon=${pais.longitud}&appid=${API_KEY}&units=metric&lang=es`;
    
    const response = await axios.get(url);
    const data = response.data;

    return {
        pais: pais.nombre,
        temperatura: `${data.main.temp}°C`,
        descripcion: data.weather[0].description,
        humedad: `${data.main.humidity}%`,
        icono: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2d.png`
    };
};

module.exports = { obtenerClimaPorId };