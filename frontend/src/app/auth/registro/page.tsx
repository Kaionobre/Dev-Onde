"use client"
import { useState } from "react"
import styles from "./Register.module.css"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    tipo_usuario: "",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        alert("Registro realizado com sucesso!")
      } else {
        alert(data.message || "Erro ao registrar.")
        console.error(data)
      }
    } catch (error) {
      console.error("Erro inesperado:", error)
      alert("Erro inesperado. Tente novamente mais tarde.")
    }
  }

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.navContent}>
          <div className={styles.logo}>
            Dev onde? <span className={styles.logoIcon}>⚡</span>
          </div>
          <div className={styles.links}>
            <a href="#">Quem somos?</a>
            <a href="#">O que buscamos?</a>
            <a href="#">Conecte-se</a>
            <button className={styles.loginButton}>Entrar</button>
          </div>
        </div>
      </nav>

      <div style={{ height: "90px" }} />
      <div className={styles.blobTopLeft} />
      <div className={styles.blobBottomRight} />

      <div className={styles.registerPage}>
        <div className={styles.imageSection}>
          <img
            src="/imagens/computer-illustration.png"
            alt="Ilustração de computador"
            className={styles.illustration}
          />
        </div>

        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <h2 className={styles.formTitle}>Criar conta</h2>

          <input
            type="text"
            name="username"
            placeholder="Nome de usuário"
            value={formData.username}
            onChange={handleChange}
            required
            className={styles.inputField}
          />

          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
            required
            className={styles.inputField}
          />

          <input
            type="password"
            name="password"
            placeholder="Senha"
            value={formData.password}
            onChange={handleChange}
            required
            className={styles.inputField}
          />

          <select
            name="tipo_usuario"
            value={formData.tipo_usuario}
            onChange={handleChange}
            required
            className={styles.inputField}
          >
            <option value="">Selecione o tipo de usuário</option>
            <option value="desenvolvedor">Desenvolvedor</option>
            <option value="recrutador">Recrutador</option>
          </select>

          <button type="submit" className={styles.submitButton}>
            Registrar
          </button>
        </form>
      </div>
    </>
  )
}
