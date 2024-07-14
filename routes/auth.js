const express = require('express');
const { checkUserExists, createUser } = require('../model/User');

const router = express.Router();

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  console.log("Request received",req.body);
  try {
    const user = await checkUserExists(email, password);
    if (user) {
      
      res.json({ message: 'User exists', user });
      
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error checking user', error:error });
  }
});
// Sign Up route to create the new user
router.post('/signup', async (req, res) => {
  const { name,email, password } = req.body;

  console.log(req.body);
  try {
    const user = await createUser(name,email, password);
    if (user) {
      if(user.message === "userExists")
        res.status(401).json({ message: 'Duplicate user' });
      else
      res.status(200).json({ message: 'User Created', user });
    } 
  } catch (error) {
    res.status(500).json({ message: 'Error checking user', error });
  }
});

module.exports = router;
