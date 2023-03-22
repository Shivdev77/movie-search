import './App.css';
import SearchIcon from "./search.svg";
import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';

const API_URL = "http://www.omdbapi.com?apikey=19137a59";



const App = () => {
  const [movies, setmovies] = useState([]);
  const [searchTerm, setsearchTerm] = useState('');

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setmovies(data.Search);
  }

  useEffect(() => {
    searchMovies('Movie');
  }, []);

  return (
    <div className="app">
      <h1>MovieIsland</h1>
      <div className="search">
        <input
          type="text"
          placeholder='Search for movies'
          value={searchTerm}
          onChange={(e) => { setsearchTerm(e.target.value)}}
        />
        <img src={SearchIcon} alt="search-icon"
          onClick={() => { searchMovies(searchTerm)}}
        />
      </div>

      {

        movies?.length > 0
          ?
          (
            <div className="container">
              {movies.map((movie) => (
                <MovieCard movie1={movie}></MovieCard>
              ))}
            </div>
          ) : (
            <div className='empty'>
              <h2>No movies found.</h2>
            </div>

          )
      }


    </div>
  );
}

export default App;
