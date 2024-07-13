const express = require('express');
const { checkUserExists } = require('../model/User');

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await checkUserExists(email, password);
    if (user) {
      res.json({ message: 'User exists', user });
    } else {
      res.status(401).json({ message: 'User does not exist or incorrect credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error checking user', error });
  }
});

module.exports = router;
