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


    // se modifico
    update: (id, data, callback) => {
        db.query(
            'UPDATE actividades SET estatus = ? WHERE id = ?',
            [data.estatus, id],
            callback
        );
    },

    delete: (id, callback) => {
        db.query('DELETE FROM actividades WHERE id = ?', [id], callback);
    }
}

module.exports = Actividad;