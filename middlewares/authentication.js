const jwt = require('jsonwebtoken');
var config = require('../config/config');

// ======================================
// Verificar token - middleware
// ======================================

exports.verificaToken = function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    jwt.verify(token, config('desarrollo').token.SEED, (err, decode) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                mensaje: 'Token incorrecto.',
                errors: err
            });
        }

        req.usuario = { idUsuario: decode.usuario._id, idEmpresa: decode.usuario.empresa };
        next();
    });
};