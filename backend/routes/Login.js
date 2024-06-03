const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const bcrypt = require('bcrypt');

router.post('/Login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Email not found' });
    }

    // Verificar se a senha está correta
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Retorna o userId se a autenticação for bem-sucedida
    res.status(200).json({ userId: user.userId });
  } catch (error) {
    res.status(500).json({ message: 'Error during login', error: error.message });
  }
});

module.exports = router;