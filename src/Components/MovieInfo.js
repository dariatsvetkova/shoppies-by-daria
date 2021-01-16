import React from "react";
import Placeholder from "../placeholder.png";
import Loading from "./Loading";

class MovieInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            movie: {}
        }
        this.shouldClose = this.shouldClose.bind(this);
    }

    // Listen for clicks on the close button or outside of the card to close it:
    shouldClose(event) {
        const activeItem = document.querySelector(".movie-info"),
            closeButton = document.getElementById("close-button");

        if (!activeItem.contains(event.target) || closeButton.contains(event.target)) {
            this.props.showInfo();
        }
    }

    componentDidMount() {
        document.getElementById("root").addEventListener("click", this.shouldClose, false);

        // Fetch movie details from the API:
        let url = new URL("http://www.omdbapi.com/"),
            params = {
                i: this.props.imdbID,
                y: this.props.Year,
                type: "movie",
                r: "json",
                apikey: "b56cbf95",
            }
            
        for (let key in params) {
            url.searchParams.set(key, params[key]);
        }

        fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Can't find movie info");
            }
            return response.json();
        })
        .then(response => 
            this.setState({
                isLoading: false,
                movie: response
            })
        );
    }

    componentWillUnmount() {
        document.getElementById("root").removeEventListener("click", this.shouldClose);
    }

    render() {
        const { Title, Year, Poster, Director, Runtime, Genre, Language, Country, Actors, Plot} = this.state.movie

        return (
            <div className="movie-info box">

                <button 
                    className="close-button"
                    id="close-button"
                    onClick={this.shouldClose}
                >
                    <span className="fas fa-times"></span>
                </button>

                {this.state.isLoading ?
                    <Loading /> :
                    <div className="movie-details">
                        <img 
                            src={Poster.match(/^http|^www/) ? Poster : Placeholder}
                            alt={`${Title} movie poster`} 
                        />
                        <h4>{`${Title} (${Year})`}</h4>
                        <span>{`by ${Director}`}</span>
                        <dl>
                            <p><dt>Runtime: </dt><dd>{Runtime}</dd></p>
                            <p><dt>Genre: </dt><dd>{Genre}</dd></p>
                            <p><dt>Language: </dt><dd>{Language}</dd></p>
                            <p><dt>Country: </dt><dd>{Country}</dd></p>
                            <p><dt>Director: </dt><dd>{Director}</dd></p>
                            <p><dt>Cast: </dt><dd>{Actors}</dd></p>
                            <p><dt>Plot: </dt><dd>{Plot}</dd></p>
                        </dl>
                    </div>
                }
            </div>    
        )
    }
}

export default MovieInfo;