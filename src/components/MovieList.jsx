import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { baseImageURL, options } from '../constants/costants';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { Link } from 'react-router-dom';

const MovieList = ({ genre }) => {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genre.id}`,
        options
      )
      .then((res) => setMovies(res.data.results))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="mb-3">{genre.name}</h1>
      <Splide
        options={{
          gap: '10px', 
          pagination: false, 
          autoWidth: true, 
        }}
      >
        {movies?.map((movie) => (
          <SplideSlide key={movie.id}>
            <Link to={`/detay/${movie.id}`} aria-label={movie.title}>
              <img
                className="movie"
                src={baseImageURL.concat(movie.poster_path)}
                alt={movie.title}
              />
            </Link>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default MovieList;