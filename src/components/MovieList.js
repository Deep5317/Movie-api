import React, { useEffect, useState } from 'react';

const MovieList = ({ movies }) => {
  const [movieDetails, setMovieDetails] = useState([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const details = await Promise.all(
        movies.map(async (movie) => {
          const response = await fetch(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=691eddca`);
          const data = await response.json();
          return data;
        })
      );
      setMovieDetails(details);
    };

    if (movies.length > 0) {
      fetchMovieDetails();
    }
  }, [movies]);

  return (
    <div className="movie-list">
      {movieDetails.map((movie) => (
        <div key={movie.imdbID} className="movie-detail">
          <h2>{movie.Title} ({movie.Year})</h2>
          <img src={movie.Poster} alt={movie.Title} />
          <p>{movie.Plot}</p>
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Cast:</strong> {movie.Actors}</p>
          <p><strong>Ratings:</strong></p>
          <ul>
            {movie.Ratings.map((rating, index) => (
              <li key={index}>{rating.Source}: {rating.Value}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
