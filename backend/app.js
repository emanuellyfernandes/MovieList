const express = require('express');
const cors = require('cors');
const signup = require('./routes/Signup');
const login = require('./routes/Login');
const profiles = require('./routes/Profile'); 

const app = express();

app.use(cors({
  origin: 'http://localhost:3001', 
  optionsSuccessStatus: 200
}));
app.use(express.json());


app.use(signup);
app.use(login);
app.use(profiles); 

module.exports = app;
