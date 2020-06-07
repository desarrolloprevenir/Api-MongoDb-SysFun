const express = require('express');
const app = express();

// Modelos
const Usuario = require('../models/usuarios');
const Empresa = require('../models/empresa');

// ======================================
// Guardar usuario
// ======================================

app.post('/', (req, res) => {

    var usuario = new Usuario({
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        cedula: req.body.cedula,
        telefono: req.body.telefono,
        email: req.body.email,
        usuario: req.body.usuario,
        contrasena: req.body.contrasena,
    });

    usuario.save((err, usuarioGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: 'false',
                mensaje: 'Error al crear usuario.',
                errors: err
            });
        }

        res.status(201).json({
            ok: 'true',
            usuario: usuarioGuardado,
        });
    });

});

module.exports = app;