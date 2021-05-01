import React, {useState} from 'react';
import Banner from '../Banner/Banner';
import MovieCard from '../MovieCard/MovieCard';

import '../global.css';
import * as styles from './nominations.module.css';

const Nominations = ({
  nominatedList,
  submit,
  remove,
}) => {
  // Open/close the drop-down list on mobile:
  const [open, setOpen] = useState(false);

  const listLength = nominatedList.length;

  return (
    <section className={`
      ${styles.nominations} 
      ${open ? styles.nominationsActive : ''} 
      box`
    }>
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
          {nominatedList.map((movie) => {
            return (
              <MovieCard
                key={`Nominations-${movie.imdbID}`}
                movie={movie}
                category="Nominations"
                remove={remove}
              />
            );
          })}
        </ul>
      }
    </section>
  );
};

export default Nominations;
