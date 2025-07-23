const db = require('../config/db');

const Actividad = {
    getAll: (callback) => {
        db.query('SELECT * FROM actividades', callback);
    },

    getById: (id, callback) => {
        db.query('SELECT * FROM actividades WHERE id = ?', [id], callback);
    },

    getByEstatus: (estatus, callback) => {
        db.query('SELECT * FROM actividades WHERE estatus = ?', [estatus], callback);
    },

    create: (data, callback) => {
        db.query('INSERT INTO actividades (actividad, descripcion, estatus) VALUES (?, ?, ?)',
        [data.actividad, data.descripcion, data.estatus], callback);
    },

    update: (id, data, callback) => {
        db.query('UPDATE actividades SET actividad = ?, descripcion = ?, estatus = ? WHERE id = ?',
        [data.actividad, data.descripcion, data.estatus], callback);
    },

    delete: (id, callback) => {
        db.query('DELETE FROM actividades WHERE id = ?', [id], callback);
    }
}

module.exports = Actividad;