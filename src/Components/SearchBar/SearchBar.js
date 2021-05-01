import React, {useState, useEffect, useRef} from 'react';
import Results from '../Results/Results';
import TopButton from '../TopButton/TopButton';

import '../global.css';
import * as styles from './searchBar.module.css';

const Search = (props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    submitted && setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Force the search alert to show if there are no search results:
    setSubmitted(true);
  };

  // Listen for page scroll and show the back-to-top button:
  const [showTop, setShowTop] = useState(false);
  const searchBar = useRef(null);

  useEffect(() => {
    const watchScroll = () => {
      searchBar.current.getBoundingClientRect().top < 0 &&
        setShowTop(true);
      searchBar.current.getBoundingClientRect().top >= 0 &&
        setShowTop(false);
    };
    window.addEventListener('scroll', watchScroll, false);
    return () => window.removeEventListener('scroll', watchScroll);
  });

  return (
    <>
      <section className={styles.search}>
        <form
          className={`${styles.searchBar} box`}
          onSubmit={handleSubmit}
          ref={searchBar}
        >
          <fieldset>
            <legend>
              {`We invite you to acknowledge your favourite directors by nominating their movies in the search results below.`}
              <br />
              Please select 5 movies.
            </legend>
            <input
              name="search-text"
              className={styles.searchTextField}
              placeholder="Search for the movie to nominate"
              value={searchTerm}
              onChange={handleChange}
              type="search"
              style={{fontSize: '1em'}}
            />
            <button
              className={styles.searchButton}
              value="Submit"
            >
              <span className="fas fa-search" />
            </button>
          </fieldset>
        </form>
      </section>
      {searchTerm.length > 0 &&
        <>
          <Results
            searchTerm={searchTerm}
            submitted={submitted}
            nominatedList={props.nominatedList}
            nominate={props.nominate}
          />
          {showTop && <TopButton />}
        </>
      }
    </>
  );
};

export default Search;
