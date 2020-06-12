const express = require('express');
const middlewares = require('../middlewares/authentication');
var permisos = require('../middlewares/permisos');
const app = express();

// Modelos
const Usuario = require('../models/usuarios');

// ======================================
// Guardar usuario
// ======================================

app.post('/', (req, res) => {

    // console.log(req.body.idCreador);

    var usuario = new Usuario({
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        cedula: req.body.cedula,
        telefono: req.body.telefono,
        correo: req.body.correo,
        contrasena: req.body.contrasena,
        rol: req.body.rol,
        cargo: req.body.cargo,
        creadoPor: req.body.idCreador,
        empresa: req.body.idEmpresa,
        funcionalidadesyPermisos: req.body.funcionalidadesyPermisos,
        menu: req.body.menu
    });

    // console.log(usuario);

    usuario.save((err, usuarioGuardado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al crear usuario.',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            usuario: usuarioGuardado,
        });
    });

});


// ======================================
// Get usuarios por idEMpresa
// ======================================
app.get('/empresa/:id', middlewares.verificaToken, (req, res) => {


    let puede = permisos.verificarPermisos({ idUsuario: req.idUsuario, modulo: 1, subMenu: 0 });

    puede.then(() => {

            // console.log('desde usuario', puede);
            var idEmpresa = req.params.id;
            Usuario.find({ empresa: idEmpresa }, (err, usuarios) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error al buscar usuarios.',
                        errors: err
                    });
                }

                if (!usuarios) {
                    return res.status(204).json({
                        ok: true,
                        mensaje: 'No hay usuarios.',
                        usuarios
                    });
                }

                res.status(200).json({
                    ok: true,
                    usuarios: usuarios
                });
            });
        })
        .catch(mensaje => {
            res.status(mensaje.status).json(mensaje.json);
        });
});


module.exports = app;