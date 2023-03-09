import Link from "next/link";
import styles from "../styles/Navbar.module.css";

export default function Navbar({ showLogo = true }: { showLogo?: boolean }) {
  return (
    <header className={styles.menu}>
      {showLogo && <div className={styles.logo}>Admin User</div>}
      <nav>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/posts">Writing</Link>
      </nav>
    </header>
  );
}
