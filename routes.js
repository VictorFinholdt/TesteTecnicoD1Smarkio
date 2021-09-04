const comentariosController = require('./src/controllers/comentariosController')

const roteador = (app) => {
    app.post('/comentarios', comentariosController.criarComentario)
    app.get('/comentarios', comentariosController.mostrarComentarios)
    app.get('/comentarios/:id', comentariosController.mostrarComentario)
    app.delete('/comentarios/:id', comentariosController.deletarComentario)
    app.get('/comentarios/ouvir/:id', comentariosController.ouvir)
    return app
}

module.exports = { roteador }