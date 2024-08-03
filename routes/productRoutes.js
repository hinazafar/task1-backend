const express = require('express');
const multer = require('multer');
const mysql = require('mysql');
const path = require('path');
const fs = require('fs');
const { deleteProduct,allProducts,updateProduct,updateProductWithoutPic } = require('../model/productModel');
const productRouter = express.Router();
var fetchuser = require('../middleware/fetchuser');
const productController=require('../controller/productController');

// Set up multer for file handling
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');                                  
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Endpoint to handle image upload and save image path in database
productRouter.post('/add-product',upload.single('file'),productController.addProduct);
// productRouter.post('/add-product', fetchuser,upload.single('file'), async(req, res) => {
//   try{
//         if (!req.file) {
//           return res.status(400).json({message: 'Picture not attached'});
//         }
//         console.log("File received",req.file.filename);
//         const imageName = req.file.filename;
//         const { name,price,quantity,description} = req.body;
//         console.log("values of name, price,descrptin",name, price,quantity,description,imageName);
//         const result = await addProductDB(name,price,quantity,description,imageName);
//         res.status(200).json({message: 'Product Added Successfuly'});
//       }
//   catch (error)
//     {
//         console.log("error:",error);
//         res.status(500).json({ message: 'Error adding product'});
//     }
// });

productRouter.post('/update-product-without-picture', upload.none(),async (req, res) => {
  try{
    const {id, name,price,quantity,description} = req.body;
    console.log("values of name, price,descrptin",req.body,name, price,quantity,description);
    const result = await updateProductWithoutPic(id,name,price,quantity,description);
    if(result.affectedRows>0)
      res.status(200).json({message: 'Product Updated Successfuly'});
    else
    res.status(404).json({message: 'Product Not Found'});
  }
  catch (error) {
    console.log("error:",error);
    res.status(500).json({ message: 'Error adding product'});
  }
});
///
productRouter.post('/update-product',upload.single('file'), async (req, res) => {
  try{
    if (!req.file) {
      return res.status(400).json({message: 'Picture not attached'});
    }
    console.log("File received",req.file.filename);
    const imageName = req.file.filename;
    const { id,name,price,quantity,description} = req.body;
    console.log("values of name, price,descrptin",name, price,quantity,description,imageName);
    const result = await updateProduct(id,name,price,quantity,description,imageName);
    res.status(200).json({message: 'Product Updated Successfuly'});
  }
  catch (error) {
    console.log("error:",error);
    res.status(500).json({ message: 'Error adding product'});
  }
});

//Endpoint to Get Products List
productRouter.get('/products',async (req,res)=>{
  try{
    const list = await allProducts();
    //console.log("from product list function")
    if(list)
    {
      //console.log("list received",list);
      res.status(200).json(list);
    }
    else
      res.status(404).json({message:"No product found"});
  }
  catch (error) {
    res.status(500).json({ message: 'Error fetching products'});
  }
});

//Endpoint to Delete a Product
productRouter.post('/deleteProduct',async (req,res)=>{
  try{
    const {id} = req.body;
    const deleted = await deleteProduct(id);
    console.log("from delete product function result",deleted.affectedRows);
    if(deleted.affectedRows>0)
    {
      //console.log("list received",list);
      res.status(200).json({message:"deleted"});
    }
    else
      res.status(404).json({message:"Product not found"});
  }
  catch (error) {
    res.status(500).json({ message: 'Error fetching products'});
  }
});

module.exports = productRouter;