'use strict'

//cargar modulos de node para crear servidores
var express = require('express');
var bodyParse = require('body-parser');

//Ejecutar express(http)
var app = express();

//cargar ficheros rutas
var article_routes = require('./routes/article');
// Middlewares
app.use(bodyParse.urlencoded({extended: false}));
app.use(bodyParse.json());

//CORS Acceso cruzado entre dominios
// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Añadir prefijos a rutas / cargar rutas
app.use('/api',article_routes);

//Exportar modulo(fichero actual)
module.exports = app;