exports.up = knex => knex.schema.createTable('orders', table =>{
    table.increments('id').primary();
    table.integer('user_id').references('id').inTable('users').notNullable();
    table.text('status').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
});



exports.down = knex => knex.schema.dropTable('orders');
