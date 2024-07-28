const bcrypt = require('bcrypt');
const generateOTP = require('../controller/otp');
const sendOTPEmail = require('../controller/sendEmail');
var jwt = require('jsonwebtoken');

const dbconnection = require('../db/db-config');
const dbpool = dbconnection();

// Function 'checkUserExists' verifies if the user exists

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
    //const insertQuery = 'INSERT INTO user (name,email, password,token) VALUES (?,?,?,?)';
      const result = await new Promise((resolve,reject)=>{
        dbpool.query('call addUser(?,?,?,?)',[name,email,hashedPassword,token],(error,result)=>{
          if(error){
            return reject(error);
          }
          else{
            //console.log("add product result=",result);
            return resolve(result);
          }
        });
    
      })
    //const result = await dbpool.query(insertQuery, [name, email, hashedPassword,token]);
    console.log("query result of signUp affected Rows=",result.affectedRows);
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
  const result = await new Promise((resolve,reject)=>{
    dbpool.query('call updatePassword(?,?)',[email,hashedPassword],(error,result)=>{
      if(error){
        return reject(error);
      }
      else{
        console.log("update pass result=",result);
        return resolve(result);
      }
    });

  })
  console.log("Update password result:",result);
  return result;
}
module.exports = {
  checkUserExists,
  createUser,
  checkEmailExists,
  resetPassword
};