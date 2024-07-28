
const express = require('express');
const { allProducts,addProductDB } = require('../model/productModel');
const productRouter = express.Router();
var fetchuser = require('../middleware/fetchuser');


// Route to add new Product
productRouter.post('/add-product',fetchuser, async (req, res) => {

  try{
    const file = req.files.file;
    const { name,price,description} = req.body;
    if (file === null) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    console.log("file uploaded",file);
    // Insert product details into the database
    console.log("values of name, price,descrptin",name, price,description,file.name);
    const result = await addProductDB(name,price,description,file.data);
    res.status(200).json({message: 'Product Added Successfuly'});
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
    console.log("from product list function")
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

module.exports = productRouter;