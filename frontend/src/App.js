import React from 'react';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ProfileList from './pages/ProfileList'; 
import CreateProfile from './pages/CreateProfile'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profiles" element={<ProfileList />} /> 
        <Route path="/create-profile" element={<CreateProfile />} /> 
        <Route path="/" element={<Login />} /> 
      </Routes>
    </Router>
  );
}

export default App;
