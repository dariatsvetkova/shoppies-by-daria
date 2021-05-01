import React, {useState, useEffect} from 'react';
import Placeholder from '../../Images/placeholder.png';
import Spinner from '../Spinner/Spinner';

import '../global.css';
import * as styles from './movieInfo.module.css';

const MovieInfo = ({
  imdbID,
  Year,
  showInfo,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [movie, setMovie] = useState({});

  // Fetch movie details from the API:
  useEffect(() => {
    const url = new URL('https://www.omdbapi.com/');
    const params = {
      i: imdbID,
      y: Year,
      type: 'movie',
      r: 'json',
      apikey: 'b56cbf95',
    };

    for (const key in params) {
      if (params.hasOwnProperty.call(params, key)) {
        url.searchParams.set(key, params[key]);
      }
    }

    fetch(url)
        .then((response) => response.json())
        .then((response) => {
          setMovie(response);
          setError('');
        })
        .catch(() => {
          setError(true);
        })
        .finally(() => setLoading(false));
  });

  const {
    Title,
    Poster,
    Director,
    Runtime,
    Genre,
    Language,
    Country,
    Actors,
    Plot,
  } = movie;

  // Listen for clicks on the close button or outside of the card to close it:
  const shouldClose = (e) => {
    const activeItem = document.getElementById('movieInfo');
    const closeButton = document.getElementById('closeButton');

    if (!activeItem.contains(e.target) ||
      closeButton.contains(e.target)) {
      showInfo();
    }
  };

  useEffect(() => {
    document.getElementById('root')
        .addEventListener('click', shouldClose, false);
    return () => document.getElementById('root')
        .removeEventListener('click', shouldClose);
  }, []);

  return (
    <div className={`${styles.movieInfo} box boxPop`} id="movieInfo">
      <button
        className={`${styles.closeButton} xButton`}
        id="closeButton"
        onClick={shouldClose}
      >
        <span className="fas fa-times" />
      </button>

      {loading && <Spinner />}
      {error && <p>Can&apos;t find movie info</p>}
      {Title &&
        <div className={styles.movieDetails}>
          <img
            src={Poster.match(/^http|^www/) ? Poster : Placeholder}
            alt={`${Title} movie poster`}
          />
          <h4>{`${Title} (${Year})`}</h4>
          <span>{`by ${Director}`}</span>
          <dl>
            <p>
              <dt>Runtime: </dt>
              <dd>{Runtime}</dd>
            </p>
            <p>
              <dt>Genre: </dt>
              <dd>{Genre}</dd>
            </p>
            <p>
              <dt>Language: </dt>
              <dd>{Language}</dd>
            </p>
            <p>
              <dt>Country: </dt>
              <dd>{Country}</dd>
            </p>
            <p>
              <dt>Director: </dt>
              <dd>{Director}</dd>
            </p>
            <p>
              <dt>Cast: </dt>
              <dd>{Actors}</dd>
            </p>
            <p>
              <dt>Plot: </dt>
              <dd>{Plot}</dd>
            </p>
          </dl>
        </div>
      }
    </div>
  );
};

export default MovieInfo;
