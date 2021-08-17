import React, { useState } from 'react';
import { fetchMovieByQuery } from '../services/MoviesSearch-api';
import { NavLink, useRouteMatch } from "react-router-dom";
import PropTypes from 'prop-types';
import styles from './MoviesView.module.css';

export default function MoviesView() {
    const [movies, setMovies] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const { url } = useRouteMatch();

    const handleChange = (event) => {
        setSearchQuery(event.currentTarget.value);      
    }

    // const fetchMovies = useEffect(() => {
    //     fetchMovieByQuery(searchQuery).then(data => {setMovie(data); console.log(data)});
    // }, [searchQuery]);

    const handleSubmit = e => {
        e.preventDefault();  
        if (searchQuery.length !== 0) {
            fetchMovieByQuery(searchQuery).then(data => {setMovies(data.results); console.log(data)});     
        }  
    }   

    return (
        <>
        <header className="Searchbar">
            <form className="SearchForm" onSubmit={handleSubmit}>                
                <input className={styles.input} type="text" autoComplete="off" autoFocus placeholder="Search movies" value={searchQuery} onChange={handleChange}/>

                <button type="submit" className={styles.searchButton}>
                   Search 
                </button>
            </form>
        </header>

        <section>
            {movies && (
                <>
                <button type="submit" className={styles.backButton}>
                &#8592; Go back 
                </button>
                <ul>
                {movies.map(movie => (
                    <li key={movie.id} className={styles.item}>
                        <NavLink className={styles.link} to={`${url}/${movie.id}`}>{movie.title}</NavLink>
                    </li>
                ))}
                </ul>
                </>)}
        </section>
        </>
    )
}
MoviesView.propTypes = {
    onSubmit: PropTypes.func,
  };