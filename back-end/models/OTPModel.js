const { TABLES } = require('../Constants/APIs');
const BaseModel = require('./BaseModel');

class OTPModel extends BaseModel {
    constructor() {
        super(TABLES.OTP);
    }

    async save(otpDoc) {
        try {
            console.log(otpDoc);
            this.db.insert({ ...otpDoc }).into(TABLES.OTP).onConflict("user_id").merge().then((result) => {
                return result;
            });
        } catch (err) {
            console.error("Error while saving the OTP", err);
            return;
        }
    }

    async getActiveOtpByUserId(userId) {
        try {
            const otpDoc = await this.db(TABLES.OTP).where({ user_id: userId, is_enabled: true }).first();
            return otpDoc;
        } catch (error) {
            console.error("Error while fetching the OTP doc", error);
            return null;
        }
    }


    async getActiveOtpByUserIdAndOTP(userId, otp) {
        try {
            const otpDoc = await this.db(TABLES.OTP).where({ user_id: userId, code: otp, is_enabled: true }).first();
            return otpDoc;
        } catch (error) {
            console.error("Error while fetching the OTP doc", error);
            return null;
        }
    }
}

module.exports = new OTPModel();