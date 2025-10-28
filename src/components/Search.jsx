import React from 'react'

const Search = ({ searchTerm, setSearchTerm}) => {
    return (
        <div className="search">
            <div>
                <img src="search.svg" alt="search"/>

                <input
                    type="text"
                    placeholder="Search through thousands of movies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}             //Anonymous callback to capture text entry
                />
            </div>
        </div>
    )
}
export default Search


/*
rafce

The STATE for 'what movie to search for' (searchTerm) is declared using useState HOOK in <App /> PLUS its setter to update it.
It is implemented here using props (destructuring)

*/
