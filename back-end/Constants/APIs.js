const AUTH_ROUTES = {
    LOGIN: '/api/v1/login',
    REGISTER: '/api/v1/register',
    OTP_VERIFY: '/api/v1/otp-verify',
    TOKEN_VERIFY: '/api/v1/token-verify',
}

const OPEN_ROUTES = [AUTH_ROUTES.LOGIN, AUTH_ROUTES.REGISTER, AUTH_ROUTES.OTP_VERIFY]; 

const TABLES = {
    USERS: 'users',
    OTP: 'otp'
}

module.exports = {
    AUTH_ROUTES,
    TABLES,
    OPEN_ROUTES
}