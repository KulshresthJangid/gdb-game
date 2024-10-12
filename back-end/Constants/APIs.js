const CORE_API = '/api/v1'

const AUTH_ROUTES = {
    LOGIN: CORE_API + '/login',
    REGISTER: CORE_API + '/register',
    OTP_VERIFY: CORE_API + '/otp-verify',
    TOKEN_VERIFY: CORE_API + '/token-verify',
    RESEND_OTP: CORE_API + '/resend-otp',
}

const TRANSACTION_ROUTES = {
    TRANSACTION: CORE_API + '/transaction'
}

const TRANSACTION_REQ = {
    ADD: 'ADD',
    UPDATE: 'UPDATE'

}

const OPEN_ROUTES = [AUTH_ROUTES.LOGIN, AUTH_ROUTES.REGISTER, AUTH_ROUTES.OTP_VERIFY, AUTH_ROUTES.RESEND_OTP];

const TABLES = {
    USERS: 'users',
    OTP: 'otp',
    TRANSACTIONS: 'transactions'
}

const AMOUNT_OPERATIONS = {
    ADD: 'add',
    DEDUCT: 'deduct'
}

module.exports = {
    AUTH_ROUTES,
    TABLES,
    OPEN_ROUTES,
    AMOUNT_OPERATIONS,
    TRANSACTION_ROUTES, TRANSACTION_REQ
}