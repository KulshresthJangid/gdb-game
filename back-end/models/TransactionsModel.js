const { TABLES } = require("../Constants/APIs");
const BaseModel = require("./BaseModel");

class TransactionsModel extends BaseModel {
    constructor() {
        super(TABLES.TRANSACTIONS);
    }

    async save(txn) {
        await this.db(this.table).insert({...txn}).onConflict('id').merge().then(result => {
            this.db(this.table).where('id', result[0]).then(data => {
                console.log(data);
                return data;
            })
        });
    }
}

module.exports = new TransactionsModel();