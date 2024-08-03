const express = require('express')
const bodyParser = require('body-parser');
const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/userRoutes');
const fileUpload = require('express-fileupload');
const multer = require('multer');

const cors = require("cors");
const app = express()
const port = 3000
app.use(cors())
app.use('/uploads', express.static('uploads'));


// Enable files upload
//app.use(fileUpload());
 
//app.use(express.json())
// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/product',productRouter);
app.use('/api/auth',userRouter);

app.listen(port, () => {
  console.log(`Auth Server listening on port ${port}`)
})

