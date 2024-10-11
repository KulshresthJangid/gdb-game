const { AMOUNT_OPERATIONS } = require('../Constants/APIs');
const UserModel = require('../models/UserModel');

class BalanceService {

    constructor() {
        this.userDB = UserModel;
    }

    async initiateRuleForNewUser(user) {
        let initialBonus = process.env.INITIAL_USER_BONUS;
        if (initialBonus) {
            user.balance = parseInt(initialBonus);
            console.log('user after', user);
            await this.userDB.save(user);
        }
    }

    async addBalanceToUser(userId, balance) {
        let user = await this.userDB.findById(userId);
        user.balance = user.balance + balance;
        await this.userDB.save(user);
    }

    async manageUserBalance(userId, amount, operationType) {
        let user = await this.userDB.findById(userId);
        switch (operationType) {
            case AMOUNT_OPERATIONS.ADD:
                user.balance += amount;
                break;
            case AMOUNT_OPERATIONS.DEDUCT:
                user.balance -= amount;
                break;
            default:
                console.log("No operation found for the user");
                throw new Error("Invalid Amount operation!!");
        }
        await this.userDB.save(user);
    }
}

module.exports = new BalanceService();