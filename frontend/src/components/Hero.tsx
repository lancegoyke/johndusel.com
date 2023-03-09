import styles from "../styles/Hero.module.css";

export default function Hero() {
  return (
    <div className={styles.heroContainer}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>{process.env.TITLE}</h1>
          <p>
            Doggo ipsum pupperino long doggo maximum borkdrive fat boi noodle
            horse smol borking doggo with a long snoot for pats, shibe borkdrive
            many pats.
          </p>
          <div className={styles.signup}>
            <p className={styles.cta}>Get notified when a new post comes out</p>
            <form>
              <input type="email" placeholder="you@example.com" required />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
