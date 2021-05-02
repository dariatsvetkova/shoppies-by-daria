# The Shoppies by Daria
 
An app for searching movies and nominating them for The Shoppies, a fictional movie award. Built with React, [Create React App](https://github.com/facebook/create-react-app), JavaScript and CSS.


![App screenshot - top](https://user-images.githubusercontent.com/68360696/104829252-fc0fa600-583f-11eb-9a90-f09a66f0d99a.png)


## Installation and Setup Instructions
 
Clone this repository and make sure you have node and npm installed globally.
 
Installation: `npm install`
 
To start the server: `npm start`
 
To visit the app: open `localhost:3000/` in your browser.
  

## Features
 
The features are based on the Shopify challenge requirements; all the extras are marked with :sparkles:.

 
### Movie search:
 
The app uses the [OMDB](http://www.omdbapi.com) API to search for movies by title. The search is intentionally limited to movies only.
 
:sparkles: The API only returns 10 results per request. If the search returns over 10 results, the Show More button displays pages 2+ of the search results.

:sparkles: If the search returns too many results or no results at all, an alert is displayed instead of the search results.

:sparkles: The ` i ` button allows the user to view the detailed info about each movie, fetched from the same API.

 
### Nominating the movies:
 
The user is asked to nominate five movies from their search results. Their nominations appear under *Your Nominations*. From there, the user can view detailed information about the movie or remove it from nominations.
 
:sparkles: Nominations are saved to the browser's local storage and restored next time they visit the page (unless they've submitted the nominations in their previous session).


### Submitting the nominations:
 
When the user has selected five movies, a banner appears next to the nominations, allowing them to submit their choice.
 
:sparkles: The submission triggers a confirmation screen to appear.

:sparkles: The nominations are removed from the local storage on submission, making the app reusable for testing purposes.

:sparkles: Upon submission, a confirmation screen appears, with buttons for sharing the app on Facebook and Twitter.


### UI features:
 
:sparkles: CSS animations are added for the app's welcome screen, loading search results and movie details; opening/closing the movie details card; adding/removing movies from the list; appearing/disappearing of the banner.

:sparkles: Nominations list sticks to the top of the page when the user scrolls through search results, allowing easy access.

:sparkles: On smaller screens, the Nominations box becomes collapsible and shows the total number of nominations to improve usability.

:sparkles: When 5 movies have been selected, the banner appears within the Nominations box to notify the user that they can now submit their choice.

:sparkles: Back-to-top button appears at the bottom of the screen as the user scrolls through the search results.
