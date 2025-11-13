cls
import './index.css'
import heroImg from './assets/public/hero.png';
import Search from './components/Search';
import MovieCart from './components/MovieCart.jsx';
import Trending from './components/Trending';
import { useEffect,useState } from 'react';
import { useDebounce } from 'react-use';

const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  }
}

function App() {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [searchTerm, setsearchTerm] = useState('');

  const [errMsg,setErrMsg] = useState('');
  const [movies, setmovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [trendingMovies, setTrendingMovies] = useState([]);


  useDebounce(()=> setDebouncedSearchTerm(searchTerm), 500 , [searchTerm]);

  
  useEffect(()=>{
    fetchMovies(debouncedSearchTerm);
  },[debouncedSearchTerm])

  useEffect(()=>{
    fetchTrandingMouvies();
  },[]);

    const fetchMovies = async (query = '') => {
    setIsLoading(true);
    setErrMsg('');

    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);

      if(!response.ok) {
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json();

      if(data.Response === 'False') {
        setErrorMessage(data.Error || 'Failed to fetch movies');
        setmovies([]);
        return;
      }

      setmovies(data.results || []);

    
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrMsg('Error fetching movies. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }


   const fetchTrandingMouvies = async()=>{
    try{
      const endPoint = `${API_BASE_URL}/trending/movie/day`;

      const response = await fetch(endPoint, API_OPTIONS);

      if (!response.ok){
        throw new Error('faild to fech data');
      }

      const data = await response.json();

      setTrendingMovies(data.results);

    }catch(err){
      console.error(err);
    }
  }

  return(
    <main>
      <div className='pattern'/>
      <div className='wrapper'>
        <header>
          <img src={heroImg} alt="heroImg" />
          <h1>
            Find <span className='text-gradient'>Movies</span>  You’ll Love Without the Hassle
          </h1>

          <Search
          searchTerm={searchTerm}
          setsearchTerm={setsearchTerm}
          />
        </header>

        <section className='trending'>
          <h2 className='mt-[40px]'>Trending</h2>
          <ul>
            {trendingMovies.slice(0,6).map((movie,i)=>(
              <li key={movie.id}>
                <Trending 
                  index = {i+1}
                  {...movie}/>
              </li>
            ))
            }
          </ul>
        </section>

        <section className="all-movies">
          <h2 className='mt-[40px]'>Popular</h2>

          {isLoading ? (
            <p className='text-white'>loading...</p>
          ): 
            errMsg ? (
              <p className='text-red-500'>{errMsg}</p>
            ): 
              (
                <ul>
                  {movies.map((movie,i)=>(
                      <MovieCart
                        key={movie.id}
                        {...movie}
                      />
                  ))}
                </ul>
              )
            
          }
        </section>
      </div>
    </main>
  );  

}
export default App
