import { useState, useEffect } from "react";
import Search from "./components/Search.jsx";
import Spinner from "./components/Spinner.jsx";
import MovieCard from "./components/MovieCard.jsx";

//API_BASE_URL, API_KEY and API_OPTIONS are declared above declaration of <App />
const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {                                   //
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  //The STATE variable for 'searching a movie' is declared in the <App /> and it is implemented in <Search /> via props
  const [searchTerm, setSearchTerm] = useState("");
  //To display ERROR if occurs
  const [errorMessage, setErrorMessage] = useState("");
  //To display Results
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //Create an async callback to make HTTP requests (to API) >> that will be implemented in useEffect()
  const fetchMovies = async (query = "") => {
    //Reset the values for isLoading and errorMessage state variables before making an API request with fetch()
    setIsLoading(true);
    setErrorMessage("");

    try {
      //API call (request) is made within try{} by implementing native fetch() << less features than axios requests
      const endpoint = query
          ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
          : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);

      /*NOTE: For a QUICK evaluation of the outcome of the fetch request
      alert(response);                                      if everything works a popup will be displayed with alert
      throw new Error('Failed to fetch movies');            throwing an error to simulate error display                */

      //Throwing an ERROR if NO response is returned with fetch()
      if (!response.ok) {
        throw new Error("Could not fetch movies");
      }
      //If NO ERROR occurred, extract the data from return object == response
      const data = await response.json();

      //Check if data has Response property
      if (data.Response === "False") {
        setErrorMessage(data.Error || "Failed to fetch movies");
        setMovieList([]);                             //Error >> set the list to an []
        return;
      }
      //If Response property exists, update the movieList with 'results' (an array) OR none for result use []
      setMovieList(data.results || []);

    //If returned with an ERROR instead of a response OR 'res' for shorten
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      //A new useState() is created above to implement this error if it occurred
      setErrorMessage("Error fetching movies. Please try again later.")

    //No matter what the outcome of fetch request, reset the value of isLoading to false
    } finally {
      setIsLoading(false);
    }
  };

//NOTE: By implementing fetchMovies() call back in useEffect + [] dependency array >> fetching is implemented only once @ mount == React component is 1st added to DOM
  useEffect(() => {
    fetchMovies(searchTerm);
  }, [searchTerm]);                                             //Empty dependency array == ONLY implement it once during app mounting to DOM

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

        <section className="all-movies">
          <h2 className="mt-[40px]">All Movies</h2>

          {isLoading ? (                                    //A complex ternary operator to display ALL possible outcomes
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (                  //NOTE: a {} would require a return statement whereas a () will eliminate that requirement
                  <MovieCard key={movie.id} movie={movie}/>
              ))};
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
Import useEffect Hook to <App /> and implement a GET request to external API as its callback
By having an EMPTY DEPENDENCY array, this request will be ONLY made once when the application mounts to the DOM
------------------------------------------------------------------------------------------------------------------------------------------------
Adding a search query
First add a 'query' parameter equals to an EMPTY String, i.e., (query = '') in the async fetchMovies callback
Second, add searchTerm as an argument to fetchMovies(searchTerm) where it is called in the useEffect.
    Also add searchTerm to the dependency array of useEffect so that everytime the value of searchTerm changes, it will re-render
Third, add a ternary operator to the assignment of endpoint to check if a query exist, i.e., change the URL endpoint if it does
NOTE: By implementing encodeURIComponent(query) >> even none String characters can be passed on in a query
*/
