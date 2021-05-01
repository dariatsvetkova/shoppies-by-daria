import React, {useState, useRef} from 'react';
import Placeholder from '../../Images/placeholder.png';
import MovieInfo from '../MovieInfo/MovieInfo';

import '../global.css';
import * as styles from './movieCard.module.css';

const MovieCard = ({
  movie,
  category,
  disableNominate,
  nominate,
  remove,
}) => {
  const [showInfo, setShowInfo] = useState(false);

  // Open/close the card with detailed movie info:
  const movieInfoRef = useRef(null);

  const toggleInfo = () => {
    if (showInfo) {
      // If the card is closing, trigger the animation:
      movieInfoRef.current.classList.add('boxUnpop');
      setTimeout(() => setShowInfo(false), 300);
    } else {
      setShowInfo(true);
    }
  };

  // Remove the movie from the list of nominees:
  const movieCard = useRef(null);

  const handleRemove = () => {
    // Trigger the animation on the removed element:
    movieCard.current.classList.add('unpop');
    setTimeout(remove(movie), 300);
  };

  const {imdbID, Title, Year, Poster} = movie;
  // Set the class names based on which list the card appears in:
  const classCategory = `movieCard${category}`;

  return (
    <li
      className={category === 'Nominations' ? 'pop' : 'appear'}
      ref={movieCard}
    >
      <article className={`${styles.movieCard} ${styles[classCategory]} box`}>
        <div>
          <img
            src={Poster.match(/^http|^www/) ? Poster : Placeholder}
            alt={`${Title} movie poster`}
          />
          <h4 className={styles.movieTitle}>
            {Title}{' '}({Year})
          </h4>
        </div>

        <div className={styles.movieCardButtons}>
          <button
            className={styles.infoButton}
            onClick={toggleInfo}
          >
            i
          </button>

          {category === 'Search' && (
            <button
              value={movie}
              onClick={() => nominate(movie)}
              disabled={disableNominate}
            >
              Nominate
            </button>
          )}
          {category === 'Nominations' && (
            <button
              className="removeButton"
              value={movie}
              onClick={handleRemove}
            >
              <span className="fas fa-times" />
            </button>
          )}
        </div>
      </article>

      {showInfo &&
        <MovieInfo
          ref={movieInfoRef}
          imdbID={imdbID}
          Year={Year}
          close={toggleInfo}
        />
      }
    </li>
  );
};

export default MovieCard;
