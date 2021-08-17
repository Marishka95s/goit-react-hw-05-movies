import { useState, useEffect, Suspense, lazy } from "react";
import { useParams, Route, Link, useLocation } from "react-router-dom";
import { fetchMovie, IMAGE_URL } from '../services/MoviesSearch-api';
import styles from './MovieView.module.css';

const MovieCastView = lazy(() => 
    import('./MovieCastView.js' /* webpackChunkName: "MovieCastView"*/),
);
const MovieReviewsView = lazy(() => 
    import('./MovieReviewsView.js' /* webpackChunkName: "MovieReviewsView"*/),
);

export default function MovieView() {
    const location = useLocation();
    // console.log('MovieView: ', location);

    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        fetchMovie(movieId).then(data => setMovie(data));
    }, [movieId]);

    return(
        <>
        {movie && (
            <>
            <button type="submit" className={styles.backButton}>
                &#8592; Go back 
            </button>
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
            
        <Link to={{
            pathname: `/movies/${movieId}/cast`,
            state: { from: location }
            }} exact="true" className={styles.link} activeclassname={styles.activeLink}>
                Cast
        </Link>
        <br></br>
        <Link to={{
            pathname: `/movies/${movieId}/reviews`,
            state: { from: location }
            }} exact="true" className={styles.link} activeclassname={styles.activeLink}>
                Reviews
        </Link>

        <Suspense fallback={<h1>Loading...</h1>}>
        <Route path="/movies/:movieId/cast">
            <MovieCastView movieId={movieId}>Cast</MovieCastView>
        </Route>
        </Suspense>

        <Suspense fallback={<h1>Loading...</h1>}>
        <Route path="/movies/:movieId/reviews">
            <MovieReviewsView movieId={movieId}>Reviews</MovieReviewsView>
        </Route>
        </Suspense>

        </>
    )
}