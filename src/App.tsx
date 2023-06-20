import React, { FormEvent} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './components/HomeScreen';
import InputField from './components/InputField';
import MovieDetails from './components/MovieDetails';
import './App.css';
import DarkMode from './components/DarkMode';


const App: React.FC = () => {

  const handleAdd = (e: FormEvent<Element>) => {
    e.preventDefault();
  };

  const handleSearch = (searchQuery: string, sortBy: string, type: string) => {
    // Perform search operation
  };

  return (
    <Router>
      <div className='App'>
      <span className='heading'>CrMovies</span>
      <DarkMode />
      <Routes>
      <Route
      path='/'
      element={
        <>
        <HomeScreen />
          <HomeScreen />
          <InputField handleAdd={handleAdd} onSearch={handleSearch}  />
          
              </>
            }
            />
            <Route
            path='/details/:imdbID'
            element={
              <>
              
              <MovieDetails />
              </>
            }
            />
            </Routes>
      </div>
    </Router>
  );
};

export default App;
