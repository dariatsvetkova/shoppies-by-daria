import React from 'react';

import '../global.css';
import * as styles from './banner.module.css';

const Banner = ({submit}) => (
  <section className={`${styles.banner} box pop`}>
    <p>You have reached the maximum amount of nominations. Ready to submit?</p>
    <button onClick={submit}>Submit</button>
  </section>
);

export default Banner;
