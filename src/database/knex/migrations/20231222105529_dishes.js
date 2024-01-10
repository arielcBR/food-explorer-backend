exports.up = knex => knex.schema.createTable('dishes', table => {
    table.increments('id').primary();
    table.text('name').notNullable();
    table.text('category').notNullable();
    table.decimal('price').notNullable();
    table.text('description');
    table.text('picture').defaultTo("");
});

exports.down = knex => knex.schema.dropTable('dishes');
