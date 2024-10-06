const { AUTH_ROUTES } = require('../Constants/APIs');
const BaseController = require('./BaseController')
const APIResponse = require('../DTOs/APIResponse');


const UserModel = require('../models/UserModel');
const { isCorrectPassword, generateAuthToken, hashPassword } = require('../utils/authUtils');
const OTPModel = require('../models/OTPModel');
const { sendOTPEmail } = require('../utils/mailer');

class AuthController extends BaseController {
    constructor() {
        super();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post(AUTH_ROUTES.LOGIN, this.login);
        this.router.post(AUTH_ROUTES.REGISTER, this.register);
        this.router.post(AUTH_ROUTES.OTP_VERIFY, this.otpVerify);
        // this.router.get(AUTH_ROUTES.TOKEN_VERIFY, this.verifyToken);
        this.router.get(AUTH_ROUTES.RESEND_OTP, this.resendOTP);
    }

    async login(req, res) {
        const { email, password } = req.body;
        const user = await UserModel.findByEmail(email);

        if (!user) {
            return res.status(401).send(new APIResponse(401, "Invalid email or Password!!", null, false));
        }

        console.log("Stored user password hash:", user.password);

        if (await isCorrectPassword(password, user.password)) {
            if (user.isVerfied) {
                const token = await generateAuthToken(user);
                return res.status(200).send(new APIResponse(200, "User Logged In Successfully!!", { token }, true));
            } else {
                return res.status(401).send(new APIResponse(401, "Please Verify First!!", null, false));
            }
        } else {
            return res.status(401).send(new APIResponse(401, "Invalid email or Password!!", null, false));
        }
    }

    async register(req, res) {
        let user = (({ name, email, password, role }) => ({ name, email, password, role }))(req.body);
        user = await UserModel.save(user);
        await sendOTPEmail(user);
        res.status(200).send(new APIResponse(200, "User registered successfully please Login!!", null, true));
    }

    async otpVerify(req, res) {
        let { otp, email } = req.body;
        let user = await UserModel.findByEmail(email);
        let otpDoc = await OTPModel.getActiveOtpByUserIdAndOTP(user.id, otp);
        console.log("otpDoc", otpDoc);
        if (otpDoc !== undefined) {
            otpDoc.is_enabled = false;
            user.isVerfied = true;
            await OTPModel.save(otpDoc);
            await UserModel.save(user);
            res.status(201).send(new APIResponse(201, "User Verified successfully", null, true));
            return;
        } else {
            res.status(200).send(new APIResponse(400, "Please enter correct OTP!!", null, false));
            return;
        }
    }

    async resendOTP(req, res) {
        let { userId, email } = req.query;
        console.log("Request params", req)
        let user;
        if (userId) {
            user = await UserModel.findById(userId);
        } else if (email) {
            user = await UserModel.findByEmail(email);
        } else {
            return res.status(400).send(new APIResponse(400, "Please provide email or userID!!", null, false));
        }
        if (!user) {
            return res.status(404).send(new APIResponse(404, "User not found!!", null, false));
        }
        console.log("user0000", user)
        if (user.isVerfied) {
            return res.status(200).send(new APIResponse(200, "User email is already verified!!", null, true));
        }
        let otp = await OTPModel.getActiveOtpByUserId(user.id);
        otp.is_enabled = false;
        await OTPModel.save(otp);
        await sendOTPEmail(user);
        return res.status(200).send(new APIResponse(200, "OTP sent successfully!!", null, true));
    }
}

module.exports = new AuthController().router;