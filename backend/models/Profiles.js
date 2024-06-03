const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  userId: {
    type: Number, // mantenha como Number se é isso que você está utilizando no modelo User
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  }
  // outros campos do perfil...
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
