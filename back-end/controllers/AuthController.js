const { AUTH_ROUTES } = require('../Constants/APIs');
const APIResponse = require('../DTOs/APIResponse');


const UserModel = require('../models/UserModel');

const express = require('express');
const router = express.Router();

class AuthController {
    constructor() {
        this.router = router;
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post(AUTH_ROUTES.LOGIN, this.login);
        this.router.post(AUTH_ROUTES.REGISTER, this.register);
        // this.router.get(AUTH_ROUTES.OTP_VERIFY, this.otpVerify);
        // this.router.get(AUTH_ROUTES.TOKEN_VERIFY, this.verifyToken);
    }

    async login(req, res) {
        const { email, password } = req.body;
        console.log("sopmethign")
        const user = await UserModel.findByEmail(email);

        res.status(200).send(user);
    }

    async register(req, res) {
        let user = (({ name, email, password, role }) => ({ name, email, password, role }))(req.body);
        user = await UserModel.save(user);
        res.status(200).send(new APIResponse(200, "User registered successfully please Login!!", null, true));
    }
}

module.exports = new AuthController().router;