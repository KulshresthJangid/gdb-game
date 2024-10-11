const { TABLES } = require("../Constants/APIs");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.alterTable(TABLES.USERS, (table) => {
        table.bigint('balance').after('role').notNullable().defaultTo(0);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.alterTable(TABLES.USERS, (table) => {
        table.dropColumn('balance');
    })
};
