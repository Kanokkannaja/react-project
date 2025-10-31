import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addFavorite } from '../favorites/favoritesSlice';

function MovieList() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies); 
  const favorites = useSelector((state) => state.favorites);

  const handleAddFavorite = (movie) => {
    const isExist = favorites.find((fav) => fav.imdbID === movie.imdbID);
    if (!isExist) {
      dispatch(addFavorite(movie));
    } else {
      alert('This movie is already in your favorites!');
    }
  };

  if (!movies || movies.length === 0) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>No movies found </h2>
      </div>
    );
  }
  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Movies 🎬</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '20px',
        }}
      >
        {movies.map((movie) => (
          <div
            key={movie.imdbID}
            style={{
              border: '1px solid #ddd',
              borderRadius: '10px',
              padding: '10px',
              textAlign: 'center',
              backgroundColor: '#fff',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s',
            }}
          >
            {movie.Poster && movie.Poster !== 'N/A' ? (
              <img
                src={movie.Poster}
                alt={movie.Title}
                style={{
                  width: '100%',
                  height: '300px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                }}
              />
            ) : (
              <div
                style={{
                  width: '100%',
                  height: '300px',
                  borderRadius: '8px',
                  backgroundColor: '#eee',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#777',
                }}
              >
                No Image
              </div>
            )}

            <h3 style={{ marginTop: '10px' }}>{movie.Title}</h3>
            <p>{movie.Year}</p>

            <button
              onClick={() => handleAddFavorite(movie)}
              style={{
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                padding: '8px 12px',
                borderRadius: '5px',
                cursor: 'pointer',
                marginTop: '10px',
              }}
            >
              Add to Favorite 
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieList;
