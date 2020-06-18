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
        creadoPor: req.body.creadoPor,
        empresa: req.body.empresa._id,
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


    // Verificar permisos
    let puede = permisos.verificarPermisos({ idUsuario: req.usuario.idUsuario, modulo: 1, subMenu: 0, permiso: 'ver' });

    puede.then(() => {

            // console.log('desde usuario', puede);
            var idEmpresa = req.params.id;
            Usuario.find({ empresa: idEmpresa, activo: true })
                .populate('empresa')
                .exec((err, usuarios) => {

                    // console.log(usuarios);

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
                            mensaje: 'No hay usuarios registrados.',
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

// ======================================
// Get usuario por id
// ======================================

app.get('/:idUsuario', middlewares.verificaToken, (req, res) => {

    let puede = permisos.verificarPermisos({ idUsuario: req.usuario.idUsuario, modulo: 1, subMenu: 0, permiso: 'ver' });

    puede.then(() => {
        Usuario.findOne({ _id: req.params.idUsuario, activo: true })
            .populate('empresa')
            .exec((err, usuarioBd) => {

                // console.log('usuariobd', usuarioBd);
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error al buscar usuario.',
                        errors: err
                    });
                }

                // console.log(usuarioBd);

                if (!usuarioBd) {
                    return res.status(204).json({
                        ok: false,
                        mensaje: 'El usuario no existe o no se encuatra activo.',
                        usuario: usuarioBd
                    });
                }

                //  Validación usuario que se desea editar pertenesca a la misma empresa

                // console.log(usuarioBd.empresa._id, req.usuario.idEmpresa);
                if (usuarioBd.empresa._id.toString() === req.usuario.idEmpresa.toString()) {
                    // console.log('si se puede editar');
                    return res.status(200).json({
                        ok: true,
                        usuario: usuarioBd
                    });
                }

                res.status(400).json({
                    ok: false,
                    mensaje: 'Restringido'
                });


            });
    })

    .catch(mensaje => {
        res.status(mensaje.status).json(mensaje.json);
    });

});


// ======================================
// Editar usuario
// ======================================

app.put('/', middlewares.verificaToken, (req, res) => {

    // Verificar permisos
    let puede = permisos.verificarPermisos({ idUsuario: req.usuario.idUsuario, modulo: 1, subMenu: 0, permiso: 'editar' });

    puede.then(

            Usuario.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, usuarioEdit) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error al editar usuario.',
                        errors: err
                    });
                }

                if (!usuarioEdit) {
                    return res.status(204).json({
                        ok: false,
                        mensaje: 'El usuario no existe o no se encuatra activo.',
                        usuario: usuarioBd
                    });
                }

                res.status(200).json({
                    ok: true,
                    usuario: usuarioEdit
                });
            })
        )
        .catch(mensaje => {
            res.status(mensaje.status).json(mensaje.json);
        });
});



// ======================================
// Eliminar usuario
// ======================================

app.delete('/:idUsuario', middlewares.verificaToken, (req, res) => {

    let puede = permisos.verificarPermisos({ idUsuario: req.usuario.idUsuario, modulo: 1, subMenu: 0, permiso: 'eliminar' });

    puede.then(

            Usuario.findByIdAndUpdate(req.params.idUsuario, { activo: false }, { new: true }, (err, usuarioDesactivado) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error al eliminar usuario.',
                        errors: err
                    });
                }

                if (!usuarioDesactivado) {
                    return res.status(204).json({
                        ok: false,
                        mensaje: 'No se encontro el usuario.',
                        usuario: usuarioBd
                    });
                }

                res.status(200).json({
                    ok: true,
                    usuario: usuarioDesactivado
                });


            })
        )
        .catch(mensaje => {
            res.status(mensaje.status).json(mensaje.json);
        });

});



module.exports = app;