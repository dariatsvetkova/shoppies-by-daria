import "../global.css";
import * as styles from "./submitted.module.css";

const Submitted = () => (
    <section className={`${styles.submitted} gridContainer`}>
        <h2>Thank you!</h2>
        <article>
            <p>Your Shoppies nominations have been submitted.</p>
            <p>The winners will be announced no later than February 12, 2021.</p>
            <p>Stay tuned!</p>
        </article>
    </section>
)

export default Submitted;