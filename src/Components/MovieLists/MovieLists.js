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
    const storageObj = localStorage.getItem('shoppies-by-daria');
    if (storageObj) {
      const localMovies = JSON.parse(storageObj);
      localMovies.length > 0 && setNominated(localMovies);
    }
  }, []);

  // Add a movie to the list of nominations:
  const nominate = (movie) => {
    const newList = [...nominatedList, movie];
    return updateNominated(newList);
  };

  // Remove a movie from the list of nominations:
  const remove = (movie) => {
    const ind = nominatedList.findIndex((m) =>
      m.imdbID === movie.imdbID && m.Title === movie.Title,
    );

    const newList = nominatedList;
    newList.splice(ind, 1);
    return updateNominated(newList);
  };

  // Update nominated list and local storage
  // whenever there is a change in nominations:
  const updateNominated = (list) => {
    localStorage.setItem(
        'shoppies-by-daria',
        JSON.stringify(list),
    );
    setNominated([...list]);
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
