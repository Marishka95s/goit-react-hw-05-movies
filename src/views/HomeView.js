import { useState, useEffect } from "react";
import { NavLink, useRouteMatch } from "react-router-dom";
import * as moviesFetchAPI from '../services/MoviesSearch-api';
import styles from './HomeView.module.css';

export default function HomeView() {
    const { url } = useRouteMatch();
    const [movies, setMovies] = useState(null);

    useEffect(() => {
        moviesFetchAPI.fetchTrendingMovies().then(data => setMovies(data.results));
    }, [])
    return(
        <>
            <h2 className={styles.heading}>Trending today</h2>
            {movies && 
            movies.map(movie => (
                <li key={movie.id} className={styles.item}>
                    <NavLink className={styles.link} to={`${url}movies/${movie.id}`}>{movie.title}</NavLink>
                </li>
            ))}
        </>
    )
}