const Actividad = require('../models/actividadModel');

exports.getActividades = (req, res) => {
    Actividad.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};

exports.getActividadById = (req, res) => {
    const { id } = req.params;
    Actividad.getById(id, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.length === 0) return res.status(404).json({ error: 'Actividad no encontrada' });
       res.json(results[0]);
    });
};

exports.getActividadByEstatus = (req, res) => {
    const { estatus } = req.query;
    if (!estatus) return res.status(400).json({ error: 'Estatus requerido' });
    Actividad.getByEstatus(estatus, (err, results) => {
        if (err) return res.status(500).json({ error: err });
       res.json(results);
    });
};

exports.crearActividad = (req, res) => {
    Actividad.create(req.body, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ id: results.insertId, ...req.body  });
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