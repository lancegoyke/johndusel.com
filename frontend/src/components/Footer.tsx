import Link from "next/link";
import styles from "../styles/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div>{process.env.TITLE} &copy; 2023</div>/
      <div>
        Powered by <Link href="https://lancegoyke.com/">Lance Goyke</Link>
      </div>
    </footer>
  );
}
