import React, {useState, useEffect, useRef} from 'react';
import search from '../../Functions/search';
import cleanSearchTerm from '../../Functions/cleanSearchTerm';

import Spinner from '../Spinner/Spinner';
import MovieCard from '../MovieCard/MovieCard';

import '../global.css';
import * as styles from './results.module.css';

const Results = ({
  searchTerm,
  submitted,
  nominatedList,
  nominate,
  getMovieInfo,
}) => {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [totalResults, setTotalResults] = useState(null);
  const [page, setPage] = useState(1);
  const [alert, setAlert] = useState('');

  // Store/access previous search term:
  const usePrev = (value) => {
    const prev = useRef();
    useEffect(() => {
      prev.current = value;
    });
    return prev.current;
  };

  const prevSearch = usePrev(searchTerm);

  useEffect(() => {
    setLoading(true);
    searchTerm !== prevSearch && setPage(1);

    // Remove unwanted characters and trailing spaces from search query:
    const query = cleanSearchTerm(searchTerm);

    // Reset the state if the input field has been emptied:
    const emptyResults = () => {
      setLoading(false);
      setResults([]);
      setTotalResults(0);
    };

    if (query === '') {
      emptyResults();
      setAlert('');
    } else {
      // Make the API request:
      search(query, page, submitted)
          .then((data) => {
            setLoading(false);
            setTotalResults(data.totalResults);
            setAlert(data.searchAlert);

          // Since the API returns 10 results per page,
          // for search pages 2+, add the results to the existing list:
          page > 1 ?
          setResults([...results, ...data.searchResults]) :
          setResults(data.searchResults);
          })
          .catch(() => {
            emptyResults();
            setAlert('Something went wrong. Please try again later.');
          });
    }
  }, [searchTerm, page, submitted]);

  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    // Listen for page scroll and show the back-to-top button:
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
