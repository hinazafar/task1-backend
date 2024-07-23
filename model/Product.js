const dbconnection = require('../dbconnection');

const dbpool = dbconnection();

// Function to Add New Product in DB
const addProductDB =async(name,price,description,file)=>{

  const addQuery = "INSERT INTO product (name,price,description,picture) VALUES (?,?,?,?)";
  return new Promise((resolve,reject)=>{
    dbpool.query(addQuery,[name,price,description,file],(error,result)=>{
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
// Retrieve all products
const allProducts = () => {
  return new Promise((resolve, reject) => {
    dbpool.query('SELECT * from product ORDER BY id DESC', (error, results) => {
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
  addProductDB,
  allProducts,
};