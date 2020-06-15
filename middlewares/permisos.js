var Usuario = require('../models/usuarios');

// ======================================
// Verificar Permisos peticion
// ======================================

exports.verificarPermisos = function(info) {

    let promise = new Promise((resolve, reject) => {

        Usuario.findById(info.idUsuario, (err, usuarioBd) => {

            if (err) {

                return reject({
                    status: 400,
                    json: {
                        ok: false,
                        mensaje: 'Error al validar usuario.',
                        errors: err
                    }
                });
            }

            if (!usuarioBd) {
                return reject({
                    status: 404,
                    json: {
                        ok: false,
                        mensaje: 'Usuario no valido.',
                        errors: err
                    }
                });
            }

            // console.log('Desde middleware', usuarioBd);

            var menu = usuarioBd.menu;

            // Verificacion de permisos

            switch (info.permiso) {
                case 'ver':
                    if (menu[info.modulo].activo === true) {
                        if (menu[info.modulo].subMenu[info.subMenu].ver === true) {
                            return resolve(true);
                        }
                    }
                    break;
            }

            return reject({
                status: 401,
                json: {
                    ok: false,
                    mensaje: 'El usuario no tiene permiso para realizar esta accion.',
                }
            });
        });

    });

    return promise;
    // return await puede;

};