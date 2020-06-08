var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var usuarioSchema = new Schema({
    nombres: { type: String, required: [true, 'El nombre es necesario'] },
    apellidos: { type: String, required: [true, 'El apellido es necesario'] },
    cedula: { type: String, unique: true, required: [true, 'La decula es necesaria'] },
    telefono: { type: String, required: [true, 'El telefono es necesario'] },
    correo: { type: String, unique: true, required: [true, 'El correo electronico es necesario'] },
    contrasena: { type: String, required: [true, 'La contraseña es necesaria'] },
    cargo: { type: String, default: 'Representante legal', required: [true, 'El cargo es necesario'] },
    empresa: {
        type: Schema.Types.ObjectId,
        ref: 'Empresa',
        required: [true, 'El id empresa es un campo obligatorio ']
    }
});

usuarioSchema.plugin(uniqueValidator, { message: ' debe de ser unico' });
module.exports = mongoose.model('Usuario', usuarioSchema);