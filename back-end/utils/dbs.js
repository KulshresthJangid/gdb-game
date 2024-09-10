const mysql = require('mysql');
const { MongoClient } = require('mongodb');


const { SQL_HOST, SQL_PASS, SQL_USER, SQL_DB_NAME, MONGO_URL, MONGO_DB_NAME } = process.env;

let mongoInstance = null;
const sqlDb = mysql.createConnection({
    host: SQL_HOST,
    user: SQL_USER,
    password: SQL_PASS,
    database: SQL_DB_NAME,
});

const mongoIntl = async () => {


    if (mongoInstance) return mongoInstance;
    const client = new MongoClient(MONGO_URL, {
        userNewUrlParser: true,
        userUnifiedTopology: true
    });
    await client.connect();
    console.log("Connected( to MongoDB Successfully");
    mongoInstance = client.db(dbName);
    return mongoInstance;
}

module.exports = {
    mongoIntl,
    getSqlInstance: () => sqlDb,
    getMongoInstance: () => mongoInstance
} 