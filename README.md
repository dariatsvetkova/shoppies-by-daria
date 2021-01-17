# The Shoppies by Daria
 
An application used to search movies and nominate them for The Shoppies, a fictional movie award. Built with React, [Create React App](https://github.com/facebook/create-react-app), JavaScript and CSS.
 
## Features
 
The features are based on the challenge requirements; all the extras are marked with :sparkles:.
 
### Movie search:
 
The app uses the [OMDB] (http://www.omdbapi.com) API to search for movies by title. The search is intentionally limited to movies only.
 
:sparkles: The API only returns 10 results per request. If the search returns over 10 results, the Show More button displays pages 2+ of the search results.

:sparkles: If the search returns too many results or no results at all, an alert is displayed instead of the search results.

:sparkles: The ` i ` button allows viewing the detailed info about each movie, fetched from the same API.
 
 
### Nominating the movies:
 
Users are requested to nominate five movies from their search results. Their nominations appear under Your Nominations. From there, the user can view detailed information about the movie or remove it from nominations.
 
:sparkles: Nominations are saved to the browser's local storage and restored next time they visit the page (unless they've submitted the nominations in their previous session).
 
 
### Submitting the nominations:
 
When the user has selected five movies, a banner appears next to the nominations, allowing them to submit their choice.
 
:sparkles: The submission triggers a confirmation screen to appear.

:sparkles: The nominations are removed from the local storage on submission, making the app reusable for demonstration purposes.
 
### UI features:
 
:sparkles: CSS animations are added for the app's welcome screen, loading search results and movie details; opening/closing the movie details card; adding/removing movies from the list; appearing/disappearing of the banner.

:sparkles: Nominations list sticks to the top of the page when the user scrolls through search results, allowing easy access.

:sparkles: When 5 movies have been selected, the banner appears within the Nominations box to notify the user that they can now submit their choice.

:sparkles: On smaller screens, the Nominations box becomes collapsible and shows the total number of nominations to improve usability.

:sparkles: Back-to-top button appears at the bottom of the screen when a user scrolls through search results.
 
 
## Installation and Setup Instructions
 
Clone this repository and make sure you have node and npm installed globally.
 
Installation: `npm install`
 
To Start Server: `npm start`
 
To Visit App: open `localhost:3000/` in your browser.
 
 
## Project Premise
 
This project was created as a part of the Shopify internship application. The task was to build a tool to allow entrepreneurs to vote for their favourite movies.
 
I took a moment to think about how to make this look more like a real-world app. This gave me the idea to make this award about recognizing the movie directors’ entrepreneurial spirit - the one thing that they share with all other entrepreneurs.
 
Based on this idea, I wanted to make the whole project about the directors rather than the movies. It would be logical to allow a search by director's name and nominating directors. However, I couldn’t implement this because OMDB API doesn't allow search by director's name. It would be possible with a different API but would be too far from the initial task. That's why I eventually limited this concept to some bits of text within the app.
