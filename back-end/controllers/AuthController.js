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
        if (otpDoc) {
            otpDoc.is_enabled = false;
            user.isVerfied = true;
            await OTPModel.save(otpDoc);
            await UserModel.save(user);
            res.status(201).send(new APIResponse(201, "User Verified successfully", null, true));
        } else {
            res.status(200).send(new APIResponse(400, "Please enter correct OTP!!", null, false));
            return;
        }
    }
}

module.exports = new AuthController().router;