import React, {useState, useEffect} from 'react';

import '../global.css';
import * as styles from './topButton.module.css';

const TopButton = () => {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    // Listen for page scroll and show the back-to-top button:
    const watchScroll = () => {
      searchBar.getBoundingClientRect().top < 0 &&
      setShowTop(true);
      searchBar.getBoundingClientRect().top >= 0 &&
      setShowTop(false);
    };
    const searchBar = document.getElementById('search-text-field');
    window.addEventListener('scroll', watchScroll, false);
    return () => window.removeEventListener('scroll', watchScroll);
  });

  return (
    <>
      {showTop &&
        <button className={`${styles.toTopButton} arrowButton`}>
          <a href="#search">
            <span className="fas fa-angle-up" />
          </a>
        </button>
      }
    </>
  );
};

export default TopButton;
