import React from 'react';

import {
  FaFacebookF,
  FaTwitter,
} from 'react-icons/fa';

import '../global.css';
import * as styles from './submitted.module.css';

const Submitted = () => {
  const text = encodeURIComponent(
      `I\'ve nominated movies for The Shoppies award! Share your favourite movies too:`,
  );
  const url = 'https://dariatsvetkova.github.io/shoppies-by-daria/';
  return (
    <section className={`${styles.submitted} gridContainer appear`}>
      <h2>Thank you!</h2>
      <article>
        <p>Your Shoppies nominations have been submitted.</p>
        <p>Share on social media:</p>
        <div>
          <button className={`${styles.socialButton} iconButton`}>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
              target="_blank"
              rel="noreferrer"
              title="Share on Facebook"
            >
              <FaFacebookF />
            </a>
          </button>
          <button className={`${styles.socialButton} iconButton`}>
            <a
              href={`https://twitter.com/intent/tweet?url=${url}&text=${text}`}
              target="_blank"
              rel="noreferrer"
              title="Share on Twitter"
            >
              <FaTwitter />
            </a>
          </button>
        </div>
      </article>
    </section>
  );
};

export default Submitted;
