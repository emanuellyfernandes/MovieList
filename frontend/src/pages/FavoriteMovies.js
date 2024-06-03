import React from 'react';

const FavoriteMovies = ({ movies }) => {
  return (
    <div>
      <h2>Favorites</h2>
      <div className="favorites-list">
        {movies.map(movie => (
          <div className="favorite-card" key={movie.id}>
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
            <p>{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteMovies;
