import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchMovies } from './reducer';

function SearchForm() {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() === '') return;
    dispatch(fetchMovies(searchTerm));
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '20px 0',
        gap: '10px',
      }}
    >
      <input
        type="text"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: '250px',
          padding: '8px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          fontSize: '16px',
        }}
      />
      <button
        type="submit"
        style={{
          padding: '8px 16px',
          border: 'none',
          borderRadius: '8px',
          backgroundColor: '#007bff',
          color: 'white',
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
        Search
      </button>
    </form>
  );
}

export default SearchForm;
