import React, {useState} from 'react';
import Results from '../Results/Results';

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
    // Force the search alert to show if there are no search results:
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <section className={styles.search}>
        <form
          className={`${styles.searchBar} box`}
          onSubmit={handleSubmit}
        >
          <fieldset>
            <legend>
              {`We invite you to acknowledge your favourite directors by nominating their movies in the search results below.`}
              <br />
              Please select 5 movies.
            </legend>
            <input
              name="search-text"
              id="search-text-field"
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
        <Results
          searchTerm={searchTerm}
          submitted={submitted}
          nominate={props.nominate}
          nominatedList={props.nominatedList}
        />
      }
    </>
  );
};

export default Search;
