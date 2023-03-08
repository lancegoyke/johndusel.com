import Link from "next/link";
import styles from "../styles/Navbar.module.css";

export default function Navbar() {
  return (
    <header className={styles.menu}>
      <div className={styles.logo}>Admin User</div>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="#">Contact</Link>
      </nav>
    </header>
  );
}
