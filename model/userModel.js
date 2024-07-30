const dbconnection = require('../db/db-config');
const dbpool = dbconnection();

//Check Email Exists 
const checkEmailExists = (email) => {
  return new Promise((resolve, reject) => {
    //dbpool.query('SELECT * from user WHERE email = ? ', [email], (error, results) => {
    dbpool.query('call getUserByEmail(?)',[email],(error,results)=>{
      console.log("procedure result",results);
      if (error) {
        console.log("error in checking mail",error);
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

// Function to create a new user
const createUser = async (name,email,hashedPassword,token) => {
  try {
    
    // Insert the new user into the database
    //const insertQuery = 'INSERT INTO user (name,email, password,token) VALUES (?,?,?,?)';
      const result = await new Promise((resolve,reject)=>{
        dbpool.query('call addUser(?,?,?,?)',[name,email,hashedPassword,token],(error,result)=>{
          if(error){
            return reject(error);
          }
          else{
            console.log("add user result=",result);
            return resolve(result);
          }
        });
      })
    // Return the inserted user
    return { name, email,token };
  
  } catch (error) {
    console.log("Some error here in DB",error);
    throw error; // Propagate any error
  }
};

// Function to Reset Password
const changePassword= async(email,hashedPassword)=>{
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
  createUser,
  checkEmailExists,
  changePassword
};