import React from 'react';
import {FaAngleUp} from 'react-icons/fa';

import '../global.css';
import * as styles from './topButton.module.css';

const TopButton = () => {
  return (
    <button className={`${styles.toTopButton} iconButton`}>
      <a href="#search">
        <FaAngleUp />
      </a>
    </button>
  );
};

export default TopButton;
