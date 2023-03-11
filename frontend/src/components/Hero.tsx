import Link from "next/link";
import styles from "../styles/Hero.module.css";

export default function Hero() {
  return (
    <div className={styles.heroContainer}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>{process.env.SITE_TITLE}</h1>
          <p>
            <strong>
              <em>
                I am an Athletic Trainer and Strength & Conditioning Coach for
                the Atlanta Hawks.
              </em>
            </strong>
          </p>
          <p>
            I write about my experience working along the entire rehabilitation
            to performance spectrum.
          </p>
          <div className={styles.signup}>
            <p className={styles.cta}>
              Sign up to get notified when a new post comes out:
            </p>
            <form>
              <input type="email" placeholder="you@example.com" required />
              <button type="submit">Subscribe</button>
            </form>
          </div>
          <div className="alert warning">
            <p>
              <em>Upcoming:</em> I&apos;ll be speaking at the{" "}
              <Link href="https://elitebasketballrehabconference.com/">
                Elite Basketball Rehab Conference
              </Link>{" "}
              in July 2023
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
