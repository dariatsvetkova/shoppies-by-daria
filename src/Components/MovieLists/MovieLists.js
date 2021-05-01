import React, {useState, useEffect} from 'react';
import SearchBar from '../SearchBar/SearchBar';
import Nominations from '../Nominations/Nominations';

import '../global.css';
import * as styles from './movieLists.module.css';

const MovieLists = ({submit}) => {
  const [nominatedList, setNominated] = useState([]);

  useEffect(() => {
    // If there are items in local storage from before,
    // use them to set nominations:
    if (window.localStorage.length > 0) {
      const localItems = [];

      for (const key in window.localStorage) {
        if (key.match(/movie-[1-5]/)) {
          const item = localStorage.getItem(key);
          item !== 'undefined' &&
            localItems.push(JSON.parse(item));
        }
      }
      localItems.length > 0 && setNominated(localItems);
    }
  }, []);

  // Add a movie to the list of nominations:
  const nominate = (movie) => {
    const newList = [...nominatedList, movie];
    updateLocal(newList);
    return setNominated([...newList]);
  };

  // Remove a movie from the list of nominations:
  const remove = (movie) => {
    const ind = nominatedList.findIndex((m) =>
      m.imdbID === movie.imdbID && m.Title === movie.Title,
    );

    const newList = nominatedList;
    newList.splice(ind, 1);

    updateLocal(newList);
    return setNominated([...newList]);
  };

  // Update local storage whenever there is a change in nominations:
  const updateLocal = (list) => {
    for (let i = 0; i < 5; i++) {
      if (list[i]) {
        localStorage.setItem(
            `movie-${i + 1}`,
            JSON.stringify(list[i]),
        );
      } else {
        localStorage.removeItem(`movie-${i + 1}`);
      }
    }
  };

  return (
    <section className={`${styles.movieLists} gridContainer`} id="search">
      <h2>Choose your favourites</h2>
      <SearchBar
        nominate={nominate}
        nominatedList={nominatedList}
      />
      <Nominations
        nominatedList={nominatedList}
        remove={remove}
        submit={submit}
      />
    </section>
  );
};

export default MovieLists;
