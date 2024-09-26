import { AUTH_ROUTES } from '../Constants/APIs';

const express = require('express');
const router = express.Router();

export class AuthController {
    constructor() {
        this.router = router;
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post(AUTH_ROUTES.LOGIN, this.login);
        this.router.post(AUTH_ROUTES.REGISTER, this.register);
        this.router.get(AUTH_ROUTES.OTP_VERIFY, this.otpVerify);
        this.router.get(AUTH_ROUTES.TOKEN_VERIFY, this.verifyToken);
    }

    login(req, res) {
        const { email, password } = req.body;
    }
}