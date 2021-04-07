import React from 'react';
import Placeholder from '../../Images/placeholder.png';
import Spinner from '../Spinner/Spinner';

import '../global.css';
import * as styles from './movieInfo.module.css';

class MovieInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      movie: {},
    };
    this.shouldClose = this.shouldClose.bind(this);
  }

  // Listen for clicks on the close button or outside of the card to close it:
  shouldClose(event) {
    const activeItem = document.getElementById('movieInfo');
    const closeButton = document.getElementById('closeButton');

    if (!activeItem.contains(event.target) ||
      closeButton.contains(event.target)) {
      this.props.showInfo();
    }
  }

  componentDidMount() {
    document.getElementById('root')
        .addEventListener('click', this.shouldClose, false);

    // Fetch movie details from the API:
    const url = new URL('https://www.omdbapi.com/');
    const params = {
      i: this.props.imdbID,
      y: this.props.Year,
      type: 'movie',
      r: 'json',
      apikey: 'b56cbf95',
    };

    for (const key in params) {
      if (params.hasOwnProperty.call(params, key)) {
        url.searchParams.set(key, params[key]);
      }
    }

    fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Can\'t find movie info');
          }
          return response.json();
        })
        .then((response) => this.setState({
          isLoading: false,
          movie: response,
        }));
  }

  componentWillUnmount() {
    document.getElementById('root').
        removeEventListener('click', this.shouldClose);
  }

  render() {
    const {
      Title,
      Year,
      Poster,
      Director,
      Runtime,
      Genre,
      Language,
      Country,
      Actors,
      Plot,
    } = this.state.movie;

    return (
      <div className={`${styles.movieInfo} box`} id="movieInfo">

        <button
          className={`${styles.closeButton} xButton`}
          id="closeButton"
          onClick={this.shouldClose}
        >
          <span className="fas fa-times" />
        </button>

        {this.state.isLoading ?
          <Spinner /> :
          (
            <div className={styles.movieDetails}>
              <img
                src={Poster.match(/^http|^www/) ? Poster : Placeholder}
                alt={`${Title} movie poster`}
              />
              <h4>{`${Title} (${Year})`}</h4>
              <span>{`by ${Director}`}</span>
              <dl>
                <p>
                  <dt>Runtime: </dt>
                  <dd>{Runtime}</dd>
                </p>
                <p>
                  <dt>Genre: </dt>
                  <dd>{Genre}</dd>
                </p>
                <p>
                  <dt>Language: </dt>
                  <dd>{Language}</dd>
                </p>
                <p>
                  <dt>Country: </dt>
                  <dd>{Country}</dd>
                </p>
                <p>
                  <dt>Director: </dt>
                  <dd>{Director}</dd>
                </p>
                <p>
                  <dt>Cast: </dt>
                  <dd>{Actors}</dd>
                </p>
                <p>
                  <dt>Plot: </dt>
                  <dd>{Plot}</dd>
                </p>
              </dl>
            </div>
          )}
      </div>
    );
  }
}

export default MovieInfo;
