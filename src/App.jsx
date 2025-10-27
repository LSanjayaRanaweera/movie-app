import { useState, useEffect } from "react";
import Search from "./components/Search.jsx";

//API_BASE_URL, API_KEY and API_OPTIONS are declared above declaration of <App />
const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`
    }
}

const App = () => {
  //The STATE variable for 'searching a movie' is declared in the <App /> and it is implemented in <Search /> via props
  const [searchTerm, setSearchTerm] = useState("");
  //To display ERROR if occurs
  const [errorMessage, setErrorMessage] = useState('');
  //To display Results
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //Create an async callback to be implemented in useEffect()
  const fetchMovies = async () => {
      //Reset the values for isLoading and errorMessage state variables before making an API fetch
      setIsLoading(true);
      setErrorMessage('')

      try {
          const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
          const response = await fetch(endpoint, API_OPTIONS);

          //alert(response);                                    if everything works a popup will be displayed with alert
          //throw new Error('Failed to fetch movies');          throwing an error to simulate error display

          //Error
          if (!response.ok) {
              throw new Error("Could not fetch movies");
          }
          //NO Error
          const data = await response.json();

          if(data.Response === 'False') {
              setErrorMessage( data.Error || 'Failed to fetch movies');
              setMovieList([]);                         //Error >> set the list to an []
              return;
          }

          setMovieList(data.results || []);

      } catch (error) {
          console.error(`Error fetching movies: ${error}`);-
          //A new useState() is created above to implement error if it occurs
          setErrorMessage('Error fetching movies. Please try again later.');

      //No matter what the outcome of fetch, reset the value of isloading to false
      } finally {
          setIsLoading(false);
      }
  }

  useEffect(() => {
    fetchMovies();
  }, []);
  //Empty dependency array == ONLY implement it once

  return (
    //Implementing HTML semantic tags  >> <main> <header> etc. instead of wrapper <div> or </>
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy
            Without the Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        <section className='all-movies'>
            <h2>All Movies</h2>

            {isLoading ? (                                      //Complex ternary operator to display outcome
                <p className='text-white'>Loading...</p>
            ) : errorMessage ? (
                <p className='text-red-500'>{errorMessage}</p>
            ) : (
                <ul>
                    {movieList.map((movie) => (                 //{} would require a return statement whereas () eliminates that requirement
                       <p key={movie.id} className='text-white'>{movie.title}</p>
                    ))}
                </ul>
            )}


        </section>


      </div>
    </main>
  );
};

export default App;
/*
 * 1. Components declared as anonymous functional expressions
 * 2. Styled by Tailwindcss which provides many utility classes that has predefined styles << GO OVER
 * 3. Public (media) assets >> from https://www.figma.com/design/kdu6x1bqzyCMbzezudt6s2/Movie-App-w--React?node-id=2-2&p=f&t=n1v0DypduxVOuSrV-0
----------------------------------------------------------------------------------------------------------------------------------------------- 
<Search />
NOTE: useState() HOOK is implemented in <App />  and NOT in <Search /> to conduct a search for a movie (state variable == 'searchTerm').
The state variable and its setter (updater) function is implemented using props in <Search />
The <Search /> has the INPUT field to enter a search. The onChange event handler in it will update the value of the state variable.
Once the value is updated in the <Search />, we can implement in the <header> using props.
The state variables value will be updated in the <Search /> with text inputs >> it will be carried over to <App /> using props.
Now we can implement the search feature anywhere in <App /> by referring to {searchTerm}
------------------------------------------------------------------------------------------------------------------------------------------------
* API == Application Programing Interface - a set of rules that allows one software application to talk to another
* Add VITE_TMDB_API_KEY to new file .env.local
* To implement fetching data from the API, declare >> API_BASE_URL, API_KEY and API_OPTIONS (method to fetch) above the declaration of <App />
------------------------------------------------------------------------------------------------------------------------------------------------
Import useEffect Hook to <App /> and implement a GET request to external API
By having an EMPTY DEPENDENCY array, this request will be ONLY made once when the the application mounts
*/
