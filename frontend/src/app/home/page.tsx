"use client"
import styles from "./Home.module.css"
import Navbar from "@/components/navbar_sair/Navbar"
import { useRouter } from "next/navigation"
import ProtectedRoute from "@/components/guardiao_rota/ProtectedRoute"

export default function HomePage() {
  return (
    <ProtectedRoute>
      <Navbar />
      <div className={styles.page}>
        {/* Seção de introdução melhorada */}
        <section className={styles.section}>
          <h2 className={styles.title}>
            Vamos te ajudar a se conectar com desenvolvedores locais e de regiões próximas,
            aqui vamos te orientar sobre os próximos passos.
          </h2>
          <p className={styles.subtitle}>Acesse os ícones abaixo para mais informações</p>
        </section>

        {/* Seção de cards melhorada */}
        <section className={styles.cardsSection}>
          <div className={styles.cards}>
            <div className={styles.card}>
              <img src="/imagens/discord.png" alt="Comunidade" />
              <p>Clique aqui e acesse a comunidade</p>
            </div>
            <div className={styles.card}>
              <img src="/imagens/whatsapp.png" alt="WhatsApp" />
              <p>Junte-se a nós no WhatsApp</p>
            </div>
            <div className={styles.card}>
              <img src="/imagens/forms.png" alt="Forms" />
              <p>Preencha o forms para concorrer a vagas</p>
            </div>
            <div className={styles.card}>
              <img src="/imagens/vaga.png" alt="Emprego e inovação" />
              <p>Encontre oportunidades de emprego e inovação</p>
            </div>
          </div>
        </section>

        {/* Seção de informações com newsletter e depoimentos melhorados */}
        <section className={styles.infoSection}>
          {/* Newsletter com tema roxo e botão laranja */}
          <div className={styles.newsletterSection}>
            <h2 className={styles.newsletterTitle}>Fique por dentro das novidades</h2>
            <p className={styles.newsletterText}>
              Assine nossa newsletter e receba as melhores oportunidades e eventos da sua região diretamente no seu email.
            </p>
            <div className={styles.newsletterForm}>
              <input
                type="email"
                placeholder="Seu melhor email"
                className={styles.newsletterInput}
              />
              <button className={styles.newsletterButton}>Assinar</button>
            </div>
          </div>

          {/* Depoimentos melhorados */}
          <div className={styles.testimonialsSection}>
            <h2 className={styles.sectionTitle}>O que dizem nossos usuários</h2>
            <div className={styles.testimonialCards}>
              <div className={styles.testimonialCard}>
                <div className={styles.testimonialHeader}>
                  <img src="/imagens/kaio.png" alt="Usuário" className={styles.testimonialAvatar} />
                  <div className={styles.testimonialUser}>
                    <h4 className={styles.testimonialName}>Kaio Nóbrega</h4>
                    <p className={styles.testimonialRole}>Dev Backend • Patos</p>
                  </div>
                </div>
                <p className={styles.testimonialText}>
                  "Através do Dev Onde consegui me conectar com desenvolvedores da minha região e participei de meetups que me ajudaram a crescer profissionalmente. Hoje faço parte de uma comunidade incrível!"
                </p>
              </div>

              <div className={styles.testimonialCard}>
                <div className={styles.testimonialHeader}>
                  <img src="/imagens/ester.png" alt="Usuário" className={styles.testimonialAvatar} />
                  <div className={styles.testimonialUser}>
                    <h4 className={styles.testimonialName}>Ester Medeiros</h4>
                    <p className={styles.testimonialRole}>Dev Frontend • Nova Olinda</p>
                  </div>
                </div>
                <p className={styles.testimonialText}>
                  "Encontrei minha atual posição através das vagas divulgadas aqui. O processo foi muito tranquilo e a comunidade me deu todo o suporte que precisei para me preparar para a entrevista."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer adicionado */}
        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <div className={styles.footerLogo}>
              Dev onde? <span className={styles.logoIcon}>⚡</span>
            </div>
            <p className={styles.footerText}>© 2025 Dev onde? - Conectando desenvolvedores pelo Brasil</p>
            <div className={styles.footerLinks}>
              <a href="#">Termos de Uso</a>
              <a href="#">Política de Privacidade</a>
              <a href="#">Contato</a>
            </div>
          </div>
        </footer>
      </div>
    </ProtectedRoute>
  );
}