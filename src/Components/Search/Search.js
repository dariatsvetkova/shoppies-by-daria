import React from 'react';

import '../global.css';
import * as styles from './search.module.css';

const Search = (props) => {
  return (
    <section className={styles.search}>
      <form
        className={`${styles.searchBar} box`}
        onSubmit={props.handleSubmit}
      >
        <label>
          {`We invite you to acknowledge your favourite directors by nominating their movies in the search results below.`}
          <br />
          Please select 5 movies.
        </label>
        <fieldset>
          <input
            name="search-text"
            id="search-text-field"
            className={styles.searchTextField}
            placeholder="Search for the movie to nominate"
            value={props.searchTerm}
            onChange={props.handleChange}
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
  );
};

export default Search;
