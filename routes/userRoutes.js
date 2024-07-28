const express = require('express');
const { checkUserExists, createUser,checkEmailExists,resetPassword } = require('../model/userModel');
const userRouter = express.Router();
var jwt = require('jsonwebtoken');
const generateOTP = require('../controller/otp');
const sendOTPEmail = require('../controller/sendEmail');
const { body, validationResult } = require('express-validator');

//Route 01: Sign-in route
userRouter.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await checkUserExists(email, password);
    if (user) {
      if(user.message === 'nopassMatched')
      {
        console.log("401 error Password Mis-match");
        res.status(401).json({ message: 'Invalid Passowrd' });
      }
      else
      {
        const data = {user:{id:user.userFound.id}};
        const authToken = jwt.sign(data,process.env.JWT_SECRET);
        console.log("Token:",authToken);
        const sendUser = Object.defineProperty(user.userFound, "token", {value:authToken});
        console.log("200 Found");
        res.status(200).json(sendUser );
      }
    } 
    else 
    {
      console.log("401 error Email Mismatch");
      res.status(401).json({ message: 'Invalid Email' });
    }
  } 
  catch (error) {
    res.status(500).json({ message: 'Internal server error', error:error });
  }
});
//Route-02: Forgot Password route
userRouter.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  console.log("Received email:",email);
  try {
    const user = await checkEmailExists(email);
    if (user) 
    {
      //Generate OTP here
      const otp = await generateOTP();
      // send otp to user Email
      sendOTPEmail(email,otp);
      console.log("Email Result:",user);
      console.log("200 Found");
      res.status(200).json({otp:otp,user} );
    } 
    else 
    {
      console.log("401 error Email Mismatch");
      res.status(401).json({ message: 'Invalid Email' });
    }
  } 
  catch (error) {
    res.status(500).json({ message: 'Internal server error', error:error });
  }
});
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
], async (req, res) => {
  const { email,password } = req.body;
  // If there are errors in validation, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {    
        const user = await resetPassword(email,password);
        console.log("affectedRows of update password=",user);
        if (user.affectedRows>0) 
        {
          console.log("200 Found");
          res.status(200).json({message:"Password Updated Successfuly"} );
        } 
        else 
        {
          console.log("401 error Email Mismatch");
          res.status(401).json({ message: 'Error: try again' });
        }
      } 
  catch (error) {
    res.status(500).json({ message: 'Error in password updating', error:error });
  }
});
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
], async (req, res) => {
  const { name,email, password } = req.body;
  // If there are errors in validation, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

    try {
    const user = await createUser(name,email, password);
    if (user) {
      if(user.message === "userExists")
        res.status(401).json({ message: 'Duplicate user' });
      else{
        console.log("User created",user);
        res.status(200).json(user);
    }
    } 
  } catch (error) {
    res.status(500).json({ message: 'Internal server error'});
  }
});

module.exports = userRouter;
