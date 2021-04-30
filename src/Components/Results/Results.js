import React, {useState, useEffect} from 'react';
import search from '../../Functions/search';

import Spinner from '../Spinner/Spinner';
import MovieCard from '../MovieCard/MovieCard';
import TopButton from '../TopButton/TopButton';

import '../global.css';
import * as styles from './results.module.css';

const Results = ({
  searchTerm,
  submitted,
  nominatedList,
  nominate,
  getMovieInfo,
}) => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [totalResults, setTotal] = useState(null);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);

  const handleSearch = () => {
    setLoading(true);
    // Retrieve data from the API:
    search(searchTerm, page)
        .then((data) => {
          setTotal(data.totalResults);
          setError(data.error);

          // Since the API returns 10 results per page,
          // for pages 2+, add the results to the existing list:
          const newResults = page > 1 ?
          [...results, ...data.searchResults] :
          data.searchResults;

          // Filter out occasionally occuring repeated movies with the same id:
          const filteredResults = newResults.filter((movie, index, self) => {
            return index === self.findIndex((m) =>
              m.imdbID === movie.imdbID && m.Title === movie.Title);
          });
          setResults(filteredResults);
        })
        .catch(() => {
          setResults([]);
          setTotal(0);
          setError('Can\'t connect');
        })
        .finally(() => setLoading(false));
  };

  // If a search term updates, reset the results' page number:
  useEffect(() => {
    setPage(1);
    handleSearch(searchTerm, 1);
  }, [searchTerm]);

  // If the page number updates, request another page for the same search term:
  useEffect(() => {
    handleSearch(searchTerm, page);
  }, [page]);

  // Get IDs of all nominated movies
  // (prevents movies from local storage from being nominated twice):
  const disableNominate = nominatedList.map((movie) =>
    movie.imdbID,
  );

  // Set the error message based on the type of error:
  let alert = '';
  if (error.length > 0) {
    if (error === 'Too many results.') {
      // Since this error is returned for search terms <= 2 letters,
      // only show this alert after the user tries to submit the form:
      alert = submitted ?
        'Too many results. Try to narrow your search.':
        '';
    } else if (error === 'Movie not found!') {
      alert = `Can't find "${searchTerm}". Try searching for something else.`;
    } else {
      alert = error;
    }
  }

  return (
    <div className={`${styles.searchResults} box`}>
      {loading &&
        <Spinner />
      }
      {alert.length > 0 &&
        <p className={styles.searchAlert}>{alert}</p>
      }
      {results.length > 0 &&
        <div className={styles.resultList}>
          <h3>
            {totalResults}
            {' '}
            results found for &quot;
            {searchTerm}
            &quot;:
          </h3>
          <ul>
            {results.map((movie) =>
              <MovieCard
                key={movie.imdbID}
                movie={movie}
                category="Search"
                disableNominate={
                  disableNominate.indexOf(movie.imdbID) >= 0 ||
                  nominatedList.length === 5
                }
                nominate={nominate}
                getMovieInfo={getMovieInfo}
              />,
            )}
          </ul>
          {totalResults > page * 10 &&
            <button
              className={styles.showMoreButton}
              // Trigger an API call in useEffect:
              onClick={() => setPage(page + 1)}
            >
              Show more
            </button>
          }
        </div>
      }
      <TopButton />
    </div>
  );
};

export default Results;
