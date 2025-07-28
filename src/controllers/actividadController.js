const Actividad = require('../models/actividadModel');

exports.getActividades = (req, res) => {
    Actividad.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (!results || results.length === 0) {
            return res.status(200).json({ mensaje: "Sin Información" });
        }
        res.status(200).json(results);
    });
};



exports.getActividadById = (req, res) => {
    const { id } = req.params;
    Actividad.getById(id, (err, results) => {
        if (err) return res.status(500).json({ error: err });

        if (results.length === 0) {
            return res.status(404).json({ error: 'Actividad no encontrada' });
        }

        res.json(results[0]);
    });
};
// modificada
exports.getActividadByEstatus = (req, res) => {
    const estado = parseInt(req.params.estatus, 10); // <-- nombre correcto del parámetro
    if (isNaN(estado) || (estado !== 0 && estado !== 1)) {
        return res.status(400).json({ error: 'Estado inválido.' });
    }

    Actividad.getByEstatus(estado, (err, results) => {
        const status = estado === 1 ? 'activas' : 'finalizadas';
        if (err) return res.status(500).json({ error: err });

        if (!results || results.length === 0) {
            return res.status(200).json({ mensaje: 'No hay ' + status });
        }

        res.status(200).json(results);
    });
};


exports.crearActividad = (req, res) => {
    Actividad.create(req.body, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ id: results.insertId, ...req.body });
    });
};

exports.actualizarActividad = (req, res) => {
    const { id } = req.params;
    Actividad.update(id, req.body, (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ id, ...req.body });
    });
};

exports.eliminarActividad = (req, res) => {
    const { id } = req.params;
    Actividad.delete(id, (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Actividad eliminada' });
    });
}