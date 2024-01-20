exports.up = knex => knex.schema.createTable('dish_ingredients', table =>{
    table.increments('id').primary();
    table.integer('dish_id').references('id').inTable('dishes').onDelete('CASCADE');
    table.integer('ingredient_id').references('id').inTable('ingredients').onDelete('CASCADE');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable('dish_ingredients');
