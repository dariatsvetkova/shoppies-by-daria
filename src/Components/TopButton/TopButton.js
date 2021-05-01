import React from 'react';

import '../global.css';
import * as styles from './topButton.module.css';

const TopButton = () => {
  console.log('rendering to-top button');
  return (
    <button className={`${styles.toTopButton} arrowButton`}>
      <a href="#search">
        <span className="fas fa-angle-up" />
      </a>
    </button>
  );
};

export default TopButton;
