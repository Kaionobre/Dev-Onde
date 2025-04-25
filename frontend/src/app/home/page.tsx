"use client"
import styles from "./Home.module.css"
import Navbar from "@/components/navbar_sair/Navbar"
import { useRouter } from "next/navigation"
import ProtectedRoute from "@/components/guardiao_rota/ProtectedRoute"

export default function HomePage() {
  return (
    <ProtectedRoute>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.section}>
          <h1 className={styles.title}>
            Vamos te ajudar a se conectar com desenvolvedores locais e de regiões próximas,
            aqui vamos te orientar sobre os próximos passos.
          </h1>
          <p className={styles.subtitle}>Acesse os ícones abaixo para mais informações</p>

          <div className={styles.cards}>
            <div className={styles.card}>
              <img src="/imagens/community.png" alt="Comunidade" />
              <p>Clique aqui e acesse a comunidade</p>
            </div>

            <div className={styles.card}>
              <img src="/imagens/whatsapp-icon.png" alt="WhatsApp" />
              <p>Junte-se a nós no WhatsApp</p>
            </div>

            <div className={styles.card}>
              <img src="/imagens/forms-icon.png" alt="Forms" />
              <p>Preencha o forms para concorrer a vagas</p>
            </div>

            <div className={styles.card}>
              <img src="/imagens/oportunidades-icon.png" alt="Emprego e inovação" />
              <p>Encontre oportunidades de emprego e inovação</p>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}