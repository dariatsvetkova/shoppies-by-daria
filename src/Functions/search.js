async function search(searchTerm, page, isSubmitted) {
  // Combine input into the url for the API request:
  const url = new URL('https://www.omdbapi.com/');
  const params = {
    s: searchTerm,
    type: 'movie',
    r: 'json',
    apikey: 'b56cbf95',
    page,
  };
  for (const key in params) {
    if (params.hasOwnProperty.call(params, key)) {
      url.searchParams.set(key, params[key]);
    }
  }

  // API request:
  const promise = await fetch(url);
  const response = await promise.json();

  // If the API doesn't return any movies,
  // assign a search alert based on the response:
  if (response.Response === 'False') {
    if (response.Error === 'Too many results.') {
      return {
        searchResults: [],
        totalResults: 0,
        searchAlert: isSubmitted ?
          'Too many results. Try to narrow your search.':
          '',
      };
    } else if (response.Error === 'Movie not found!') {
      return {
        searchResults: [],
        totalResults: 0,
        searchAlert: `Can't find "${searchTerm}". Try searching for something else.`,
      };
    }
  // If the API returns movies:
  } else {
    return {
      searchResults: response.Search,
      totalResults: response.totalResults,
      searchAlert: '',
    };
  }
};

export default search;
