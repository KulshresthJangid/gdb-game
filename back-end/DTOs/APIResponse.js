module.exports = class APIResponse {
    constructor(statusCode, message, body, success) {
        this.statusCode = statusCode;
        this.message = message;
        this.body = body;
        this.success = success;
    }
}