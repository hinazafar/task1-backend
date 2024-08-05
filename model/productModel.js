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
        //console.log(results);
        resolve(results);
      } else {
        resolve(null);
      }
    });
  });
};
// Delete a  product
const deleteProduct = (id) => {
  return new Promise((resolve, reject) => {
    dbpool.query('call deleteProduct(?)',[id], (error, results) => {
      if (error) {
        console.log("in delete product db function",error);
        return reject(error);
      }
      if (results) {
        console.log("Delete product result",results);
        resolve(results);
      } else {
        resolve(null);
      }
    });
  });
};
// Function to Add New Product in DB
const addProductDB =async(name,price,quantity,description,picture)=>{

  // const addQuery = "INSERT INTO product (name,price,description,picture) VALUES (?,?,?,?)";
  // this is using db procedure
  console.log("picture name in model =",picture);
  return new Promise((resolve,reject)=>{
    dbpool.query('call addProduct(?,?,?,?,?)',[name,price,quantity,description,picture],(error,result)=>{
      if(error){
        return reject(error);
      }
      else{
        console.log("add product with picture result=",result);
        return resolve(result);
      }
    });
  })
}
//Update Product
// Function to Update Product in DB
const updateProduct =async(id,name,price,quantity,description,file)=>{

  console.log("length of picture=",file.length);
  return new Promise((resolve,reject)=>{
    dbpool.query('call updateProduct(?,?,?,?,?,?)',[id,name,price,quantity,description,file],(error,result)=>{
      if(error){
        return reject(error);
      }
      else{
        console.log("updated product result=",result);
        return resolve(result);
      }
    });
  })
}
//To update product with out picture
const updateProductWithoutPic =async(id,name,price,quantity,description)=>{
  return new Promise((resolve,reject)=>{
    dbpool.query('call updateProductWithoutPicture(?,?,?,?,?)',[id,name,price,quantity,description],(error,result)=>{
      if(error){
        return reject(error);
      }
      else{
        console.log("updated product result=",result);
        return resolve(result);
      }
    });
  })
}

//Place order
// Place order
const placeOrderDB =async(id,newQuantity)=>{
  return new Promise((resolve,reject)=>{
    dbpool.query('update product set quantity=? where id =?',[newQuantity,id],(error,result)=>{
      if(error){
        return reject(error);
      }
      else{
        //console.log("updated product result=",result);
        return resolve(result);
      }
    });
  })
}

module.exports = {
  deleteProduct,
  allProducts,
  addProductDB,
  updateProduct,
  updateProductWithoutPic,
  placeOrderDB
};