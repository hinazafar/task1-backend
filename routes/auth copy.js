const express = require('express');
const { checkUserExists, createUser,checkEmailExists,resetPassword } = require('../model/User');
const {addProductDB, allProducts } = require('../model/Product');
const router = express.Router();
var jwt = require('jsonwebtoken');
const generateOTP = require('../controller/otp');
const sendOTPEmail = require('../controller/sendEmail');
var fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const cors = require('cors');
//Route 01: Sign-in route
router.post('/signin', async (req, res) => {
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
router.post('/forgot-password', async (req, res) => {
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
router.post('/reset-password',[
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
router.post('/signup',[
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

// Add Product route to add new Product
router.post('/add-product',fetchuser, async (req, res) => {

  try{
    const file = req.files.file;
    const { name,price,description} = req.body;
    if (file === null) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    console.log("file uploaded",file);
    // Insert product details into the database
    console.log("values of name, price,descrptin",name, price,description,file.name);
    const result = await addProductDB(name,price,description,file.data);
    res.status(200).json({message: 'Product Added Successfuly'});
  }
  catch (error) {
    console.log("error:",error);
    res.status(500).json({ message: 'Error adding product'});
  }
});
//Get Products List
router.get('/products',async (req,res)=>{
  try{
    const list = await allProducts();
    if(list)
    {
      //console.log("list received",list);
      res.status(200).json(list);
    }
    else
      res.status(404).json({message:"No product found"});
  }
  catch (error) {
    res.status(500).json({ message: 'Error fetching products'});
  }
});

//Get Products List
router.get('/test', fetchuser ,async (req,res)=>{
  try{
    const list = await allProducts();
    if(list)
    {
      //console.log("list received",list);
      res.status(200).json(list);
    }
    else
      res.status(404).json({message:"No product found"});
  }
  catch (error) {
    res.status(500).json({ message: 'Error fetching products'});
  }
});

module.exports = router;
