import APIs, { AUTH_ROUTES } from '../Constants/APIs';

const express = require('express');
const router = express.Router();

router.post(AUTH_ROUTES.LOGIN, (req, res) => {

});

router.post(AUTH_ROUTES.REGISTER, (req, res) => {

});

router.post(AUTH_ROUTES.OTP_VERIFY, (req, res) => {

});

router.post(AUTH_ROUTES.TOKEN_VERIFY, (req, res) => {

})

export default router;