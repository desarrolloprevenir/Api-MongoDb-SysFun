var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;


var usuarioSchema = new Schema({
    nombres: { type: String, required: [true, 'El nombre es necesario'] },
    apellidos: { type: String, required: [true, 'El apellido es necesario'] },
    cedula: { type: String, unique: [true, 'Este número de cedula ya se encuentra registrado'], required: [true, 'La decula es necesaria'] },
    telefono: { type: String, required: [true, 'El telefono es necesario'] },
    correo: { type: String, unique: [true, 'Este correo ya se encuentra registrado'], required: [true, 'El correo electronico es necesario'] },
    contrasena: { type: String, required: [true, 'La contraseña es necesaria'] },
    cargo: { type: String, default: 'Representante legal', required: [true, 'El cargo es necesario'] },
    rol: {},
    imagen: { type: String, default: 'http://161.35.113.108:3000/imagenes/user.png' },
    activo: { type: Boolean, default: true },
    creadoPor: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
    },
    empresa: {
        type: Schema.Types.ObjectId,
        ref: 'Empresa',
        required: [true, 'El id empresa es un campo obligatorio ']
    },
    menu: []
}, { timestamps: true });

usuarioSchema.plugin(uniqueValidator, { message: ' debe de ser unico' });
module.exports = mongoose.model('Usuario', usuarioSchema);