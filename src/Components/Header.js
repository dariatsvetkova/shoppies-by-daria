import React from "react";
import Logo from "../logo.svg";

function Header() {
    return (
        <header className="grid-container">
            <div className="heading">
                <img className="logo" src={Logo} alt="The Shoppies Movie Awards logo" />
                <h1>The Shoppies</h1>
            </div>
            <span className="subheading">First movie award that recognizes the entrepreneurial spirit</span>
            <div className="button-container">
                <a href="#search">
                    <button className="header-button">
                        Nominate directors
                    </button>
                </a>
            </div>
        </header>
    )
}

export default Header;