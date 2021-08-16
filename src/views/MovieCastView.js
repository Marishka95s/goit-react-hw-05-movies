import { useState, useEffect } from "react";
import { fetchMovieActors, IMAGE_URL } from '../services/MoviesSearch-api';
import styles from './MovieCastView.module.css';
import defaultAvatar from './defaultAvatar.png';

export default function MovieCastView({ movieId }) {
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        fetchMovieActors(movieId).then(data => setMovie(data));
    }, [movieId]);

    return(
        <>
        <ul className={styles.actors}>
        {movie && movie.cast && movie.cast.map((actor, idx) => 
            (<li key={idx} className={styles.actor}>
                { actor.profile_path ? <img className={styles.image} src={`${IMAGE_URL}${actor.profile_path}`} alt={actor.name} /> : <img className={styles.image} src={defaultAvatar} alt={actor.name} /> }
                <p>{actor.name}</p>
                <p>Character: {actor.character}</p>
             </li>)
            )}
        </ul>
        </>
    )
}
