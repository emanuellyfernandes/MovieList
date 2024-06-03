const express = require('express');
const router = express.Router();
const User = require('../models/Users');

router.post('/Login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Email not found' });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    res.status(200).json({ userId: user.userId });
  } catch (error) {
    res.status(500).json({ message: 'Error during login', error: error.message });
  }
});

module.exports = router;
