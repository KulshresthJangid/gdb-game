const mysql = require('mysql');
const { MongoClient } = require('mongodb');


const { SQL_HOST, SQL_PASS, SQL_USER, SQL_DB_NAME, SQL_PORT, MONGO_URL, MONGO_DB_NAME } = process.env;

let mongoInstance = null;

const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: SQL_HOST,
        user: SQL_USER,
        password: SQL_PASS,
        database: SQL_DB_NAME,
        port: SQL_PORT,
    },
    pool: { min: 0, max: 7 }
})

const mongoIntl = async () => {
    try {
        if (mongoInstance) return mongoInstance;
        const client = new MongoClient(MONGO_URL);
        await client.connect();
        console.log("Connected( to MongoDB Successfully");
        mongoInstance = client.db(MONGO_DB_NAME);
        return mongoInstance;
    } catch (error) {
        console.log("Error while trying to connect to mongodb", error)
    }
}

module.exports = {
    mongoIntl,
    getSqlInstance: () => knex,
    getMongoInstance: () => mongoInstance
} 