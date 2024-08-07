
const { deleteProduct,allProducts,addProductDB,updateProduct,placeOrderDB } = require('../model/productModel');


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

const placeOrder=async(req,res)=>{
  try{
      const { name,phone,address,products} = req.body;
      console.log("values of name, price,descrptin",name,phone,address,products);
      for (const product of products) {
        const newQuantity=product.totalQuantity-product.orderedQuantity;
        console.log("new quantity=",newQuantity);
        const result = await placeOrderDB(product.id, newQuantity);
        console.log(result);  // Log the result of placeOrder
      }
        return res.status(200).json({message: 'Order successfully placed'});
    }
    catch(error)
    {
      console.log("place order error=",error);
      return res.status(500).json(error);
    } 
}


module.exports = {addProduct,placeOrder};