exports.up = function (knex) {
    return knex.schema
        .createTable('comentarios', function (tabela) {
            tabela.increments('id');
            tabela.string('comentario', 250);
            tabela.string('audio', 250);
        })
}

exports.down = function (knex) {
    return knex.schema
        .dropTable('comentarios');
}

exports.config = { transaction: false }