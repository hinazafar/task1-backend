const mysql = require('mysql');
const bcrypt = require('bcrypt');
const generateOTP = require('../controller/otp');
const sendOTPEmail = require('../controller/sendEmail');
var jwt = require('jsonwebtoken');

const dbconnection = require('../dbconnection');
const dbpool = dbconnection();

const checkUserExists = async(email, password) => {
  const userFound = await checkEmailExists(email);
  if (!userFound) {
    console.log("Email Mis-match");
    return null;
  }
  // If user is found, compare the password with the hashed password
  else 
  {
    const isHashTrue = await checkHash(password,userFound.password);
    if(isHashTrue)
    {
      return {message:"passMatched", userFound};
    }
    else
      return {message:"nopassMatched"};
  }
};
//Check Email Exists 
const checkEmailExists = (email) => {
  return new Promise((resolve, reject) => {
    //dbpool.query('SELECT * from user WHERE email = ? ', [email], (error, results) => {
    dbpool.query('call getUserByEmail(?)',[email],(error,results)=>{
      console.log("procedure result",results);
      if (error) {
        return reject(error);
      }
      // The results structure in case of procedure is [[results[0]],{}]
      if (results[0].length > 0) {
        resolve(results[0][0]);
      } else {
        resolve(null);
      }
    });
  });
};
//Compare Hash Function
async function checkHash(userPassword, hashPassword) {
  const match = await bcrypt.compare(userPassword, hashPassword);
  if(match)
    return true;
  else
    return false;
}
// Generate Hashed Password
async function hashPassword(password) {
  try {
      const hashedPassword = await bcrypt.hash(password, 10);
      // Store hashedPassword in your password DB
      return hashedPassword;
  } catch (err) {
      console.error('Error hashing password:', err);
      throw err; // Or handle the error as appropriate
  }
}

// Function to create a new user
const createUser = async (name,email, password) => {
  try {
    // Check if the email already exists
    console.log("Email Recived",email);
    const emailUser = await checkEmailExists(email);
    console.log("after email checking",emailUser)
    if (emailUser) 
    {
      console.log("User Exists", emailUser);
      return { message: "userExists" };
    }
    const data = {user:{email:email}};
    const token = await jwt.sign(data,process.env.JWT_SECRET);
    console.log("sign up token",token);
    const hashedPassword = await hashPassword(password);
    console.log("Hashed Passowrd Generated",hashedPassword);
    // Insert the new user into the database
    const insertQuery = 'INSERT INTO user (name,email, password,token) VALUES (?,?,?,?)';
    const result = await dbpool.query(insertQuery, [name, email, hashedPassword,token]);
    console.log("query result of signUp=",result);

    //Generate OTP here
    const otp = await generateOTP();
    // send otp to user Email
    sendOTPEmail(email,otp);

    // Return the inserted user
    return { id: result.insertId,name, email,otp,token };
  
  } catch (error) {
    console.log("Some error here in DB",error);
    throw error; // Propagate any error
  }
};

// Function to Reset Password
const resetPassword= async(email,password)=>{
  const hashedPassword = await hashPassword(password);
  console.log("Hashed Passowrd Generated",hashedPassword);
  const query = 'UPDATE user SET password = ? WHERE email = ?';
  const values = [hashedPassword, email];
  
  return new Promise((resolve,reject)=>{
    dbpool.query(query, values,(err,result)=>{
      if(err)
      {
          console.log("insert error=",err)
          reject({msg:err});
      }
      else
      { 
          console.log("Data inserted=",result);
          resolve(result);
      }
  });
  })
  
}
module.exports = {
  checkUserExists,
  createUser,
  checkEmailExists,
  resetPassword
};