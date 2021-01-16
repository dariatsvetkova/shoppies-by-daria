import React from "react";
import Logo from "../logo.svg";

function Footer() {
    return (
        <footer>
            <div className="heading">
                <img className="logo" src={Logo} alt="The Shoppies Movie Awards logo" />
                <span className="title">The Shoppies</span>
            </div>
            <a href="https://dariatsvetkova.ca" target="_blank" rel="noreferrer">
                made by Daria Tsvetkova
            </a>
            <small>Photo by D.Shevtsova via Pexels</small>
        </footer>
    )
}

export default Footer;