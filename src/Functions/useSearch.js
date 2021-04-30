import {useState, useEffect} from 'react';

function useSearch(searchTerm, page) {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [totalResults, setTotal] = useState(0);
  const [error, setError] = useState('');

  // Reset the state if the input field has been emptied:
  function emptyResults() {
    setLoading(false);
    setResults([]);
    setTotal(0);
  };

  // Remove unwanted characters and trailing spaces from search query:
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

  // API request:
  function search(query, page) {
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

    console.log(url);

    fetch(url)
        .then((response) => response.json())
        .then((response) => {
          // If the API doesn't return any movies:
          if (response.Response === 'False') {
            emptyResults();
            setError(response.Error);
          // If the API returns movies:
          } else {
            // Since the API returns 10 results per page,
            // for search pages 2+, add the results to the existing list:
            page > 1 ?
                setResults([...results, ...response.Search]) :
                setResults(response.Search);
            setError('');
            setTotal(response.totalResults);
            setLoading(false);
          }
        })
        .catch(() => {
          emptyResults();
          setError('Unknown');
        });
  }

  useEffect(() => {
    console.log('useSearch is running');
    const query = cleanSearchTerm(searchTerm);
    if (query === '') {
      emptyResults();
      setError('');
    } else {
      search(query, page);
    }
  }, [searchTerm]);

  return {loading, results, totalResults, error, search};
};

export default useSearch;
