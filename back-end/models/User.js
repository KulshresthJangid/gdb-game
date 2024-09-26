import { UUID } from "mongodb";
import { TABLES } from "../Constants/APIs";
import { getSqlInstance } from "../utils/dbs";

const uuidv4 = require('uuid');

class UserModel {
    constructor() {
        this.table = TABLES.USERS;
        this.db = getSqlInstance();
    }

    save(user) {
        return this.db.insert({ uuid: uuidv4(), ...user }).into(this.table);
    }

    findByEmail(email) {
        try {
            return this.db(TABLES.USERS).where({
                email
            });
        } catch (err) {
            console.log("Error while getting the user by email", err);
        }

    }
}

module.exports = new UserModel();