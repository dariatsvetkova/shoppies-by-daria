import React from "react";
import Placeholder from "../placeholder.png";
import MovieInfo from "./MovieInfo";

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
            let closedInfo = document.querySelector(".movie-info");
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

        return (
            <li>
                <article 
                    className={`movie-card movie-card-${this.props.category} box`}
                    id={imdbID}
                >
                    <div>
                        <img 
                            src={Poster.match(/^http|^www/) ? Poster : Placeholder}
                            alt={`${Title} movie poster`}
                        />
                        <h4 className="movie-title">{Title} ({Year})</h4>
                    </div>
    
                    <div className="movie-card-buttons">
                        <button 
                            className="info-button"
                            onClick={this.showInfo}
                            >
                            i
                        </button>

                        {this.props.category === "search" &&
                            <button 
                            className="nominate-button"
                            value={this.props.movie}
                            onClick={() => this.props.nominate(this.props.movie)}
                            disabled={this.props.disableNominate}
                            >
                                Nominate
                            </button>
                        }
                        {this.props.category === "nominations" &&
                            <button 
                            className="remove-button"
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