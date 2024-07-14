// src/utils/otp.js
const crypto = require('crypto');
const mysql= require("mysql");
require("dotenv").config(); 

function generateOTP() {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(3, function(err, buffer) {
            if (err) {
                reject(err);
            } else {
                const otp = parseInt(buffer.toString('hex'), 16).toString().substr(0, 6);
                resolve(otp);
            }
        });
    });
}

module.exports = generateOTP;
