const express = require('express');
const app = express();

// Modelos
const Usuario = require('../models/usuarios');
const Empresa = require('../models/empresa');

// ======================================
// Registrar usuario y empresa
// ======================================

app.post('/', (req, res) => {

    console.log(req.body);
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

        if (empresaGuardada) {


            var usuario = new Usuario({
                nombres: req.body.usuario.nombres,
                apellidos: req.body.usuario.apellidos,
                cedula: req.body.usuario.cedula,
                telefono: req.body.usuario.telefono,
                correo: req.body.usuario.correo,
                usuario: req.body.usuario.usuario,
                contrasena: req.body.usuario.contrasena,
                empresa: empresaGuardada._id
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

        }
    });

});


module.exports = app;