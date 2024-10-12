const { TABLES } = require("../Constants/APIs");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    knex.schema.hasTable(TABLES.TRANSACTIONS).then(exists => {
        if (!exists) {
            return knex.schema.createTable(TABLES.TRANSACTIONS, table => {
                table.increments('id').primary().notNullable();
                table.enum('type', ['DEPOSITED', 'WITHDRAW']).notNullable();
                table.boolean('is_approved').notNullable().defaultTo(false);
                table.integer('user_id').unsigned().notNullable();
                table.integer('approved_by').unsigned();
                table.string('txn_id').notNullable();
                table.integer('amount').notNullable().defaultTo(0);

                table.foreign('user_id').references('id').inTable(TABLES.USERS).onDelete('CASCADE');
                table.foreign('approved_by').references('id').inTable(TABLES.USERS).onDelete('CASCADE');
                table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
                table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
                table.boolean('is_enabled').notNullable().defaultTo(true);

            })
        }
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropSchemaIfExists(TABLES.TRANSACTIONS);
};
