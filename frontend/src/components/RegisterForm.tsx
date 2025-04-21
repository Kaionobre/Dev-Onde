"use client"

import React, { useState } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import styles from "./Register.module.css"

interface FormData {
  username: string
  email: string
  password: string
}

export default function RegisterForm() {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  })

  const router = useRouter()
  const pathname = usePathname()
  const tipo_usuario_raw = pathname.includes("recrutador") ? "recrutador" : "desenvolvedor"
  const tipo_usuario = tipo_usuario_raw.charAt(0).toUpperCase() + tipo_usuario_raw.slice(1)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch("http://127.0.0.1:8000/api/auth/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, tipo_usuario }),
      })

      const data = await response.json()

      if (response.ok) {
        router.push("/login")
      } else {
        console.error("Erro ao registrar:", data)
        alert(data.message || "Erro ao registrar. Verifique os dados e tente novamente.")
      }
    } catch (error) {
      console.error("Erro inesperado:", error)
      alert("Erro inesperado. Tente novamente mais tarde.")
    }
  }

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

      {/* Espaço para compensar a navbar fixa */}
      <div style={{ height: "90px" }} />

      <div className={styles.registerPage}>
        <div className={styles.blobTopLeft}></div>
        <div className={styles.blobBottomRight}></div>

        {/* Imagem decorativa (opcional) */}
        {/* <div className={styles.imageSection}>
          <img src="/seu-svg.svg" alt="Ilustração" className={styles.illustration} />
        </div> */}

        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <h2 className={styles.formTitle}>Registro - {tipo_usuario}</h2>

          <input
            type="text"
            name="username"
            placeholder="Usuário"
            value={formData.username}
            onChange={handleChange}
            className={styles.inputField}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
            className={styles.inputField}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Senha"
            value={formData.password}
            onChange={handleChange}
            className={styles.inputField}
            required
          />

          <button type="submit" className={styles.submitButton}>
            Registrar
          </button>
        </form>
      </div>
    </>
  )
}
