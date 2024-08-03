
const { deleteProduct,allProducts,addProductDB,updateProduct } = require('../model/productModel');


const addProduct=async(req, res) => {
    try{
          if (!req.file) {
            return res.status(400).json({message: 'Picture not attached'});
          }
          console.log("File received",req.file.filename);
          const imageName = req.file.filename;
          const { name,price,quantity,description} = req.body;
          console.log("values of name, price,descrptin",name, price,quantity,description,imageName);
          const result = await addProductDB(name,price,quantity,description,imageName);
          res.status(200).json({message: 'Product Added Successfuly'});
        }
    catch (error)
      {
          console.log("error:",error);
          res.status(500).json({ message: 'Error adding product'});
      }
  }


module.exports = {addProduct};