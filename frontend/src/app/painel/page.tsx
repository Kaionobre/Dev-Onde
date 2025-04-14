'use client';
import styles from "./HomePage.module.css";
import Image from "next/image";
import { MapPin, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <>
      {/* Navbar fixa no topo */}
      <nav className={styles.navbar}>
        <div className={styles.navContent}>
          <div className={styles.logo}>
            Dev onde? <span className={styles.logoIcon}>⚡</span>
          </div>
          <div className={styles.links}>
            <a href="#">Quem somos?</a>
            <a href="#">O que buscamos?</a>
            <a href="#">Conecte-se</a>
            <button className={styles.loginButton}>Cadastrar</button>
          </div>
        </div>
      </nav>

      <div style={{ height: "90px" }} />

      {/* BLOB decorativo */}
      <div className={styles.blobTopLeft} />
      <div className={styles.blobBottomRight} />

      {/* Conteúdo com animação */}
      <motion.div
        className={styles.pageContainer}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className={styles.leftContent}>
          <span className={styles.tag}><MapPin size={14} /> Patos e região</span>
          <h1 className={styles.title}>
            Encontre <span className={styles.highlight}>desenvolvedores</span><br />próximos de você
          </h1>

          <p className={styles.description}>
            Aproxime-se da oportunidade. Conecte-se com devs da sua cidade e crie sua rede hoje mesmo.
          </p>
          <button className={styles.enterButton}>
            Entrar <ArrowRight size={18} style={{ marginLeft: 8 }} />
          </button>
        </div>

        <div className={styles.rightContent}>
          <div className={styles.imageWrapper}>
            <Image
              src="/imagens/ilustracao-dev.png"
              alt="Ilustração de desenvolvedor"
              width={600}
              height={600}
              className={styles.image}
              priority
            />
          </div>
        </div>
      </motion.div>
    </>
  );
}
