import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import './App.css';

const App = () => {
  const [movies, setMovies] = useState([]);

  const handleSearch = async (query) => {
    const response = await fetch(`http://www.omdbapi.com/?s=${query}&apikey=691eddca`);
    const data = await response.json();
    setMovies(data.Search || []);
  };

  return (
    <div className="app">
      <SearchBar onSearch={handleSearch} />
      <MovieList movies={movies} />
    </div>
  );
};

export default App;
