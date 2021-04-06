import React from "react";
import Banner from "../Banner/Banner";
import MovieCard from "../MovieCard/MovieCard";
import animateUnmount from "../animateUnmount";

import "../global.css";
import * as styles from "./nominations.module.css";

const AnimatedBanner = animateUnmount(Banner);

class Nominations extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
        this.open = this.open.bind(this);
    }

    open() {
        this.setState(prevState => {
            return { isOpen: !prevState.isOpen }
        });
    }

    componentDidUpdate() {

        // Update items in the local storage based on new props
        // (could be optimized with memoization?):
        for (let i = 0; i < 5; i++) {
            if (this.props.nominatedList[i]) {
                localStorage.setItem(
                    `movie-${i + 1}`,
                    JSON.stringify(this.props.nominatedList[i])
                )
            } else {
                localStorage.removeItem(`movie-${i + 1}`);
            }
        }
    }

    render() {

        const listLength = this.props.nominatedList.length;

        return (
            <section className={`${styles.nominations} ${this.state.isOpen ? styles.nominationsActive : ""} box`}>
                <div className={styles.nominationsHeading}>
                    <h3>Your nominations: <span className={styles.nominationsCount}>{listLength}</span></h3>
                    <button 
                        className={`${styles.dropdownButton} arrowButton`}
                        onClick={this.open}
                    >
                        <span className={this.state.isOpen ? "fas fa-angle-up" : "fas fa-angle-down"}></span>
                    </button>
                </div>
    
                <AnimatedBanner 
                    isMounted={listLength === 5}
                    el={document.querySelector(".banner")}
                    submit={this.props.submit}
                />
    
                {listLength === 0 ?
                    <p className={styles.nominationsPlaceholder}>No movies nominated yet</p> :
    
                    <ul className={styles.nominatedList}>
                        {this.props.nominatedList.map(movie => {
                            return (
                                <MovieCard
                                    key={movie.imdbID}
                                    movie={movie}
                                    category="nominations"
                                    isNominated={true}
                                    remove={this.props.remove}
                                    getMovieInfo={this.props.getMovieInfo}
                                />
                            )
                        })}
                    </ul>
                }
            </section>
        )
    }
}

export default Nominations;