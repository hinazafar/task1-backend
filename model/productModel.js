const dbconnection = require('../db/db-config');
const dbpool = dbconnection();


// Retrieve all products
const allProducts = () => {
  return new Promise((resolve, reject) => {
    dbpool.query('call getallproduct()', (error, results) => {
    //dbpool.query('select * from product order by id', (error, results) => {
      if (error) {
        console.log("in product function",error);
        return reject(error);
      }
      if (results.length > 0) {
        console.log(results);
        resolve(results);
      } else {
        resolve(null);
      }
    });
  });
};
// Function to Add New Product in DB
const addProductDB =async(name,price,description,file)=>{

  // const addQuery = "INSERT INTO product (name,price,description,picture) VALUES (?,?,?,?)";
  // this is using db procedure
  console.log("length of picture=",file.length);
  return new Promise((resolve,reject)=>{
    dbpool.query('call addproduct(?,?,?,?)',[name,price,description,file],(error,result)=>{
      if(error){
        return reject(error);
      }
      else{
        console.log("add product result=",result);
        return resolve(result);
      }
    });
  })
}
module.exports = {
  allProducts,
  addProductDB
};