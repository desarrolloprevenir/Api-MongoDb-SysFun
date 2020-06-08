var config = function configuracion(entorno) {

    if (entorno === 'desarrollo') {

        var desarrollo = {
            "configBD": {
                "HOST": "mongodb://localhost:27017/sys_fun"
            },
            "token": {
                "SEED": "oe"
            }

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