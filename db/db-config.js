const mysql= require("mysql"); 
require("dotenv").config();

const dbconnection =()=>{
  const dbpool = mysql.createPool({       
    connectionLimit: 20,
    host     : process.env.DBHOST,
    user     : process.env.DBUSER,
    password : process.env.DBPASSWORD,
    database : process.env.DATABASE
   
  });
  return dbpool;
}


module.exports = dbconnection;
 