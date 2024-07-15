const express = require('express');
const { checkUserExists, createUser } = require('../model/User');
const router = express.Router();
//Sign-in route
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await checkUserExists(email, password);
    if (user) {
      if(user.message === 'nopassMatched')
      {
        console.log("401 error Password Mis-match");
        //res.status(401).json({ message: 'Invalid Passowrd' });
        //Dummmy login data
        res.status(200).json({ message: 'User exists',name:'Hina',email:'hina.nida@gmail.com'} );
      }
      else
      {
        console.log("200 Found");
        res.status(200).json({ message: 'User exists'}, user.userFound );
      }
    } 
    else 
    {
      console.log("401 error Email Mismatch");
      res.status(401).json({ message: 'Invalid Email' });
    }
  } 
  catch (error) {
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
