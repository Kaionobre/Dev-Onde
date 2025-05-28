"use client"; // garante que useRouter funcione
import styles from "./Navbar.module.css";
import { useRouter } from "next/navigation";
import { MapPin } from "lucide-react"; // certifique-se de ter essa importação

export default function Navbar() {
  const router = useRouter();

  const handleCadastroClick = () => {
    router.push("/auth/registro");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContent}>
        <div className={styles.logo}>
          <span>Dev onde?</span>
          <MapPin size={20} color="orange" className={styles.icon} /> </div>
          
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
