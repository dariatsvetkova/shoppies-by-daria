import React, {useState} from 'react';
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
  const openInfo = () => {
    if (showInfo) {
      // If the card is closing, trigger the animation:
      const closedInfo = document.getElementById('movieInfo');
      closedInfo.classList.add('boxUnpop');
      setTimeout(() => setShowInfo(false), 300);
    } else {
      // Show the card:
      setShowInfo(true);
    }
  };

  const handleRemove = () => {
    // Trigger the animation on the removed element:
    const removedElem = document.getElementById(`Nominations-${movie.imdbID}`);
    removedElem.classList.add('unpop');
    setTimeout(props.remove(movie), 300);
  };

  const {imdbID, Title, Year, Poster} = movie;
  // Set the class names based on which list the card appears in:
  const classCategory = `movieCard${category}`;

  return (
    <li>
      <article
        className={`${styles.movieCard} ${styles[classCategory]} box`}
        id={`${category}-${imdbID}`}
      >
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
            onClick={openInfo}
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
          imdbID={imdbID}
          Year={Year}
          showInfo={openInfo}
        />
      }
    </li>
  );
};

export default MovieCard;
