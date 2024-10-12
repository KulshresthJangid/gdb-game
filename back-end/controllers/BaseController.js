const { getUserFromToken } = require("../utils/authUtils");
const express = require('express');
const router = express.Router();

class BaseController {

    constructor() {
        this.router = router;
    }

    async getUser(req) {
        let token = '';
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            token = req.headers.authorization.split(' ')[1];
        }
        console.log("token", token)
        return await getUserFromToken(token);
    }
}

module.exports = BaseController;