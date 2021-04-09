import React, {useState} from 'react';
import Placeholder from '../../Images/placeholder.png';
import MovieInfo from '../MovieInfo/MovieInfo';

import '../global.css';
import * as styles from './movieCard.module.css';

const MovieCard = ({
  movie,
  category,
  disableNominate,
  remove,
}) => {
  const [showInfo, setShowInfo] = useState(false);

  // Open/close the movie info card
  const openInfo = () => {
    if (showInfo) {
      // If the card is closing, trigger the animation:
      const closedInfo = document.querySelector('.movieInfo');
      closedInfo.classList.add('disappear');

      setTimeout(() => setShowInfo(false),
          300);
    } else {
      // Show the card:
      setShowInfo(true);
    }
  };

  const {
    imdbID, Title, Year, Poster,
  } = movie;
  const classCategory = `movieCard${category[0].toUpperCase()}${category.slice(1)}`;

  return (
    <li>
      <article
        className={`${styles.movieCard} ${styles[classCategory]} box`}
        id={imdbID}
      >
        <div>
          <img
            src={Poster.match(/^http|^www/) ? Poster : Placeholder}
            alt={`${Title} movie poster`}
          />
          <h4 className={styles.movieTitle}>
            {Title}
            {' '}
            {Year}
          </h4>
        </div>

        <div className={styles.movieCardButtons}>
          <button
            className={styles.infoButton}
            onClick={openInfo}
          >
            i
          </button>

          {category === 'search' && (
            <button
              value={movie}
              onClick={() => nominate(movie)}
              disabled={disableNominate}
            >
              Nominate
            </button>
          )}
          {category === 'nominations' && (
            <button
              className="removeButton"
              value={movie}
              onClick={() => remove(movie)}
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
