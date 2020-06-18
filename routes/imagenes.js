var express = require('express');
var app = express();
const path = require('path');
const fs = require('fs');


app.get('/:imagen', (req, res) => {

    var img = req.params.imagen;
    var pathImagen = path.resolve(__dirname, `../public/imagenes-usuario/${img}`);

    if (fs.existsSync(pathImagen)) {
        res.sendFile(pathImagen);
    } else {
        var pathNoImagen = path.resolve(__dirname, '../public/imagenes-usuario/user.png');
        res.sendFile(pathNoImagen);
    }
});


module.exports = app;