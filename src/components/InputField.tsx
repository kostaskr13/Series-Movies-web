import React, { useRef, useState, FormEvent, ChangeEvent, KeyboardEvent } from 'react';
import {Link } from 'react-router-dom';
import axios from 'axios';
import './style.css';

interface Props {
  handleAdd: (e: FormEvent<Element>) => void;
  onSearch: (searchQuery: string, sortBy: string, type: string) => void;
 
}

type Movie = {
  Title: string;
  Year: string;
  Rating: any;
  imdbID: string;
  Type: string;
  Poster: string;
};

const InputField: React.FC<Props> = ({ handleAdd, onSearch }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [searchType, setSearchType] = useState('movie');


  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://www.omdbapi.com/?apikey=19a51d59&type=${searchType}&s=${searchQuery}`
      );
      const results: Movie[] = response.data.Search || [];
      let sortedResults: Movie[] = [...results];
      if (sortBy === 'date') {
        sortedResults.sort((a, b) => parseInt(a.Year) - parseInt(b.Year));
      } else if (sortBy === 'title') {
        sortedResults.sort((a, b) => a.Title.localeCompare(b.Title));
      } else if (sortBy === 'rating') {
        sortedResults.sort((a, b) => a.Rating - b.Rating);
      }
      setSearchResults(sortedResults);
    } catch (error) {
      console.error('Error occurred while fetching search results:', error);
    }
  };


  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSortOptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
    handleSearch();
  };

  const handleTypeOptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSearchType(e.target.value);
    handleSearch();
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className='InputField'>
      <header className='header'>
        <span className='heading'>CrMovies</span>
        <div className='sort'>
          <div className='sort'>
            <select className='input_sort' value={sortBy} onChange={handleSortOptionChange}>
              <option value=''>Sort By</option>
              <option value='date'>Date</option>
              <option value='title'>Title</option>
              <option value='rating'>Rating</option>
            </select>
          </div>
          <div className='search'>
            <input
              type='input'
              ref={inputRef}
              value={searchQuery}
              onChange={handleSearchInputChange}
              onKeyDown={handleInputKeyDown}
              placeholder='Search ...'
              className='input__box'
            />
            <button className='input_submit' onClick={handleSearch}>
              Go
            </button>
          </div>
          <div className='type'>
            <select className='input_type' value={searchType} onChange={handleTypeOptionChange}>
              <option value='movie'>Movies</option>
              <option value='series'>Series</option>
            </select>
          </div>
        </div>
      </header>

      <div className='movies-container'>
        {searchResults.map((movie: Movie) => (
          <Link key={movie.imdbID} to={`/details/${movie.imdbID}`} className='movie-item'>
            <img src={movie.Poster} alt={movie.Title} />
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default InputField;