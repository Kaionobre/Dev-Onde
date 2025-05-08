"use client"; // garante que useRouter funcione
import styles from "./Navbar.module.css";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleCadastroClick = () => {
    router.push("/auth/registro");
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

          <button onClick={handleCadastroClick} className={styles.loginButton}>
            Cadastrar
          </button>
        </div>
      </div>
      <div className={styles.bottomLine}></div>
    </nav>
  );
}
