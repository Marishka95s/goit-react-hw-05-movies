import { useState, useEffect } from "react";
import { fetchMovieReviews } from '../services/MoviesSearch-api';
import styles from './MovieReviewsView.module.css';

export default function MovieReviewesView({ movieId }) {
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        fetchMovieReviews(movieId).then(data => {setMovie(data); console.log(data)});
    }, [movieId]);

    return(
    <>
    { ((movie !== null) && (movie.results.length !== 0)) 
        ? (<ul className={styles.reviews}>
            {movie.results.map((review, idx) => 
                (<li key={idx} className={styles.review}>
                    <h3 className={styles.reviewInfo}>Author: {review.author}</h3>
                    <p className={styles.reviewInfo}>{review.content}</p>
                    
                </li>)
            )}
          </ul>)
        : (<p className={styles.noReviewInfo}>We don't have any reviews for this movie</p>) }
    </>
    )
}
