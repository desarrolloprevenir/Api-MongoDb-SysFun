var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var convenioSchema = new Schema({

    // Infomación empresa y representante legal

    nombreEmpresa: { type: String, required: [true, 'El nombre es necesario'] },
    direccionEmpresa: { type: String, required: [true, 'El nombre es necesario'] },
    nit: { type: String, unique: true, required: [true, 'El nit es necesario'] },
    codigoNit: { type: String, required: [true, 'El codigo del nit es necesario'] },
    telefono: { type: String, required: [true, 'El telefono es necesario'] },
    correoEmpresa: { type: String, unique: true, required: [true, 'El correo es necesario'] },
    nombreRepresentanteLegal: { type: String, required: [true, 'El nombre del representante legal es necesario'] },
    cedulaRepresentanteLegal: { type: String, required: [true, 'La cédula del representante legal es necesaria'] },
    telefonoRepresentanteLegal: { type: String, required: [true, 'El número de contacto del representante legal es necesario'] },
    fechaNacimientoRepresentanteLegal: { type: Date, required: [true, 'El nombre del representante legal es necesario'] },
    estado: { type: Boolean, default: true },

    // Información de contacto

    nombresContacto: { type: String, required: [true, 'El nombre del contacto es necesario.'] },
    cargoContacto: { type: String, required: [true, 'El cargo del contacto es necesario.'] },
    direccionContacto: { type: String, required: [true, 'La dirección del contacto es necesario.'] },
    telefonoContacto: { type: String, required: [true, 'El número del contacto es necesario.'] },
    correoContacto: { type: String, required: [true, 'El correo del contacto es necesario.'] },
    fechaNacimientoContacto: { type: String, required: [true, 'La fecha de nacimiento del contacto es necesario.'] },

    // referencias

    creadoPor: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El id del administrador es un campo obligatorio']
    },
    empresa: {
        type: Schema.Types.ObjectId,
        ref: 'Empresa',
        required: [true, 'El id empresa es un campo obligatorio ']
    },

}, { timestamps: true });

convenioSchema.plugin(uniqueValidator, { message: ' debe de ser unico' });

module.exports = mongoose.model('Convenio', convenioSchema);