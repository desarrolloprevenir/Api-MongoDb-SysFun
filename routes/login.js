const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const app = express();

// Modelos
const Usuario = require('../models/usuarios');

// ======================================
// Login
// ======================================

app.post('/', (req, res) => {

    // console.log(req.body);
    Usuario.findOne({ correo: req.body.correo })
        .populate('empresa')
        .populate('creadoPor', '_id nombres apellidos cargo')
        .exec((err, usuarioBD) => {

            // console.log(usuarioBD);
            if (err) {
                return res.status(500).json({
                    ok: false,
                    error: err,
                });
            }

            if (!usuarioBD) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Usuario o contraseña incorrectos',
                });
            }

            if (usuarioBD.contrasena === req.body.contrasena) {
                usuarioBD.contrasena = '';
                var token = jwt.sign({ usuario: usuarioBD }, config('desarrollo').token.SEED, { expiresIn: '24h' });
                return res.status(200).json({
                    ok: true,
                    usuario: usuarioBD,
                    token: token
                });
            }

            res.status(400).json({
                ok: false,
                mensaje: 'Usuario o contraseña incorrectos',
            });
        });

});


module.exports = app;