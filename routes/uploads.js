const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const app = express();

// Modelos
var Usuario = require('../models/usuarios');

// default options
app.use(fileUpload());

app.put('/:id', (req, res) => {

    var id = req.params.id;

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No se cargo ninguna imagen.',
            errors: { message: 'Debe de seleccionar una imagen' }
        });
    }

    // Obtener nombre del archivo
    var archivo = req.files.imagen;
    var nombreCortado = archivo.name.split('.');
    // Para oobtener el valor de la ultima posicion despues de hacer el split()
    var extensionArchivo = nombreCortado[nombreCortado.length - 1];

    // Solo estas extenciones de archivo aceptamos
    var extensionesValidas = ['png', 'jpg', 'gif', 'jpeg', 'PNG', 'JPG', 'JPEG'];

    if (extensionesValidas.indexOf(extensionArchivo) < 0) {
        return res.status(400).json({
            ok: 'false',
            mensaje: 'Extension no valida.',
            errors: { message: 'Las extensiones validas son ' + extensionesValidas.join(', ') }
        });
    }

    // Nombre de archivo personalizado
    var nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extensionArchivo}`;

    // Mover el archivo del temporal a un path especifico
    var path = `./public/imagenes-usuario/${nombreArchivo}`;

    archivo.mv(path, err => {
        if (err) {
            return res.status(500).json({
                ok: 'false',
                mensaje: 'Error al mover archivo',
                errors: { message: err }
            });
        }

        Usuario.findById(id, (err, usuario) => {

            // console.log('Find by id', usuario);

            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al encontrar usuario.',
                    errors: err
                });
            }


            if (!usuario) {
                return res.status(400).json({
                    ok: 'true',
                    mensaje: 'El usuario no existe.',
                    errors: { message: 'EL usuario no existe' }
                });
            }


            var pathViejo = './public/imagenes-usuario/' + usuario.imagen;
            // console.log(pathViejo);

            if (usuario.imagen !== 'user.png') {
                // Si existe, elimina la imagen anterior
                if (fs.existsSync(pathViejo)) {
                    fs.unlinkSync(pathViejo);
                }
            }


            usuario.imagen = nombreArchivo;


            // usuario.save()
            //     .populate('empresa')
            //     .exec((err, usuarioActualizado) => {
            //         if (err) {
            //             return res.status(500).json({
            //                 ok: false,
            //                 mensaje: 'Error al actualiza imagen de usuario.',
            //                 errors: err
            //             });
            //         }

            //         usuarioActualizado.contrasena = '';
            //         res.status(200).json({
            //             ok: true,
            //             mensaje: 'Imagen de usuario actualizada.',
            //             usuario: usuarioActualizado,
            //         });
            //     });


            usuario.save((err, usuarioActualizado) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error al actualiza imagen de usuario.',
                        errors: err
                    });
                }

                usuarioActualizado.contrasena = '';
                return res.status(200).json({
                    ok: 'true',
                    mensaje: 'Imagen de usuario actualizada.',
                    usuario: usuarioActualizado
                });
            });

        });
    });


});




module.exports = app;