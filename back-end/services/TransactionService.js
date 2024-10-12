const { TRANSACTION_REQ } = require("../Constants/APIs");
const TransactionsModel = require("../models/TransactionsModel");

class TransactionService {
    constructor() {

    }

    async transaction(txnReq) {
        let txn;
        console.log("tanxReq    ", txnReq)
        try {
            switch (txnReq.operationType) {
                case TRANSACTION_REQ.ADD.toString():
                    txn = {
                        type: txnReq.txnType,
                        user_id: txnReq.user_id,
                        amount: txnReq.amount,
                        is_approved: false,
                        txn_id: txnReq.txnId
                    }

                    txn = await TransactionsModel.save(txn);
                    console.log("add")
                    break;
                case TRANSACTION_REQ.UPDATE:
                    console.log("Update");
                    txn = await TransactionsModel.save(txn);
                default:
                    console.log("here")
                    break;
            }
        } catch (error) {
            throw new Error("Error while making a transaction: "+ error)
        }
    }
}

module.exports = new TransactionService();