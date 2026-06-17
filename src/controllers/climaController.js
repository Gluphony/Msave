const climaService = require('../services/climaService');

const obtenerClima = async (req, res) => {
    try {
        const resultado = await climaService.obtenerClimaPorId(req.params.id);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el clima' });
    }
};

module.exports = { obtenerClima };