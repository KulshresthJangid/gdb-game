const UserModel = require('../models/UserModel');

class BalanceService {

    constructor() {
        this.userDB = UserModel;
    }

    async initiateRuleForNewUser(user) {
        // add bonus of 100 rs.
        let initialBonus = process.env.INITIAL_USER_BONUS;
        console.log('initial bonus', initialBonus);
        if(initialBonus) {
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
}

module.exports = new BalanceService();