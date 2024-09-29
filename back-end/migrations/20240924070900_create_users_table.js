/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary().notNullable();
        table.string('uuid').notNullable();
        table.string('name').notNullable();
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
        table.enum('role', ['SUPER_ADMIN', 'SUPER_ADMIN_SUPPORT', 'PLAYER']).notNullable();
        table.boolean('isVerfied').notNullable().defaultTo(false);
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
        table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
        table.boolean('is_enabled').notNullable().defaultTo(true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('users');
};
