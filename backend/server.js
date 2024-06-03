const express = require('express');
const mongoose = require('mongoose');
const app = require('./app'); 

const PORT = process.env.PORT || 3000;

// Conexão com o banco de dados MongoDB usando Mongoose
mongoose.connect('mongodb+srv://emanuellymbf:z7BicNsnMYbSipw7@movie-list.ujth7e8.mongodb.net/movie-list?retryWrites=true&w=majority')
  .then(() => {
    console.log('Conexão com o banco de dados MongoDB Atlas estabelecida.');
   
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => console.error('Erro ao conectar ao banco de dados:', err));


  