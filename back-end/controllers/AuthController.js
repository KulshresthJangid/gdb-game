const { AUTH_ROUTES } = require('../Constants/APIs');
const BaseController = require('./BaseController')
const APIResponse = require('../DTOs/APIResponse');


const UserModel = require('../models/UserModel');
const { isCorrectPassword, generateAuthToken } = require('../utils/authUtils');

class AuthController extends BaseController {
    constructor() {
        super();
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
        const user = await UserModel.findByEmail(email);
        if (await isCorrectPassword(password, user.password)) {
            if (user.isVerfied) {
                res.status(200).send(new APIResponse(200, "User Logged In Successfully!!", { token: await generateAuthToken(user) }, true));
            } else {
                res.status(401).send(new APIResponse(401, "Pls Verify First!!", null, false));
            }
        } else {
            res.status(401).send(new APIResponse(401, "Invalid email or Password!!", null, false))
        }
    }

    async register(req, res) {
        let user = (({ name, email, password, role }) => ({ name, email, password, role }))(req.body);
        user = await UserModel.save(user);
        res.status(200).send(new APIResponse(200, "User registered successfully please Login!!", null, true));
    }

    async otpVerify(req, res) {
        let user = this.getUser(req);
        
    }
}

module.exports = new AuthController().router;