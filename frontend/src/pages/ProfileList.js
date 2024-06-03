import React, { useState, useEffect, useRef } from 'react';
import { fetchProfiles, deleteProfile } from '../services/api';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ProfileList.css'; // Importe o arquivo CSS para estilos personalizados

const ProfileList = () => {
  const [profiles, setProfiles] = useState([]);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  const [moviePage, setMoviePage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMoreMovies, setHasMoreMovies] = useState(true); // Verifica se há mais filmes para carregar
  const [selectedProfiles, setSelectedProfiles] = useState({}); // Estado para armazenar o perfil selecionado para cada filme
  const containerRef = useRef(null);
  const navigate = useNavigate(); // Adicione o hook useNavigate

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    fetchProfiles(userId, 1)
      .then(data => {
        setProfiles(data);
        setLoading(false);
      })
      .catch(error => setError(error.message));

    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=83a1040e042d24fdf1279984ba599d0a&language=en-US&page=${moviePage}`)
      .then(response => {
        const newMovies = response.data.results.map(movie => ({ ...movie, uniqueId: `${movie.id}-${Math.random()}` }));
        setMovies(prevMovies => [...prevMovies, ...newMovies]);
        setHasMoreMovies(newMovies.length > 0); // Atualiza hasMoreMovies com base na resposta da API
      })
      .catch(error => setError('Erro ao buscar filmes da API TMDB'));
  }, [moviePage]);

  const handleDelete = async (profileId) => {
    try {
      await deleteProfile(profileId);
      setProfiles(profiles.filter(profile => profile._id !== profileId));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCreateProfile = () => {
    window.location.href = '/create-profile';
  };

  const handleViewFavorites = (profileId) => {
    navigate(`/profiles/${profileId}/favorites`); // Redireciona para a página de favoritos do perfil
  };

  const handleProfileChange = (movieId, profileId) => {
    setSelectedProfiles(prevState => ({
      ...prevState,
      [`${movieId}-${profileId}`]: profileId
    }));
  };

  const handleAddToFavorites = (movie) => {
    const profileId = selectedProfiles[`${movie.id}-${movie.uniqueId}`];
    if (!profileId) {
      setError('Selecione um perfil antes de adicionar aos favoritos');
      return;
    }

    // Limpar o estado de erro antes de fazer a solicitação POST
    setError('');

    axios.post(`/api/profiles/${profileId}/favorites`, { movie })
      .then(response => {
        alert('Filme adicionado aos favoritos!');
        // Limpar o estado de erro quando a operação for bem-sucedida
        setError('');
      })
      .catch(error => {
        setError('Erro ao adicionar filme aos favoritos');
      });
  };

  const handleScroll = () => {
    const container = containerRef.current;
    if (container.scrollTop + container.clientHeight >= container.scrollHeight - 20 && !loading && hasMoreMovies) {
      setLoading(true);
      setMoviePage(prevPage => prevPage + 1);
    }
  };

  return (
    <div className="" onScroll={handleScroll} ref={containerRef}>
      <div className="container">
        <h3>Profile List</h3>
        <div className="profile-actions">
          <button onClick={handleCreateProfile}>Create Profile</button>
        </div>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="profile-container">
        {profiles.map(profile => (
          <div className="profile-card" key={profile._id}>
            <span>{profile.name}</span>
            <button onClick={() => handleDelete(profile._id)}>Delete</button>
            <button onClick={() => handleViewFavorites(profile._id)}>View Favorites</button>
          </div>
        ))}
        {loading && <p>Loading...</p>}
      </div>
      <h2>Movies</h2>
      <div className="movie-list">
        {movies.map(movie => (
          <div className="movie-card" key={movie.uniqueId}>
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
            <p>{movie.title}</p>
            <select onChange={(e) => handleProfileChange(movie.id, e.target.value)} defaultValue="">
              <option value="" disabled>Selecione um perfil</option>
              {profiles.map(profile => (
                <option key={`${profile._id}-${movie.uniqueId}`} value={profile._id}>{profile.name}</option>
              ))}
            </select>
            <button onClick={() => handleAddToFavorites(movie)}>Addto Favorites</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileList;

