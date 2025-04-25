"use client"
import styles from "./Navbar.module.css"
import { useRouter } from "next/navigation"

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
          Dev onde? <span className={styles.icon}>⚡</span>
        </div>

        <div className={styles.links}>
          <a href="#">Quem somos?</a>
          <a href="#">O que buscamos?</a>
          <a href="#">Conecte-se</a>

          <button onClick={handleSairClick} className={styles.loginButton}>
            Sair
          </button>
        </div>
      </div>
      <div className={styles.bottomLine}></div>
    </nav>
  )
}