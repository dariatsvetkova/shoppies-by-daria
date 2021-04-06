// --- APP STRUCTURE ---

// App (this file) 
//    - retrieves items from local storage, if any 
//    - handles final submission of nominations

// a. Greeting / renders a welcome screen
// b. Main content
//   1. Header
//   2. Intro / renders a piece of text

//   3. Movie Lists
//       - handles API search requests, 
//        adding/removing nominations; 
//       - stores search results and nominations

//    3.1. Search / renders a search bar
//       - handles user input and passes it to Movie Lists

//    3.2a. Loading / renders loading animation
//    3.2b. Results / renders a list of movies
//             - sends requests to Movie Lists for showing 
//              pages 2+ of the search results; 
//             - handles showing/hiding "back to top" button 

//     3.2b.1. Movie Card (catogory: search) / renders a card with basic movie info
//               - handles opening/closing movie info card

//      3.2b.1.1. Movie Info / renders an overlay with detailed movie info
//                 - handles API requests for movie details

//    3.2c. Search Alert / renders an alert in case a search returns no results

//    3.3. Nominations / renders mobile UI components
//     3.3.1. Banner / renders a banner when 5 nominations have been selected
//           - sends final submission of nominations to App

//     3.3.2. Movie Card (category: nominations)
//             - (see above)
//       3.3.1.1.Movie Info
//               - (see above)

//   4. Submitted / renders a page section to replace Movie Lists after the submission
//   5. Footer

// -------

import React from "react";
import Greeting from "./Greeting/Greeting";
import Layout from "./Layout/Layout";
import Submitted from "./Submitted/Submitted";
import MovieLists from "./MovieLists/MovieLists"

import "./global.css";

// Check if there are nominated movies saved in local storage:
const checkStorage = () => {
  if (window.localStorage.length > 0) {

    let localItems = [],
        ind = 0;

    for (let key in window.localStorage) {
      if (key.match(/movie-[1-5]/)) {

        let item = localStorage.getItem(key);

        if (item !== "undefined") {
          localItems[ind] = JSON.parse(item);
          ind++;
        }
      }
    }
    return localItems.length > 0 && localItems;
  }
}

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      isLoading: true,
      isSubmitted: false
    }
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    // Finish the greeting animation:
    setTimeout(() => this.setState({ isLoading: false }), 3000);
  }

  submit() {
    // Remove the search page once the nominations are submitted;
    // Clear local storage to make the app reusable:
    this.setState({ isSubmitted: true });
    localStorage.clear();
  }

  render() {

    let localItems = checkStorage()

    return (
      <>
        {this.state.isLoading 
          ? <Greeting />
          : <div className="app">
            <Layout>
              {this.state.isSubmitted ?
                <Submitted /> :
                <MovieLists 
                  localItems={localItems}
                  submit={this.submit}/>
              }
            </Layout>
          </div>
        }
      </>
    );
  }
}

export default App;