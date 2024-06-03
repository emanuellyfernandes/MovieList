const express = require('express');
const router = express.Router();
const User = require('../models/Users');

// Rota para cadastro de usuário
router.post('/Signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Verifica se o email já está em uso
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }
    // Cria um novo usuário
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cadastrar usuário', error: error.message });
  }
});

module.exports = router;