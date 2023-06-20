import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './MovieDetails.css';


type MovieDetail = {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: { Source: string; Value: string }[];
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
};

const MovieDetails: React.FC = () => {
  const { imdbID } = useParams();
  const [movieDetails, setMovieDetails] = useState<MovieDetail | null>(null);
  const [backgroundColor, setBackgroundColor] = useState<string>('');

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`http://www.omdbapi.com/?apikey=19a51d59&i=${imdbID}`);
        setMovieDetails(response.data);
        extractImageColors(response.data.Poster);
      } catch (error) {
        console.error('Error occurred while fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [imdbID]);

  const extractImageColors = (imageUrl: string) => {
    const img = new Image();
    img.src = imageUrl;
    img.crossOrigin = 'Anonymous';

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (ctx) {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        const imageData = ctx.getImageData(0, 0, img.width, img.height).data;
        const pixelCount = img.width * img.height;

        let redSum = 0;
        let greenSum = 0;
        let blueSum = 0;

        for (let i = 0; i < pixelCount; i++) {
          redSum += imageData[i * 4];
          greenSum += imageData[i * 4 + 1];
          blueSum += imageData[i * 4 + 2];
        }

        const redAvg = Math.floor(redSum / pixelCount);
        const greenAvg = Math.floor(greenSum / pixelCount);
        const blueAvg = Math.floor(blueSum / pixelCount);

        const color = `rgb(${redAvg}, ${greenAvg}, ${blueAvg})`;
        setBackgroundColor(color);
      }
    };
  };

  if (!movieDetails) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="MovieDetails" style={{ backgroundColor }}>
      <div className="movie-poster">
        <img src={movieDetails.Poster} alt={movieDetails.Title} />
      </div>
      <div className="movie-info">
        <h2>{movieDetails.Title}</h2>
        <p>{movieDetails.Plot}</p>
        <p>Director: {movieDetails.Director}</p>
        <p>Genre: {movieDetails.Genre}</p>
        <p>Released: {movieDetails.Released}</p>
        <p>IMDb Rating: {movieDetails.imdbRating}</p>
      </div>
    </div>
  );
};

export default MovieDetails;
