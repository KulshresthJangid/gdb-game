require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const randomstring = require('randomstring');

const generateAuthToken = async (user) => {
    return new Promise((resolve, reject) => {
        jwt.sign(user, process.env.JWT_KEY, { expiresIn: '1d' }, function (err, token) {
            if (err) {
                reject(err);
            } else {
                resolve(token);
            }
        })
    })
}

const validateAuthToken = async (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_KEY, function (err, result) {
            if (err) resolve(false);
            else resolve(true);
        })
    })
}

const getUserFromToken = async (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_KEY, function (err, decoded) {
            if (err) {
                console.log("Errror while validating token");
                reject(err);
            } else {
                resolve(decoded);
            }
        })
    })
}

const hashPassword = async (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {
                if (err) {
                    reject(err);
                } else {
                    resolve(hash);
                }
            })
        })
    })
}

const isCorrectPassword = async (password, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, function (err, res) {
            if (err) {
                console.log("Error while checking password", err);
                reject(err);
            } else {
                console.log("res, ", res)
                resolve(res);
            }
        })
    })
}

const generateOTP = () => {
    return randomstring.generate({
        length: 6,
        charset: 'numeric'
    })
}


module.exports = { generateAuthToken, getUserFromToken, hashPassword, isCorrectPassword, generateOTP, validateAuthToken }

