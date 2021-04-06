import React from "react";
import Placeholder from "../../Images/placeholder.png";
import MovieInfo from "../MovieInfo/MovieInfo";

import "../global.css";
import * as styles from "./movieCard.module.css";

class MovieCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            viewingInfo: false
        }
        this.showInfo = this.showInfo.bind(this);
    }

    // Open/close the movie info card
    showInfo() {
        if (this.state.viewingInfo) {
            
            // If the card is closing, trigger the animation:
            let closedInfo = document.querySelector(".movieInfo");
            closedInfo.classList.add("disappear");

            setTimeout(() => 
                this.setState({ viewingInfo: false })
            , 300);

        } else {
            // Show the card:
            this.setState({ viewingInfo: true });
        }
    }

    render() {
        const { imdbID, Title, Year, Poster } = this.props.movie;
        const classCategory = "movieCard" + this.props.category[0].toUpperCase() + this.props.category.slice(1);

        return (
            <li>
                <article 
                    className={`${styles.movieCard} ${styles[classCategory]} box`}
                    id={imdbID}
                >
                    <div>
                        <img 
                            src={Poster.match(/^http|^www/) ? Poster : Placeholder}
                            alt={`${Title} movie poster`}
                        />
                        <h4 className={styles.movieTitle}>{Title} ({Year})</h4>
                    </div>
    
                    <div className={styles.movieCardButtons}>
                        <button 
                            className={styles.infoButton}
                            onClick={this.showInfo}
                            >
                            i
                        </button>

                        {this.props.category === "search" &&
                            <button 
                                value={this.props.movie}
                                onClick={() => this.props.nominate(this.props.movie)}
                                disabled={this.props.disableNominate}
                            >
                                Nominate
                            </button>
                        }
                        {this.props.category === "nominations" &&
                            <button 
                                className="removeButton"
                                value={this.props.movie}
                                onClick={() => this.props.remove(this.props.movie)}
                            >
                                <span className="fas fa-times"></span>
                            </button>
                        }
                    </div>
                </article>

                {this.state.viewingInfo &&
                    <MovieInfo 
                        imdbID={imdbID}
                        Year={Year}
                        showInfo={this.showInfo}
                    />
                }
            </li>
        );
    }
}

export default MovieCard;