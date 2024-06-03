const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const bcrypt = require('bcrypt');

router.post('/Signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Verifica se o email já está em uso
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }

    // Hash da senha antes de salvar o usuário
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria um novo usuário com a senha hash
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cadastrar usuário', error: error.message });
  }
});

module.exports = router;
