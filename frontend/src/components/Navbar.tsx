import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContent}>
        <div className={styles.logo}>
          Dev onde? <span className={styles.icon}>⚡</span>
        </div>

        <div className={styles.links}>
          <a href="#">Quem somos?</a>
          <a href="#">O que buscamos?</a>
          <a href="#">Conecte-se</a>
          <button className={styles.loginButton}>Entrar</button>
        </div>
      </div>
      <div className={styles.bottomLine}></div>
    </nav>
  );
}
