const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.empresasPath = '/empresas';
        this.departamentosPath = '/departamentos';
        this.lidersPath = '/liders';
        this.empleadosPath = '/empleados';

        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio Público
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.empresasPath, require('../routes/empresas'));
        this.app.use(this.departamentosPath, require('../routes/departamentos'));
        this.app.use(this.lidersPath, require('../routes/liders'));
        this.app.use(this.empleadosPath, require('../routes/empleados'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}

module.exports = Server;