function Banner(props) {
    return (
        <section className="banner box">
            <p>You have reached the maximum amount of nominations. Ready to submit?</p>
            <button onClick={props.submit}>Submit</button>
        </section>
    )
}

export default Banner;