const mysql = require('mysql');
const bcrypt = require('bcrypt');
const generateOTP = require('../controller/otp');
const sendOTPEmail = require('../controller/sendEmail');
var jwt = require('jsonwebtoken');

const pool = mysql.createPool({       
  connectionLimit: 2,
  host     : 'localhost',
  user     : 'hina',
  password : 'hina',
  database : 'hina_db'
});
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
    pool.query('SELECT * from user WHERE email = ? ', [email], (error, results) => {
      if (error) {
        return reject(error);
      }
      if (results.length > 0) {
        resolve(results[0]);
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
    const result = await pool.query(insertQuery, [name, email, hashedPassword,token]);
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
// Function to Add New Product in DB
const addProductDB =async(name,price,description)=>{
  const addQuery = "INSERT INTO product (name,price,description) VALUES (?,?,?)";
  const result = await pool.query(addQuery,[name,price,description]);
  console.log("add product query result=",result);
  console.log("product detail in user model=",name,price,description);
  return {id:result.insertId};
}
// Retrieve all products
const allProducts = () => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * from product ORDER BY id DESC', (error, results) => {
      if (error) {
        return reject(error);
      }
      if (results.length > 0) {
        resolve(results);
      } else {
        resolve(null);
      }
    });
  });
};
module.exports = {
  checkUserExists,
  createUser,
  addProductDB,
  allProducts,
  checkEmailExists
};