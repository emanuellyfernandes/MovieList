const express = require('express');
const router = express.Router();
const Profile = require('../models/Profiles'); // Importe o modelo de Profile
const User = require('../models/Users'); // Importe o modelo de User

// Rota para obter todos os perfis de um usuário específico
router.get('/profiles/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const profiles = await Profile.find({ userId });
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter perfis', error: error.message });
  }
});

// Rota para criar um novo perfil
router.post('/profiles', async (req, res) => {
    const { userId, name, description } = req.body;
  
    try {
      // Verificar se o usuário já possui 4 perfis
      const profilesCount = await Profile.countDocuments({ userId });
      if (profilesCount >= 4) {
        return res.status(400).json({ message: 'Você só pode criar no máximo 4 perfis.' });
      }
  
      const newProfile = new Profile({ userId, name, description });
      await newProfile.save();
      res.status(201).json(newProfile);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar perfil', error: error.message });
    }
  });

  // Rota para deletar um novo perfil
  router.delete('/profiles/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const profile = await Profile.findByIdAndDelete(id);
      if (!profile) {
        return res.status(404).json({ message: 'Perfil não encontrado' });
      }
      res.status(200).json({ message: 'Perfil excluído com sucesso' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao excluir perfil', error: error.message });
    }
  });
  
  router.get('/profiles/:profileId/favorites', async (req, res) => {
    const { profileId } = req.params;
    try {
      const profile = await Profile.findById(profileId).populate('favorites'); // Supondo que 'favorites' é um campo no esquema do Profile que referencia filmes
      if (!profile) {
        return res.status(404).json({ message: 'Perfil não encontrado' });
      }
      res.status(200).json(profile.favorites);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao obter favoritos', error: error.message });
    }
  });

module.exports = router;
