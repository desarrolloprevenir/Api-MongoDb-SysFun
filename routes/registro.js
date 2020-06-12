const express = require('express');
var config = require('../config/config');
const app = express();

// Modelos
const Usuario = require('../models/usuarios');
const Empresa = require('../models/empresa');

// ======================================
// Registrar usuario y empresa
// ======================================

app.post('/', (req, res) => {

    // console.log(req.body);
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
                contrasena: req.body.usuario.contrasena,
                rol: req.body.usuario.rol,
                cargo: 'Representante Legal',
                empresa: empresaGuardada._id,
                menu: config('desarrollo').menu,
            });

            usuario.creadoPor = usuario._id;

            // console.log(usuario);
            usuario.save((err, usuarioGuardado) => {
                if (err) {

                    Empresa.deleteOne({ _id: empresaGuardada._id }, (err, empresaBorrada) => {});
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