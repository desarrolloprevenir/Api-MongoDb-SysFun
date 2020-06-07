// Requires librerias etc.
const express = require('express');
const mongoose = require('mongoose');

// Inicializar variables
const app = express();

// Middleware CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});

// 
mongoose.set('useCreateIndex', true);

// Body Parser - URL encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexion a la base de datos
mongoose.connect('mongodb://localhost:27017/sys_fun', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a MongoDB...'))
    .catch(err => console.log('No se pudo conectar con MongoDB..', err));


// Importar router
const appRoutes = require('./routes/app');
const empresaRoutes = require('./routes/empresa');
const usuarioRoutes = require('./routes/usuario');
const registroRoutes = require('./routes/registro');

// Rutas
app.use('/empresa', empresaRoutes);
app.use('/usuario', usuarioRoutes);
app.use('/registro', registroRoutes);
app.use('/', appRoutes);

// Escuchar peticiones
app.listen(3000, () => {
    console.log('express server corriendo en el puerto 3000: \x1b[32m%s\x1b[0m', 'online');
});