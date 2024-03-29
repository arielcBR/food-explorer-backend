exports.up = knex => knex.schema.createTable('order_dishes', table =>{
    table.increments('id').primary();
    table.integer('order_id').references('id').inTable('orders').notNullable();
    table.text('dish_id').notNullable();
    table.integer('quantity').notNullable();
    table.decimal('price').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
});


exports.down = knex => knex.schema.dropTable('order_dishes');
