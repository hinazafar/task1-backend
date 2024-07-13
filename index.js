const express = require('express')
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const app = express()
const port = 3000

//app.use(express.json())
// Middleware
app.use(bodyParser.json());

// Routes
app.use('/signin', authRoutes);

app.listen(port, () => {
  console.log(`Auth Server listening on port ${port}`)
})

