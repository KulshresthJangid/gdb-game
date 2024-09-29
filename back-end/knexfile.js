// Update with your config settings.

const mdb = require('knex-mariadb');

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
    development: {
        client: mdb,
        connection: {
            database: 'bettingDB',
            user: 'root',
            password: 'root',
            host: 'localhost',
            port: '3309'
        },
        pool: { min: 2, max: 20 }
    },
    staging: {
        client: 'mysql',
        connection: {
            database: 'bettingDB',
            user: 'root',
            password: 'root'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    },
    production: {
        client: 'mysql',
        connection: {
            database: 'bettingDB',
            user: 'root',
            password: 'root'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    }

};
