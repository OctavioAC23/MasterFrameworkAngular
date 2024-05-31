'use strict';

const mongoose = require('mongoose');
const app = require('./app');
const port = 3900;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/api_rest_blog', { useNewUrlParser: true })
    .then(() => {
        console.log("La conexión a la base de datos se realizó correctamente");
        
        // Crear servidor y ponerse a escuchar peticiones HTTP
        app.listen(port, () => {
            console.log('Servidor corriendo en http://localhost:' + port);
        });
    })
    .catch(error => {
        console.error('Error al conectar a la base de datos:', error);
    });
