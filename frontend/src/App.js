import React, { useState } from 'react';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ProfileList from './pages/ProfileList'; 
import CreateProfile from './pages/CreateProfile'; 
import FavoriteMovies from './pages/FavoriteMovies'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/profiles"
          element={<ProfileList setFavoriteMovies={setFavoriteMovies} />}
        />
        <Route path="/create-profile" element={<CreateProfile />} />
        <Route
          path="/profiles/:profileId/favorites"
          element={<FavoriteMovies favoriteMovies={favoriteMovies} />}
        />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
