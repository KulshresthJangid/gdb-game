const { TRANSACTION_ROUTES } = require("../Constants/APIs");
const APIResponse = require("../DTOs/APIResponse");
const TransactionService = require("../services/TransactionService");
const BaseController = require("./BaseController");

class TransactionController extends BaseController {
    constructor() {
        super();
        this.initializeRoutes();
        this.transaction = this.transaction.bind(this);
    }

    async initializeRoutes() {
        this.router.post(TRANSACTION_ROUTES.TRANSACTION, this.transaction);
    }

    async transaction(req, res) {
        let user = req.user;
        let { operationType, txnId, amount, txnType } = req.body;
        let txnReq = { operationType, txnId, amount, txnType, user_id: user.id };
        let txn = await TransactionService.transaction(txnReq);
        res.status(200).send(new APIResponse(200, "Transaction Completed!!", txn, true));
    }
}

module.exports = new TransactionController().router;