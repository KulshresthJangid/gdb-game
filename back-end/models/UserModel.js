const { TABLES } = require("../Constants/APIs");
const { hashPassword } = require("../utils/authUtils");
const { getSqlInstance } = require("../utils/dbs");

const { v4: uuidv4 } = require('uuid');

class UserModel {
    constructor() {
        this.table = TABLES.USERS;
        this.db = getSqlInstance();
    }

    async save(user) {
        try {
            console.log(user)
            await this.db.insert({ ...user, uuid: uuidv4(), password: await hashPassword(user.password) }).into(this.table);
        } catch (error) {
            console.log("Error while saving user", error);
        }
    }

    findByEmail(email) {
        try {
            return this.db(TABLES.USERS).where({
                email
            }).first();
        } catch (err) {
            console.log("Error while getting the user by email", err);
        }

    }
}

module.exports = new UserModel();