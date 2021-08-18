import React, { useState } from 'react';
import { fetchMovieByQuery } from '../services/MoviesSearch-api';
import { NavLink, useRouteMatch, useLocation, Link } from "react-router-dom";
import PropTypes from 'prop-types';
import styles from './MoviesView.module.css';

export default function MoviesView() {
    const [movies, setMovies] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const { url } = useRouteMatch();
    const location = useLocation();

    const handleChange = (event) => {
        setSearchQuery(event.currentTarget.value.toLowerCase());      
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (searchQuery.length !== 0) {
            fetchMovieByQuery(searchQuery).then(data => setMovies(data.results));     
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
                <ul>
                {movies.map(movie => (
                    <li key={movie.id} className={styles.item}>
                        <NavLink className={styles.link} to={{
                            pathname: `${url}/${movie.id}`,
                            state: {
                                location
                            }
                        }}>{movie.title}</NavLink>
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