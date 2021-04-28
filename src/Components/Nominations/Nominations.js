import React, {useState, useEffect} from 'react';
import Banner from '../Banner/Banner';
import MovieCard from '../MovieCard/MovieCard';

import '../global.css';
import * as styles from './nominations.module.css';

const Nominations = ({
  nominatedList,
  submit,
  remove,
  getMovieInfo,
}) => {
  const [open, setOpen] = useState(false);

  // Update items in the local storage based on new props
  useEffect(() => {
    console.log('updating local storage');
    for (let i = 0; i < 5; i++) {
      if (nominatedList[i]) {
        localStorage.setItem(
            `movie-${i + 1}`,
            JSON.stringify(nominatedList[i]),
        );
      } else {
        localStorage.removeItem(`movie-${i + 1}`);
      }
    }
  }, [nominatedList]);

  const listLength = nominatedList.length;

  return (
    <section className={`${styles.nominations} ${open ? styles.nominationsActive : ''} box`}>
      <div className={styles.nominationsHeading}>
        <h3>
          Your nominations:
          <span className={styles.nominationsCount}>{listLength}</span>
        </h3>
        <button
          className={`${styles.dropdownButton} arrowButton`}
          onClick={() => setOpen(!open)}
        >
          <span className={open ?
            'fas fa-angle-up' :
            'fas fa-angle-down'} />
        </button>
      </div>

      {listLength === 5 &&
        <Banner submit={submit} />
      }

      {listLength === 0 ?
        <p className={styles.nominationsPlaceholder}>
          No movies nominated yet
        </p> :

        <ul className={styles.nominatedList}>
          {nominatedList.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              category="Nominations"
              isNominated
              remove={remove}
              getMovieInfo={getMovieInfo}
            />
          ))}
        </ul>
      }
    </section>
  );
};

export default Nominations;
