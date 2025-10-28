import React from 'react'

const MovieCard = ({movie:                                                          //Destructured prop
    {title, vote_average, poster_path, release_date, original_language}             //Destructured movie (prop)
}) => {
    return (
        <div className="movie-card">
            <img
                src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png'}
                alt={title}
            />
            <div className="mt-4">
                <h3>{title}</h3>

                <div className="content">
                    <div className="rating">
                        <img src="/star.svg" alt="Star Icon"/>
                        <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
                    </div>

                    <span>•</span>
                    <p className="lang">{original_language}</p>

                    <span>•</span>
                    <p className="year">{release_date ? release_date.split('-')[0] : 'N/A'}</p>
                </div>
            </div>
        </div>
    )
}
export default MovieCard;
/*
----------------------------------------------------------------------------------------------------
The props object is destructed to extract {movie} property.
{movie} is also an object that can be destructured to extract its properties in the same time, e.g.,
{movie: {title, vote_average, poster_path, release_date, original_language}}
----------------------------------------------------------------------------------------------------
NOTE: The DOT in <span>•</span> is a copied dot symbol from Google search
*/

