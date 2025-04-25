'use client';
import styles from "./HomePage.module.css";
import Image from "next/image";
import { MapPin, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/navbar_sair/Navbar"
import ProtectedRoute from "@/components/guardiao_rota/ProtectedRoute"

export default function HomePage() {
  return (
    <ProtectedRoute>
      <Navbar />
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
    </ProtectedRoute>
  )
}