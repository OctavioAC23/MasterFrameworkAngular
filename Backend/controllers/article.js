'use strict'

var validador = require('validator');

var fs = require('fs');
var path = require('path');
var Article = require('../models/article');

var controller = {
    datosCurso: (req, res) => {
        var hola = req.body.hola;

        return res.status(200).send({
            curso: 'Master en Frameworks JS',
            alumno: 'Octavio Alvarez',
            hola
        });
    },

    test: (req, res) => {
        return res.status(200).send({
            message: 'Soy la accion test de mi controlador de articulos'
        });
    },

    save: (req, res) => {
        //Recoger parametros por POST
        var params = req.body;

        //Validar datos(validador)
        try {
            var validate_title = !validador.isEmpty(params.title);
            var validate_content = !validador.isEmpty(params.content);

        } catch (err) {
            return res.status(400).send({
                status: 'error',
                message: 'Faltan datos por enviar'
            });
        }

        if (validate_title && validate_content) {
            //Crear el objeto a guardar
            var article = new Article();
            //Asignar valores
            article.title = params.title;
            article.content = params.content;
            if(article.image = true){
                article.image = params.image;
            }else{
                article.image = null;
            }
            // Guardar el artículo
            article.save()
                .then(() => {
                    return res.status(200).send({
                        status: 'success',
                        article: article
                    });
                }).catch(error => {
                    // console.error(error);
                    return res.status(404).send({
                        status: 'error',
                        message: 'El articulo no se ha guardado.'
                    });
                });

        } else {
            return res.status(200).send({
                status: 'error',
                message: 'Los datos no son validos'
            });
        }
    },

    getArticles: (req, res) => {

        var query = Article.find({});

        var last = req.params.last;

        if (last || last != undefined) {
            query.limit(5);
        }

        // Utilizamos solo el método find sin sort directamente
        query.find({})
            .then(articles => {
                if (!articles || articles.length === 0) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'No hay artículos para mostrar'
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    articles
                });
            })
            .catch(err => {
                console.error('Error al devolver los artículos:', err);
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al devolver los artículos'
                });
            });
    },

    getArticle: async (req, res) => {
        // Recoger el id de la URL
        var articleId = req.params.id;

        try {
            // Buscar el artículo por su id utilizando findOne y exec()
            const article = await Article.findOne({ _id: articleId }).exec();

            // Si no se encuentra el artículo, devolver un error 404
            if (!article) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe el artículo'
                });
            }

            // Devolver el artículo en formato JSON
            return res.status(200).send({
                status: 'success',
                article
            });
        } catch (error) {
            return res.status(500).send({
                status: 'error',
                message: 'Error al buscar el artículo'
            });
        }
    },

    update: async (req, res) => {
        try {
            // Recoger el id del artículo desde la URL
            const articleId = req.params.id;

            // Recoger los datos que llegan por PUT
            const { title, content } = req.body;

            // Validar datos
            if (!title || !content) {
                return res.status(400).send({
                    status: 'error',
                    message: 'El título y el contenido son obligatorios'
                });
            }

            // Buscar y actualizar el artículo
            const article = await Article.findByIdAndUpdate(articleId, { title, content }, { new: true });

            if (!article) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No se encontró el artículo para actualizar'
                });
            }

            return res.status(200).send({
                status: 'success',
                message: 'Artículo actualizado correctamente',
                article
            });
        } catch (error) {
            return res.status(500).send({
                status: 'error',
                message: 'Error al actualizar el artículo'
            });
        }
    },

    delete: async (req, res) => {
        // Recoger el id del artículo desde la URL
        try {
            const articleId = req.params.id;

            //find and delete
            const articleRemoved = await Article.findByIdAndDelete(articleId);

            if (!articleRemoved) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No se ha borrado el articulo, posiblemente no existe'
                });
            }

            return res.status(200).send({
                status: 'success',
                article: articleRemoved
            });

        } catch (err) {
            return res.status(500).send({
                status: 'error',
                message: 'Error al eliminar el artículo'
            });
        }
    },

    upload: async (req, res) => {
        try {
            // Configurar el módulo connect multiparty router/article.js

            // Recoger el fichero de la petición
            if (!req.files || !req.files.file0) {
                return res.status(404).send({
                    status: 'error',
                    message: 'Imagen no subida'
                });
            }

            // Obtener nombre y extensión del archivo
            const file_path = req.files.file0.path;
            const file_split = file_path.split('\\');

            // Nombre del archivo
            const file_name = file_split[file_split.length - 1];

            // Extension del archivo
            const file_ext = file_name.split('.').pop().toLowerCase();

            // Comprobar la extensión: solo imágenes permitidas
            const allowedExtensions = ['png', 'jpg', 'jpeg', 'gif'];
            if (!allowedExtensions.includes(file_ext)) {
                // Borrar el archivo no válido
                fs.unlink(file_path, (err) => {
                    if (err) {
                        console.error('Error al borrar el archivo:', err);
                    }
                    return res.status(400).send({
                        status: 'error',
                        message: 'La extensión de la imagen no es válida'
                    });
                });
            } else {
                const articleId = req.params.id;
                
                if (articleId) {
                    // Buscar el artículo y asignarle el nombre de la imagen
                    const articleUpdate = await Article.findByIdAndUpdate(articleId, { image: file_name }, { new: true });

                    if (!articleUpdate) {
                        return res.status(404).send({
                            status: 'error',
                            message: 'No se encontró el artículo'
                        });
                    }

                    return res.status(200).send({
                        status: 'success',
                        message: 'Imagen guardada correctamente',
                        article: articleUpdate
                    });
                }else{
                    return res.status(200).send({
                        status: 'success',
                        image: file_name
                    });
                }
            }
        } catch (error) {
            console.error('Error al subir la imagen:', error);
            return res.status(500).send({
                status: 'error',
                message: 'Error al subir la imagen'
            });
        }
    },

    getImage: async (req, res) => {
        try {
            var file = req.params.image;

            var path_file = './upload/articles/' + file;
            fs.access(path_file, fs.constants.F_OK, (err) => {
                if (err) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'La imagen no existe'
                    });
                }

                // Devolver la imagen si existe
                return res.sendFile(path.resolve(path_file));
            });
        } catch (error) {
            return res.status(500).send({
                status: 'error',
                message: 'Error al encontrar la imagen'
            });
        }
    },

    search: async (req, res) => {
        try {
            var search_string = req.params.search;
            const articles = await Article.find({
                $or: [
                    { title: { $regex: search_string, $options: 'i' } },
                    { content: { $regex: search_string, $options: 'i' } },
                ]
            })
                .sort({ date: 'desc' })
                .exec();

            if (!articles || articles.length === 0) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay artículos que coincidan con tu búsqueda'
                });
            }

            return res.status(200).send({
                status: 'success',
                articles
            });
        } catch (error) {
            return res.status(500).send({
                status: 'error',
                message: 'Error al buscar'
            });
        }
    }






}; //end controller

module.exports = controller;