"use client"; // garante que useRouter funcione
import styles from "./Navbar.module.css";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleEntrarClick = () => {
    router.push("/auth/login");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContent}>
        <div className={styles.logo}>
          Dev onde? <span className={styles.icon}>⚡</span>
        </div>

        <div className={styles.links}>
          <a href="#">Quem somos?</a>
          <a href="#">O que buscamos?</a>
          <a href="#">Comunidade</a>

          <button onClick={handleEntrarClick} className={styles.loginButton}>
            Entrar
          </button>
        </div>
      </div>
      <div className={styles.bottomLine}></div>
    </nav>
  );
}
