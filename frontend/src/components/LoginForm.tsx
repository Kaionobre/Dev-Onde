"use client";
import { useState } from "react";
import styles from "./LoginForm.module.css";

export default function LoginForm({ tipo_usuario }: { tipo_usuario: string }) {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/api/auth/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);
        window.location.href = "/painel";
      } else {
        const error = await response.json();
        console.error("Erro ao fazer login:", error);
      }
    } catch (err) {
      console.error("Erro de rede:", err);
    }
  };

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
            <button className={styles.loginButton}>Cadastrar</button>
          </div>
        </div>
      </nav>

      <div style={{ height: "90px" }} />
      <div className={styles.blobTopLeft} />
      <div className={styles.blobBottomRight} />

      {/* Layout dividido */}
      <div className={styles.loginPage}>
        <div className={styles.imageSection}>
          <img
            src="/imagens/computer-illustration.png"
            alt="Ilustração de computador"
            className={styles.illustration}
          />
        </div>

        <div className={styles.formSection}>
          <form className={styles.formContainer} onSubmit={handleLogin}>
            <h2 className={styles.formTitle}>{tipo_usuario}</h2>
            <input
              type="text"
              name="username"
              placeholder="Usuário"
              value={formData.username}
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
            <button type="submit" className={styles.submitButton}>
              Entrar
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
