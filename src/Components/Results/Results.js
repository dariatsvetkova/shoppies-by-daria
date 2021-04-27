import React, {useState, useEffect} from 'react';
import MovieCard from '../MovieCard/MovieCard';

import '../global.css';
import * as styles from './results.module.css';

const Results = ({
  searchTerm,
  searchResults,
  totalResults,
  nominatedList,
  nominate,
  search,
  getMovieInfo,
}) => {
  const [page, setPage] = useState(1);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    // Show the back-to-top button when
    // the search results are scrolled past a certain point:
    const watchScroll = () => {
      searchBar.getBoundingClientRect().top < 0 &&
        setShowTop(true);
      searchBar.getBoundingClientRect().top >= 0 &&
        setShowTop(false);
    };

    const searchBar = document.getElementById('search-text-field');
    window.addEventListener('scroll', watchScroll, false);
    return () => window.removeEventListener('scroll', watchScroll);
  });

  // Get IDs of all nominated movies
  // (prevents movies from local storage from being nominated twice):
  const disableNominate = nominatedList.map((movie) =>
    movie.imdbID,
  );

  return (
    <div className={`${styles.searchResults} box`}>
      <h3>
        {totalResults}
        {' '}
        results found for &quot;
        {searchTerm}
        &quot;:
      </h3>
      <ul>
        {searchResults.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            category="search"
            disableNominate={disableNominate.indexOf(movie.imdbID) >= 0 ||
              nominatedList.length === 5}
            nominate={nominate}
            getMovieInfo={getMovieInfo}
          />
        ))}

        {totalResults > page * 10 &&
          <button
            className={styles.showMoreButton}
            onClick={() => {
              // Send a search request for the next page of search results:
              search(searchTerm, page + 1, false);
              return setPage(page + 1);
            }}
          >
            Show more
          </button>
        }
      </ul>

      {showTop &&
        <button className={`${styles.toTopButton} arrowButton`}>
          <a href="#search">
            <span className="fas fa-angle-up" />
          </a>
        </button>
      }
    </div>
  );
};

export default Results;
