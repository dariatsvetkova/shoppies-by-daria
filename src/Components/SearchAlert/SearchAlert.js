import React from 'react';

import '../global.css';
import * as styles from './searchAlert.module.css';

const SearchAlert = ({searchAlert}) => (
  <div className={`${styles.searchAlert} box`}>
    <span>{searchAlert}</span>
  </div>
);

export default SearchAlert;
