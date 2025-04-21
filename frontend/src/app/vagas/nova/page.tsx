"use client";
import { useState } from "react";
import styles from "./VagaForm.module.css";

export default function CriarVagaForm() {
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    salario: "",
    tipo_contrato: "",
    vaga_ativa: true,
    empresa: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, type, value, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/vagas/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          salario: formData.salario ? Number(formData.salario) : null,
        }),
      });

      if (response.ok) {
        alert("Vaga criada com sucesso!");
        setFormData({
          titulo: "",
          descricao: "",
          salario: "",
          tipo_contrato: "",
          vaga_ativa: true,
          empresa: "",
        });
      } else {
        const error = await response.json();
        console.error("Erro ao criar vaga:", error);
        alert("Erro ao criar vaga.");
      }
    } catch (err) {
      console.error("Erro de rede:", err);
    }
  };

  return (
    <>
      {/* NAVBAR */}
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

      {/* Espaço para compensar altura da navbar fixa */}
      <div style={{ height: "90px" }} />

      {/* Blobs decorativos */}
      <div className={styles.blobTopLeft}></div>
      <div className={styles.blobBottomRight}></div>

      {/* Página da Vaga */}
      <div className={styles.registerPage}>
        <div className={styles.formContainer}>
          <h2 className={styles.formTitle}>Criar Vaga</h2>

          <form onSubmit={handleSubmit} className={styles.formGroup}>
            <div>
              <label className={styles.labelField}>
                Título:
                <input
                  className={styles.inputField}
                  type="text"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            <div>
              <label className={styles.labelField}>
                Descrição:
                <textarea
                  className={styles.inputField}
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            <div>
              <label className={styles.labelField}>
                Salário:
                <input
                  className={styles.inputField}
                  type="number"
                  name="salario"
                  value={formData.salario}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div>
              <label className={styles.labelField}>
                Tipo de Contrato:
                <input
                  className={styles.inputField}
                  type="text"
                  name="tipo_contrato"
                  value={formData.tipo_contrato}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            <div className={styles.checkboxField}>
              <input
                type="checkbox"
                name="vaga_ativa"
                checked={formData.vaga_ativa}
                onChange={handleChange}
              />
              <label htmlFor="vaga_ativa">Vaga Ativa</label>
            </div>

            <div>
              <label className={styles.labelField}>
                Empresa (ID):
                <input
                  className={styles.inputField}
                  type="text"
                  name="empresa"
                  value={formData.empresa}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            <button className={styles.submitButton} type="submit">
              Criar Vaga
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
