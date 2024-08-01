const express = require('express');
const { deleteProduct,allProducts,addProductDB,updateProduct } = require('../model/productModel');
const productRouter = express.Router();
var fetchuser = require('../middleware/fetchuser');

// Route to add new Product
productRouter.post('/add-product',fetchuser, async (req, res) => {

  try{
    const file = req.files.file;
    //const file = req.file.buffer;
    const { name,price,quantity,description} = req.body;
    if (file === null) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    console.log("file uploaded",file);
    // Insert product details into the database
    console.log("values of name, price,descrptin",name, price,quantity,description,file.name);
    const result = await addProductDB(name,price,quantity,description,file.data);
    //const result = await addProductDB(name,price,quantity,description,file);
    res.status(200).json({message: 'Product Added Successfuly'});
  }
  catch (error) {
    console.log("error:",error);
    res.status(500).json({ message: 'Error adding product'});
  }
});
// Route to Update Product
productRouter.post('/update-product',fetchuser, async (req, res) => {
  try{
    console.log("file received", req.body.picture);
    //const file = req.files.file;
    
    const { id,name,price,quantity,description,picture} = req.body;
    if (picture === null) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    // Insert product details into the database
    console.log("values of name, price,descrptin",name, price,quantity,description);
    const result = await updateProduct(id,name,price,quantity,description,picture);
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