const express = require('express');
const { createUser,checkEmailExists,resetPassword } = require('../model/userModel');
const userRouter = express.Router();
var jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const generateOTP = require('../controller/otp');
const userController=require('../controller/userController');

//Route 01: Sign-in route
userRouter.post('/signin',userController.login);
//Route-02: Forgot Password route
userRouter.post('/forgot-password', userController.forgotPassword);

//Route-03: Reset Password route
userRouter.post('/reset-password',[
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must contain lower,upper,number and symbols of lenght 8 characters').isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  }),
], userController.resetPassword);

// Sign Up route to create the new user
userRouter.post('/signup',[
  body('name', 'Enter a valid name').isLength({ min: 5 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be lower,upper,number and symbols of lenght 8 characters').isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  }),
], userController.signup);

module.exports = userRouter;
