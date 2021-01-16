import React from "react";

function Search(props) {
    return (
        <section className="search">                
            <form 
                className="search-bar box"
                onSubmit={props.handleSubmit}
            >
                <label>
                    We invite you to acknowledge your favourite directors by nominating their movies in the search results below.
                    <br/>
                    Please select 5 movies.
                </label>
                <fieldset>
                    <input
                        name="search-text"
                        id="search-text-field"
                        placeholder="Search for the movie to nominate"
                        value={props.searchTerm}
                        onChange={props.handleChange}
                        type="search"
                        style={{ fontSize: "1em" }}
                    />
                    <button 
                        className="search-button"
                        value="Submit"
                    >
                        <span className="fas fa-search"></span>
                    </button>
                </fieldset>
            </form>
        </section>
    )
}

export default Search;