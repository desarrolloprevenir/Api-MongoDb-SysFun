const express = require('express');
const middleware = require('../middlewares/authentication');
const permisos = require('../middlewares/permisos');
const app = express();

// modelos
const Convenio = require('../models/convenio');

// ======================================
// Guardar convenio
// ======================================

app.post('/', middleware.verificaToken, (req, res) => {

    // Verificar permisos
    let puede = permisos.verificarPermisos({ idUsuario: req.usuario.idUsuario, modulo: 1, subMenu: 1, permiso: 'crear' });

    puede.then(() => {

            var convenio = new Convenio({
                nombreEmpresa: req.body.nombreEmpresa,
                direccionEmpresa: req.body.direccionEmpresa,
                nit: req.body.nit,
                codigoNit: req.body.codigoNit,
                telefono: req.body.telefono,
                correoEmpresa: req.body.correoEmpresa,
                nombreRepresentanteLegal: req.body.nombreRepresentanteLegal,
                cedulaRepresentanteLegal: req.body.cedulaRepresentanteLegal,
                telefonoRepresentanteLegal: req.body.telefonoRepresentanteLegal,
                fechaNacimientoRepresentanteLegal: req.body.fechaNacimientoRepresentanteLegal,
                nombresContacto: req.body.nombresContacto,
                cargoContacto: req.body.cargoContacto,
                direccionContacto: req.body.direccionContacto,
                telefonoContacto: req.body.telefonoContacto,
                correoContacto: req.body.correoContacto,
                fechaNacimientoContacto: req.body.fechaNacimientoContacto,
                creadoPor: req.body.creadoPor,
                empresa: req.body.empresa
            });

            convenio.save((err, convenioGuardado) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error al crear convenio.',
                        errors: err
                    });
                }

                res.status(201).json({
                    ok: true,
                    convenio: convenioGuardado,
                });

            });

        })
        .catch(mensaje => {
            res.status(mensaje.status).json(mensaje.json);
        });
});

// ======================================
// Get convenios segun empresa
// ======================================

app.get('/:idEmpresa', middleware.verificaToken, (req, res) => {

    // Verificar permisos
    let puede = permisos.verificarPermisos({ idUsuario: req.usuario.idUsuario, modulo: 1, subMenu: 1, permiso: 'ver' });

    puede.then(() => {

            Convenio.find({ empresa: req.params.idEmpresa })
                .populate('empresa', 'nombre')
                .populate('creadoPor', 'nombres apellidos cargo')
                .exec((err, conveniosBD) => {

                    if (err) {
                        return res.status(500).json({
                            ok: false,
                            mensaje: 'Error al buscar convenios.',
                            errors: err
                        });
                    }

                    if (!conveniosBD) {
                        return res.status(204).json({
                            ok: true,
                            mensaje: 'No hay convenios registrados.',
                            usuarios
                        });
                    }

                    res.status(200).json({
                        ok: true,
                        convenios: conveniosBD
                    });

                });

        })
        .catch(mensaje => {
            res.status(mensaje.status).json(mensaje.json);
        });

});

module.exports = app;