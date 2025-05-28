"use client"
import styles from "./Navbar.module.css"
import { useRouter } from "next/navigation"
import { MapPin } from "lucide-react"; // certifique-se de ter essa importação


export default function Navbar() {
  const router = useRouter()

  const handleSairClick = () => {
    // Remove os tokens do localStorage
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    
    // Redireciona para a página de login
    router.push("/auth/login")
  }

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

          <button onClick={handleSairClick} className={styles.loginButton}>
            Sair
          </button>
        </div>
      </div>
      <div className={styles.bottomLine}></div>
    </nav>
  )
}