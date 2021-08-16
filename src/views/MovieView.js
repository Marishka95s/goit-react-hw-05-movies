import { useState, useEffect } from "react";
import { useParams, Route, Link } from "react-router-dom";
import MovieCastView from './MovieCastView';
import MovieReviewsView from './MovieReviewsView';
import { fetchMovie, IMAGE_URL } from '../services/MoviesSearch-api';
import styles from './MovieView.module.css';

export default function MovieView() {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        fetchMovie(movieId).then(data => setMovie(data));
    }, [movieId]);

    return(
        <>
        {movie && (
            <>
            <div className={styles.movie}>
                <img className={styles.image} src={`${IMAGE_URL}${movie.poster_path}`} alt={movie.original_title} />
                <div className={styles.info}>
                <h2>{movie.original_title}</h2>
                <p>User score: {movie.vote_average}</p>
                <h3>Overview</h3>
                <p>{movie.overview}</p>
                <h4>Genres</h4>
                {movie.genres && movie.genres.map(genre => (<span key={genre.id}>{genre.name} </span>))}
                </div>
                </div>
            </>
        )}
        <hr/>

        <p className={styles.title}>Additional information</p>
            
        <Link to={`/movies/${movieId}/cast`} exact className={styles.link} activeClassName={styles.activeLink}>Cast</Link>
        <br></br>
        <Link to={`/movies/${movieId}/reviews`} exact className={styles.link} activeClassName={styles.activeLink}>Reviews</Link>

        <Route path="/movies/:movieId/cast">
            <MovieCastView movieId={movieId}>Cast</MovieCastView>
        </Route>

        <Route path="/movies/:movieId/reviews">
            <MovieReviewsView movieId={movieId}>Reviews</MovieReviewsView>
        </Route>

        </>
    )
}