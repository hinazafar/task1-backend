const mysql = require('mysql');
const bcrypt = require('bcrypt');
const util = require('util');


const pool = mysql.createPool({
  connectionLimit: 2,
  host     : 'localhost',
  user     : 'hina',
  password : 'hina',
  database : 'hina_db'
});
const checkUserExists = (email, password) => {
  return new Promise((resolve, reject) => {
    console.log(email, password);
    pool.query('SELECT * from user WHERE email = ? AND password = ?', [email, password], (error, results) => {
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
// Function to create a new user
const createUser = async (name,email, password) => {
  try {
    // Check if the email already exists
    console.log("Email Recived",email);
    const emailUser = await checkEmailExists(email);
    if (emailUser) {
      console.log("User Exists", emailUser);
      //throw new Error('Email already exists'); // Throw an error if email already exists
      return { message: "userExists" };
    }
    //console.log("Type of password",typeof password);
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Insert the new user into the database
    const insertQuery = 'INSERT INTO user (name,email, password) VALUES (?,?, ?)';
    const result = await pool.query(insertQuery, [name, email, hashedPassword]);

    // Return the inserted user
    return { id: result.insertId,name, email };
  
  } catch (error) {
    console.log("Some error here in DB",error);
    throw error; // Propagate any error
  }
};
module.exports = {
  checkUserExists,
  createUser
};