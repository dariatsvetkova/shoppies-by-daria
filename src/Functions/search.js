async function search(searchTerm, page) {
  // Remove unwanted characters, double and trailing spaces from search query:
  function cleanSearchTerm(string) {
    const array = string.toLowerCase().split('');
    const cleanArray = array.filter((symbol, ind) => {
      if ((ind === 0 ||
          ind === array.length - 1) &&
          (/\s/).test(symbol)) {
        return false;
      } else if ((/\s/).test(symbol) && (/\s/).test(array[ind + 1])) {
        return false;
      } else {
        return (/[a-z\d\s\-]/).test(symbol);
      }
    });
    return cleanArray.join('');
  }

  const query = cleanSearchTerm(searchTerm);
  if (query === '') {
    return {
      searchResults: [],
      totalResults: 0,
      error: '',
    };
  } else {
    // Combine input into the url for the API request:
    const url = new URL('https://www.omdbapi.com/');
    const params = {
      s: query,
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

    // If the API doesn't return any movies:
    if (response.Response === 'False') {
      return {
        searchResults: [],
        totalResults: 0,
        error: response.Error,
      };
    // If the API returns movies:
    } else {
      return {
        searchResults: response.Search,
        totalResults: response.totalResults,
        error: '',
      };
    }
  }
};

export default search;
