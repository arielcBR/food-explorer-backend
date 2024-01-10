exports.up = knex => knex.schema.createTable('ingredients', table => {
    table.increments('id').primary();
    table.text('name').notNullable();

});

exports.down = knex => knex.schema.dropTable('ingredients');
