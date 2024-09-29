const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASS
    }
});

const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'rulingtech2001@gmail.com',
    subject: 'Hello from Nodejs',
    html: '<h1>Your OTP is here 7878</h1>'
}

transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
        console.log("error while sending the email", err);
    } else {
        console.log("Email sent succuessfyully ", info.response);
    }
})

//https://stackoverflow.com/questions/39489229/pass-variable-to-html-template-in-nodemailer