import { useState } from "react";
import Search from "./components/Search.jsx";

const App = () => {
  //The STATE for 'searching a movie' is declared in the <App /> and it is implemented in <Search /> via props
  const [searchTerm, setSearchTerm] = useState("");

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
        </header>

        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
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
The <Search /> has the INPUT field to eneter a search. The onChange event handeler in it will update the value of the state variable.
Once the value is updated in the <Search />, we can implement in the <header> using props.
The state variables value is updated in the <Search /> with text inputs >> carried over to <App /> using props and Now we can implement it
anywhere in <App /> by referring to {searchTerm} 

*/
