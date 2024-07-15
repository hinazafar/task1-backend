const mysql = require('mysql');
const bcrypt = require('bcrypt');
const generateOTP = require('../controller/otp');
const sendOTPEmail = require('../controller/sendEmail');

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
// Function to create a new user
const createUser = async (name,email, password) => {
  try {
    // Check if the email already exists
    console.log("Email Recived",email);
    const emailUser = await checkEmailExists(email);
    if (emailUser) {
      console.log("User Exists", emailUser);
      return { message: "userExists" };
    }
    
    // Hash the password
    // const salt = await bcrypt.genSalt(10);
    //       console.log("salt=",salt);
    //       const hashedPassword = await bcrypt.hash(password, salt);

    const hashedPassword='';
    await bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
      // Store hash in your password DB.
      hashedPassword = hash;
  });
    //const hashedPassword = await bcrypt.hash(password, 10);
    // Insert the new user into the database
    const insertQuery = 'INSERT INTO user (name,email, password) VALUES (?,?, ?)';
    const result = await pool.query(insertQuery, [name, email, hashedPassword]);

    //Generate OTP here
    const otp = await generateOTP();
    // send otp to user Email
    sendOTPEmail(email,otp)

    // Return the inserted user
    return { id: result.insertId,name, email,otp };
  
  } catch (error) {
    console.log("Some error here in DB",error);
    throw error; // Propagate any error
  }
};
module.exports = {
  checkUserExists,
  createUser
};