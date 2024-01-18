exports.up = knex => knex.schema.createTable('user_favorite_dishes', table => {
    table.increments('id').primary();
    table.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.integer('dish_id').references('id').inTable('dishes').onDelete('CASCADE');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable('user_favorite_dishes');
