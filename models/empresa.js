var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var empresaSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    nit: { type: String, unique: true, required: [true, 'El nit es necesario'] },
    codigoNit: { type: String, required: [true, 'El codigo del nit es necesario'] },
    telefono: { type: String, required: [true, 'El telefono es necesario'] },
    direccion: { type: String, required: [true, 'La direccion es necesaria'] }
});

empresaSchema.plugin(uniqueValidator, { message: ' debe de ser unico' });
module.exports = mongoose.model('Empresa', empresaSchema);