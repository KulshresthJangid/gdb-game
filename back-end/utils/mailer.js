const nodemailer = require('nodemailer');
const { generateOTP } = require('./authUtils');
const OTPModel = require('../models/OTPModel');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASS
    }
});

const sendOTPEmail = async (toUser) => {
    let otp = generateOTP();
    let otpDoc = {user_id: toUser.id, code: otp};
    await OTPModel.save(otpDoc);
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: toUser.email,
        subject: 'Hello from Nodejs',
        html: `<h1>Your OTP is here ${otp}</h1>`
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log("error while sending the email", err);
        } else {
            console.log("Email sent succuessfyully ", info.response);
        }
    });
};

module.exports = { sendOTPEmail }

//https://stackoverflow.com/questions/39489229/pass-variable-to-html-template-in-nodemailer