import React from 'react';
import Logo from '../../Images/logo.svg';

import '../global.css';
import * as styles from './layout.module.css';

const Layout = ({children}) => (
  <>
    <header className="gridContainer appear">
      <div className={styles.heading}>
        <img
          className={styles.logo}
          src={Logo}
          alt="The Shoppies Movie Awards logo"
        />
        <h1>The Shoppies</h1>
      </div>
      <span className={styles.subheading}>
        First movie award that recognizes the entrepreneurial spirit
      </span>
      <div className={styles.buttonContainer}>
        <a href="#search">
          <button>
            Nominate directors
          </button>
        </a>
      </div>
    </header>

    <main className="appear">
      <section className={`${styles.intro} gridContainer`}>
        <h2>Recognizing film entrepreneurs</h2>
        <article>
          <p>{`There is one thing that Shopify store owners and movie directors have in common: they are all entrepreneurs. We would like to honour our favourite movie directors by awarding them with The Shoppies, the first movie award based on the votes of eCommerce entrepreneurs.`}</p>
        </article>
      </section>

      {children}
    </main>

    <footer className="appear">
      <div className={styles.heading}>
        <img
          className={styles.logo}
          src={Logo}
          alt="The Shoppies Movie Awards logo"
        />
        <span className={styles.title}>The Shoppies</span>
      </div>
      <a href="https://dariatsvetkova.ca" target="_blank" rel="noreferrer">
        made by Daria Tsvetkova
      </a>
      <small>Photo by D.Shevtsova via Pexels</small>
    </footer>
  </>
);

export default Layout;
