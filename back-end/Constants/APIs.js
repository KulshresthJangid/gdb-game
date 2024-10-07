const AUTH_ROUTES = {
    LOGIN: '/api/v1/login',
    REGISTER: '/api/v1/register',
    OTP_VERIFY: '/api/v1/otp-verify',
    TOKEN_VERIFY: '/api/v1/token-verify',
    RESEND_OTP: '/api/v1/resend-otp',
}

const OPEN_ROUTES = [AUTH_ROUTES.LOGIN, AUTH_ROUTES.REGISTER, AUTH_ROUTES.OTP_VERIFY, AUTH_ROUTES.RESEND_OTP];

const TABLES = {
    USERS: 'users',
    OTP: 'otp',
    TRANSACTIONS: 'transactions'
}

module.exports = {
    AUTH_ROUTES,
    TABLES,
    OPEN_ROUTES
}