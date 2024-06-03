import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(email, password);
      const { userId } = response;
      localStorage.setItem('userId', userId);
      navigate('/profiles'); 
    } catch (error) {
      setError(String(error));
    }
  };

  const handleSignUp = () => {
    navigate('/signup'); 
  };

  return (
    <div className="container">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
          <button type="button" onClick={handleSignUp}>Sign Up</button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
