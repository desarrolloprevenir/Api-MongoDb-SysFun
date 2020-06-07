const express = require('express');
const app = express();

// modelos
const Empresa = require('../models/empresa');

// ======================================
// Guardar empresa
// ======================================


app.post('/', (req, res) => {

    var empresa = new Empresa({
        nombre: req.body.nombre,
        nit: req.body.nit,
        codigoNit: req.body.codigoNit,
        telefono: req.body.telefono,
        direccion: req.body.direccion,
    });

    empresa.save((err, empresaGuardada) => {

        if (err) {
            return res.status(400).json({
                ok: 'false',
                mensaje: 'Error al crear empresa.',
                errors: err
            });
        }

        res.status(201).json({
            ok: 'true',
            empresa: empresaGuardada,
        });
    });
});

module.exports = app;