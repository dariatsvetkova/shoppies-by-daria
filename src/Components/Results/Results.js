import React from 'react';
import MovieCard from '../MovieCard/MovieCard';

import '../global.css';
import * as styles from './results.module.css';

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resultsPage: 1,
      showToTop: false,
    };
    this.showMore = this.showMore.bind(this);
    this.watchScroll = this.watchScroll.bind(this);
  }

  // Send a search request for the next page of search results:
  showMore() {
    this.setState((prevState) => ({
      resultsPage: prevState.resultsPage + 1,
    }), () => (
      this.props.search(this.props.searchTerm, this.state.resultsPage, false)),
    );
  }

  // Show the back-to-top button when
  // the search results are scrolled past a certain point:
  watchScroll() {
    const searchBar = document.getElementById('search-text-field');

    if (searchBar.getBoundingClientRect().top < -window.screen.height &&
            this.state.showToTop === false) {
      this.setState({showToTop: true});
    } else if (searchBar.getBoundingClientRect().top >= -window.screen.height &&
            this.state.showToTop === true) {
      this.setState({showToTop: false});
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.watchScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.watchScroll);
  }

  render() {
    // Get IDs of all nominated movies
    // (prevents movies from local storage from being nominated twice):
    const disableNominate = this.props.nominatedList.map((movie) =>
      movie.imdbID,
    );

    return (
      <div className={`${styles.searchResults} box`}>
        <h3>
          {this.props.totalResults}
          {' '}
          results found for `&quot;`
          {this.props.searchTerm}
          `&quot;`:
        </h3>
        <ul>
          {this.props.searchResults.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              category="search"
              disableNominate={disableNominate.indexOf(movie.imdbID) >= 0 ||
                this.props.nominatedList.length === 5}
              nominate={this.props.nominate}
              getMovieInfo={this.props.getMovieInfo}
            />
          ))}

          {this.props.totalResults > this.state.resultsPage * 10 &&
            <button
              className={styles.showMoreButton}
              onClick={this.showMore}
            >
              Show more
            </button>
          }
        </ul>

        {this.state.showToTop &&
          <button className={`${styles.toTopButton} arrowButton`}>
            <a href="#search">
              <span className="fas fa-angle-up" />
            </a>
          </button>
        }
      </div>
    );
  }
}

export default Results;
