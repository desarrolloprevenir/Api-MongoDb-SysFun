var config = function configuracion(entorno) {

    if (entorno === 'desarrollo') {

        var desarrollo = {
            "configBD": {
                // mongodb://161.35.229.0:27017/sys_fun
                // mongodb://localhost:27017/sys_fun
                "HOST": "mongodb://161.35.229.0:27017/sys_fun"
            },
            "token": {
                "SEED": "oe"
            },
            "menu": [{
                    "modulo": "Perfil y Organización",
                    "activo": true,
                    "subMenu": [{
                            "nombre": "Inicio",
                            "ruta": "/home",
                            "icono": "fa fa-home",
                            "ver": true,
                            "permisos": { "crear": true, "eliminar": true, "editar": true }
                        },
                        {
                            "nombre": "Perfil",
                            "ruta": "/perfil",
                            "icono": "fa fa-user",
                            "ver": true,
                            "permisos": { "crear": true, "eliminar": true, "editar": true }
                        },
                        {
                            "nombre": "Empresa",
                            "ruta": "/empresa",
                            "icono": "fa fa-institution",
                            "ver": true,
                            "permisos": { "crear": true, "eliminar": true, "editar": true }
                        }
                    ]
                },

                {
                    "modulo": "Administración",
                    "activo": true,
                    "subMenu": [{
                            "nombre": "Gestionar Usuarios",
                            "ruta": "/usuarios",
                            "icono": "fa fa-users",
                            "ver": true,
                            "permisos": { "crear": true, "eliminar": true, "editar": true }
                        },
                        {
                            "nombre": "Gestionar Convenios",
                            "ruta": "/convenios",
                            "icono": "fa fa-institution",
                            "ver": true,
                            "permisos": { "crear": true, "eliminar": true, "editar": true }
                        },
                        {
                            "nombre": "Gestionar Planes",
                            "ruta": "/planes",
                            "icono": "fa fa-book",
                            "ver": true,
                            "permisos": { "crear": true, "eliminar": true, "editar": true }
                        }
                    ]
                },

                {
                    "modulo": "Funcionalidades",
                    "activo": true,
                    "subMenu": [{
                        "nombre": "Gestionar Contratos",
                        "ruta": "/contratos",
                        "icono": "fa fa-book",
                        "ver": true,
                        "permisos": { "crear": true, "eliminar": true, "editar": true }
                    }]
                }
            ]

        };

        return desarrollo;

    }

    if (entorno === 'produccion') {

        var produccion = {
            "configBD": {
                "HOST": "mongodb://161.35.113.108:27017/sys_fun"
            },
            "token": {
                "SEED": "oe"
            }

        };

        return produccion;
    }

};

module.exports = config;