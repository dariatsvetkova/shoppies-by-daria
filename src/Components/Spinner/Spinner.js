import React from 'react';

import * as styles from './spinner.module.css';

const Spinner = () => (
  <div className={`${styles.spinnerContainer} appear`}>
    <div className={styles.spinnerBackground}>
      <div className={styles.spinner} />
    </div>
  </div>
);

export default Spinner;
