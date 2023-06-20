import React, { useState, useEffect } from 'react';
import './HomeScreen.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

interface Movie {
  id: number;
  Poster: string;
  Title: string;
  Year: string;
  imdbRating: string;
}

const HomeScreen = () => {
  const location = useLocation();
  const [recentMovies, setRecentMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [oldestMovies, setOldestMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get<{ Search: Movie[] }>(
          'http://www.omdbapi.com/?apikey=19a51d59&s=movie&type=movie&y=2023'
        );
        const movies = response.data.Search.map((movie: Movie, index: number) => ({
          ...movie,
          id: index,
        }));

        // Sort movies by year in ascending order
        const sortedByYear = [...movies].sort((a, b) => parseInt(a.Year) - parseInt(b.Year));

        // Sort movies by IMDb rating in descending order
        const sortedByRating = [...movies].sort((a, b) => parseFloat(b.imdbRating) - parseFloat(a.imdbRating));

        // Take the first 10 movies from each sorted list
        const recent = sortedByYear.slice(0, 10);
        const topRated = sortedByRating.slice(0, 10);
        const oldest = sortedByYear.slice(sortedByYear.length - 10, sortedByYear.length);

        setRecentMovies(recent);
        setTopRatedMovies(topRated);
        setOldestMovies(oldest);
      } catch (error) {
        console.error('Error occurred while fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  const shuffleLine = (line: Movie[]) => {
    const shuffledLine = [...line];
    for (let i = shuffledLine.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledLine[i], shuffledLine[j]] = [shuffledLine[j], shuffledLine[i]];
    }
    return shuffledLine;
  };

  const shuffledRecentMovies = shuffleLine(recentMovies);
  const shuffledTopRatedMovies = shuffleLine(topRatedMovies);
  const shuffledOldestMovies = shuffleLine(oldestMovies);

  // Check if the current route is the root ("/")
  const isRootRoute = location.pathname === '/';

  return (
    <div className="home-screen">
      <div className="scrolling-images">
        <div className="grid-container">
          {/* First Line: Shuffled Recent Movies */}
          {isRootRoute && shuffledRecentMovies.map((movie) => (
            <img key={movie.id} src={movie.Poster} alt={movie.Title} />
          ))}

          {/* Second Line: Shuffled Top Rated Movies */}
          {isRootRoute && shuffledTopRatedMovies.map((movie) => (
            <img key={movie.id} src={movie.Poster} alt={movie.Title} />
          ))}

          {/* Third Line: Shuffled Oldest Movies */}
          {isRootRoute && shuffledOldestMovies.map((movie) => (
            <img key={movie.id} src={movie.Poster} alt={movie.Title} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
