const express = require('express')
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const fileUpload = require('express-fileupload');
const cors = require("cors");
const app = express()
const port = 3000
app.use(cors())

// Enable files upload
app.use(fileUpload());

//app.use(express.json())
// Middleware
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);

app.listen(port, () => {
  console.log(`Auth Server listening on port ${port}`)
})

