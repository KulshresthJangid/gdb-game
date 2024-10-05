const { TABLES } = require("../Constants/APIs");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable(TABLES.OTP, table => {
        table.increments('id').primary().notNullable();
        table.foreign('user_id').references('id').inTable(TABLES.USERS);
        table.bigInteger('code').notNullable();
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
        table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
        table.boolean('is_enabled').notNullable().defaultTo(true);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropSchemaIfExists(TABLES.OTP);
};
