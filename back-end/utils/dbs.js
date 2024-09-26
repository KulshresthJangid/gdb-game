const { MongoClient } = require('mongodb');
const connection = require('../knexfile');


const { MONGO_URL, MONGO_DB_NAME } = process.env;

let mongoInstance = null;

const knex = require('knex')(connection[process.env.NODE_ENV || 'development']);

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

const checkSQLConnection = () => {
    knex.raw('SELECT 1').then(() => {
        console.log('SQL Connection established Successfully!');
    }).catch((err) => {
        console.error('Failed to Establish SQL Connection Error: ', err)
    }).finally(() => {
        knex.destroy();
    })
}

module.exports = {
    mongoIntl,
    getSqlInstance: () => knex,
    getMongoInstance: () => mongoInstance,
    checkConection: checkSQLConnection
}