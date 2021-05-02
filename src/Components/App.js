import React, {useState, useEffect} from 'react';
import Greeting from './Greeting/Greeting';
import Layout from './Layout/Layout';
import Submitted from './Submitted/Submitted';
import MovieLists from './MovieLists/MovieLists';

import './global.css';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Finish the greeting animation:
    setTimeout(() => setLoading(false), 3000);
    console.log('Hi there ( ^_^)／');
  }, []);

  const submit = () => {
    // Remove the search section once the nominations are submitted:
    setSubmitted(true);
    // Clear local storage to make the app reusable for testing purposes:
    localStorage.clear();
  };

  return (
    <>
      {loading ?
        <Greeting /> :
        <div className="app">
          <Layout>
            {submitted ?
              <Submitted /> :
              <MovieLists submit={submit} />
            }
          </Layout>
        </div>
      }
    </>
  );
};

export default App;
