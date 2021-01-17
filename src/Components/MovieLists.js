import React from "react";
import Search from "./Search"; 
import Nominations from "./Nominations";
import Results from "./Results";
import Loading from "./Loading";
import SearchAlert from "./SearchAlert";

class MovieLists extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            searchTerm: "",
            searchResults: [],
            totalResults: 0,
            searchAlert: "",
            nominatedList: []
        }
        this.nominate = this.nominate.bind(this);
        this.remove = this.remove.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.search = this.search.bind(this);   
    }

    componentDidMount() {

        // If there are items from local storage, use them to set nominations: 
        this.props.localItems &&
        this.props.localItems.length > 0 &&
            this.setState({ nominatedList: this.props.localItems })
    }

    nominate(movie) {

        // Add a movie to the list of nominations:
        this.setState((prevState) => {
          let newNominated = [...prevState.nominatedList, movie];
          return { nominatedList: newNominated }
        });
    }
    
    remove(movie) {

        // Trigger the animation on the removed element:
        let removedElem = document.querySelector(".nominated-list").querySelector(`#${movie.imdbID}`);
        removedElem.classList.add("unpop");

        // Remove the element from the list of nominations after the animation is finished:
        setTimeout(() =>     
            this.setState((prevState) => {

                let ind = prevState.nominatedList.indexOf(movie),
                    newNominated = prevState.nominatedList;
                
                newNominated.splice(ind, 1);
                return { nominatedList: newNominated }
            })
        , 300);
    }
    
    handleChange(event) {

        // Run the search function with the value from the search bar:
        let { value } = event.target;
        this.setState({ 
            isLoading: true,
            searchTerm: value
        }, () => 
            this.search(this.state.searchTerm.toLowerCase(), 1, false)
        );
    }

    handleSubmit(event) {

        // Force the search alert to show if there are no search results:
        event.preventDefault();
        this.search(this.state.searchTerm, 1, true);
    }

    search(searchTerm, page, isSubmitted) {
        
        // Trim spaces in the begining/end of the search term:
        if (searchTerm.match(/^\s/)) {
            searchTerm = searchTerm.slice(1,);
        } if (searchTerm.match(/\s$/)) {
            searchTerm = searchTerm.slice(0, searchTerm.length-1);
        }

        // Trim spaces in the begining/end of the search term:
        if (searchTerm.match(/^\s/)) {
            searchTerm = searchTerm.slice(1,);
        } if (searchTerm.match(/\s$/)) {
            searchTerm = searchTerm.slice(0, searchTerm.length-1);
        }

        // Reset the search term if the input field has been emptied:
        if (searchTerm === "") {
            return this.setState({
                isLoading: false,
                searchResults: [],
                searchAlert: "",
                totalResults: 0
            });
        }

        console.log("search term: ", searchTerm);

        // Combine input into the url for the API request:
        let url = new URL("https://www.omdbapi.com/"),
            params = {
                s: searchTerm,
                type: "movie",
                r: "json",
                apikey: "b56cbf95",
                page: page
            }
        
        for (let key in params) {
            url.searchParams.set(key, params[key]);
        }

        // API request:
        fetch(url)

        // Retreive the API data or show error:
        .then(response => {
            if (!response.ok) { 
                this.setState({
                    isLoading: false,
                    searchResults: [],
                    searchAlert: "Something went wrong. Please try again.",
                    totalResults: 0
                })
                throw new Error("Can't connect to the API")
            }
            return response.json();
        })

        // If the API doesn't return any movies, assign a search alert based on the response:
        .then(response => {
            if (response.Response === "False") {

                if (response.Error === "Too many results.") {
                    return this.setState({
                        isLoading: false,
                        searchResults: [],
                        searchAlert: isSubmitted && "Too many results. Try to narrow your search.",
                        totalResults: 0
                    });

                } else if (response.Error === "Movie not found!") {
                    return this.setState({ 
                        isLoading: false,
                        searchResults: [],
                        searchAlert: `Can't find "${searchTerm}". Try searching for something else.`,
                        totalResults: 0
                    });
                } else {
                    throw new Error("There was an error: ", response.Error)
                }

            // If the API returns movies:
            } else {

                // Since the API returns 10 results per page, 
                // for search pages 2 and over, add the results to the existing list:
                if (page > 1) {
                    let prevResults = this.state.searchResults,
                        newResults = [...prevResults, ...response.Search];

                    return this.setState({ 
                        isLoading: false,
                        searchResults: newResults,
                        searchAlert: ""
                    });

                // For search page 1, create new results:
                } else {
                    return this.setState({ 
                        isLoading: false,
                        searchResults: response.Search,
                        totalResults: response.totalResults,
                        searchAlert: ""
                    });
                }
            }
        })
    }

    render() {
        return (
            <section className="movie-lists grid-container" id="search">
                <h2>Choose your favourites</h2>
                <Search 
                    searchTerm={this.state.searchTerm}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                />

                <Nominations 
                    nominatedList={this.state.nominatedList}
                    remove={this.remove}
                    submit={this.props.submit}
                />

                {this.state.isLoading && 
                    <div className="search-loading box">
                        <Loading />
                    </div>                
                }

                {this.state.searchResults.length > 0 && 
                    <Results
                        searchTerm={this.state.searchTerm}
                        searchResults={this.state.searchResults}
                        totalResults={this.state.totalResults}
                        nominatedList={this.state.nominatedList}
                        nominate={this.nominate}
                        search={this.search}
                    />
                }

                {this.state.searchAlert.length > 0 &&
                    <SearchAlert searchAlert={this.state.searchAlert} />
                }
            </section>
        )
    }
}

export default MovieLists;
