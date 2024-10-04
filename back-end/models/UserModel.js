
const { hashPassword } = require("../utils/authUtils");

const { v4: uuidv4 } = require('uuid');
const BaseModel = require("./BaseModel");
const { TABLES } = require("../Constants/APIs");

class UserModel extends BaseModel {
    constructor() {
        super(TABLES.USERS);
    }

    async save(user) {
        try {
            console.log(user)
            await this.db.insert({ ...user, uuid: uuidv4(), password: await hashPassword(user.password) }).into(this.table);
        } catch (error) {
            console.log("Error while saving user", error);
        }
    }

    async findByEmail(email) {
        try {
            const user = await this.db(TABLES.USERS).where({ email }).first();
            if (user) {
                this.convertToBooleans(user);
                return user;
            }
        } catch (err) {
            console.log("Error while getting the user by email", err);
        }

    }
}

module.exports = new UserModel();