const express = require('express')
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const cors = require("cors");
const app = express()
const port = 3000
app.use(cors())

//app.use(express.json())
// Middleware
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
app.use('/auth', authRoutes);
app.use('/auth', authRoutes);
app.use('/auth', authRoutes);

app.listen(port, () => {
  console.log(`Auth Server listening on port ${port}`)
})

