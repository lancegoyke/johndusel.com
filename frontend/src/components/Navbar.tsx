import styles from '../styles/Navbar.module.css'

export default function Navbar() {
  return (
    <header className={styles.menu}>
      <div className={styles.logo}>Admin User</div>
      <nav>
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </nav>
    </header>
  )
}