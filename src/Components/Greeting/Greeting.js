import React from "react";
import Logo from "../../Images/logo.svg";

import "../global.css";
import * as styles from "./greeting.module.css";

const Greeting = () => (
  <div className={styles.greeting}>
    <img className={styles.logo} src={Logo} alt="The Shoppies Movie Awards logo" />
    <div>
      <p>Welcome to</p>
      <p className={styles.title}>The Shoppies</p>
      <p>2021</p>
    </div>
  </div>
);

export default Greeting;
