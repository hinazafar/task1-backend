// src/sendEmail.js
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const generateOTP = require('./otp');

// Load environment variables from .env file
dotenv.config();
// Create transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

async function sendOTPEmail(email) {
    try {
        // Generate OTP
        const otp = await generateOTP();
        console.log("otp received in mail function=",otp);       

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
