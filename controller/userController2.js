const crypto = require('crypto');
const mysql= require("mysql");
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');


// Load environment variables from .env file
dotenv.config();

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


// Create transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

async function sendOTPEmail(email,otp) {
    try {         

        // Email content
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your OTP for Verification',
            text: `Your OTP is ${otp}. Please use this OTP to verify your email.`
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

module.exports = sendOTPEmail;


module.exports = {
  sendOTPEmail,
  generateOTP
};