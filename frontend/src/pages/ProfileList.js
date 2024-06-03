/*import React, { useState, useEffect } from 'react';
import { fetchProfiles, deleteProfile } from '../services/api';


const ProfileList = () => {
  const [profiles, setProfiles] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    fetchProfiles(userId)
      .then(data => setProfiles(data))
      .catch(error => setError(error.message));
  }, []);

  const handleDelete = async (profileId) => {
    try {
      await deleteProfile(profileId);
      setProfiles(profiles.filter(profile => profile._id !== profileId));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCreateProfile = () => {
    window.location.href = '/create-profile'; // Redireciona para a página de criação de perfil
  };

  return (
    <div>
      <h1>Profile List</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleCreateProfile}>Create Profile</button>
      {profiles.length === 0 ? (
        <p>No profiles found.</p>
      ) : (
        <ul>
          {profiles.map(profile => (
            <li key={profile._id}>
              <span>{profile.name} - {profile.description}</span>
              <button onClick={() => handleDelete(profile._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProfileList;
*/


import React, { useState, useEffect } from 'react';
import { fetchProfiles, deleteProfile } from '../services/api';
import axios from 'axios';

const ProfileList = () => {
  const [profiles, setProfiles] = useState([]);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1); // Página inicial para carregamento de filmes

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    fetchProfiles(userId)
      .then(data => setProfiles(data))
      .catch(error => setError(error.message));

    // Carregar filmes da API The Movie DB
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=YOUR_API_KEY&language=en-US&page=${page}`)
      .then(response => setMovies(prevMovies => [...prevMovies, ...response.data.results]))
      .catch(error => console.error('Error fetching movies:', error));
  }, [page]); // Dependência 'page' para carregar mais filmes ao rolar

  const handleDelete = async (profileId) => {
    try {
      await deleteProfile(profileId);
      setProfiles(profiles.filter(profile => profile._id !== profileId));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEdit = (profileId) => {
    window.location.href = `/edit-profile/${profileId}`;
  };

  const handleLoadMoreMovies = () => {
    setPage(prevPage => prevPage + 1); // Carregar a próxima página de filmes
  };

  return (
    <div>
      <h1>Profile List</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleCreateProfile}>Create Profile</button>
      <ul>
        {profiles.map(profile => (
          <li key={profile._id}>
            <span>{profile.name} - {profile.description}</span>
            <button onClick={() => handleEdit(profile._id)}>Edit</button>
            <button onClick={() => handleDelete(profile._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>Movies</h2>
      <div className="movie-list">
        {movies.map(movie => (
          <div key={movie.id}>
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
            <p>{movie.title}</p>
            <button onClick={() => handleAddToFavorites(movie)}>Add to Favorites</button>
            <button onClick={() => handleSelectProfile(movie)}>Select Profile</button>
          </div>
        ))}
      </div>
      <button onClick={handleLoadMoreMovies}>Load More Movies</button>
    </div>
  );
};

export default ProfileList;
