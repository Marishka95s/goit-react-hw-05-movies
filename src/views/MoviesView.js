import React, { useState, useEffect } from 'react';
import { fetchMovieByQuery } from '../services/MoviesSearch-api';
import { useRouteMatch, useLocation, useHistory, Link } from "react-router-dom";
import Searchbar from '../components/Searchbar/Searchbar';
import PropTypes from 'prop-types';
import styles from './MoviesView.module.css';

export default function MoviesView() {
    const { url } = useRouteMatch();
    const location = useLocation();
    const history = useHistory();
    const [movies, setMovies] = useState(null);
    const [searchQuery, setSearchQuery] = useState(new URLSearchParams(location.search).get('query') ?? '',);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (searchQuery)
        fetchMovieByQuery(searchQuery)
            .then(request => {
              setMovies(request.results);
            })
            .catch(error => setError(error.message));
      }, [searchQuery]);

      const onChangeQuery = query => {
        setMovies([]);
        setError(null);
        setSearchQuery(query);
        history.push({
          ...location,
          search: `query=${query}`,
        });
      };       

    return (
        <>
        <Searchbar onSubmit={onChangeQuery} />

        {error && (
            <p style={{ color: 'red', textAlign: 'center', fontSize: '20px' }}>
            This is error: {error}
            </p>
        )}

        <section>
            {movies && (
                <ul>
                {movies.map(movie => (
                    <li key={movie.id} className={styles.item}>
                        <Link className={styles.link} to={{
                            pathname: `${url}/${movie.id}`,
                            state: { from: location
                            }
                        }}>{movie.title}</Link>
                    </li>
                ))}
                </ul>)}
        </section>
        </>
    )
}
MoviesView.propTypes = {
    onSubmit: PropTypes.func,
  };