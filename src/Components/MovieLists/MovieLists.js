import React, {useState, useEffect} from 'react';
import SearchBar from '../SearchBar/SearchBar';
import Nominations from '../Nominations/Nominations';

import '../global.css';
import * as styles from './movieLists.module.css';

const MovieLists = (props) => {
  const [nominatedList, setNominatedList] = useState([]);

  useEffect(() => {
    // If there are items from local storage, use them to set nominations:
    if (window.localStorage.length > 0) {
      const localItems = [];

      for (const key in window.localStorage) {
        if (key.match(/movie-[1-5]/)) {
          const item = localStorage.getItem(key);
          item !== 'undefined' &&
            localItems.push(JSON.parse(item));
        }
      }
      localItems.length > 0 && setNominatedList(localItems);
    }
  }, []);

  const nominate = (movie) => setNominatedList([...nominatedList, movie]);

  const remove = (movie) => {
    // Remove the element from the list of nominations
    const ind = nominatedList.indexOf(movie);
    const newNominated = nominatedList;
    newNominated.splice(ind, 1);
    return setNominatedList(newNominated);
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
        submit={props.submit}
      />
    </section>
  );
};

export default MovieLists;
