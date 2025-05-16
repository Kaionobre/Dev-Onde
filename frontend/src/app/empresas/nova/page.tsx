"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { criarEmpresa } from "@/service/api";
import Navbar from "@/components/navbar_sair/Navbar";
import ProtectedRoute from "@/components/guardiao_rota/ProtectedRoute";
import styles from "./empresas.module.css";

export default function NovaEmpresaPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    nome: "",
    cnpj: "",
    email: "",
    telefone: "",
    site: "",
    setor: "",
    localizacao: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    try {
      await criarEmpresa(form, token);
      router.push("/home");
    } catch (error) {
      alert("Erro ao criar empresa");
    }
  };

  return (
    <ProtectedRoute>
      <Navbar />
      <div className={styles.loginPage}>
        <div className={styles.blobTopLeft} />
        <div className={styles.blobBottomRight} />

        <div className={styles.imageSection}>
          <img
            src="/imagens/computer-illustration.png"
            alt="Ilustração de computador"
            className={styles.illustration}
          />
        </div>

        <div className={styles.formContainer}>
          <h1 className={styles.formTitle}>Cadastrar Empresa</h1>
          <form onSubmit={handleSubmit}>
            <input
              className={styles.inputField}
              name="nome"
              placeholder="Nome"
              value={form.nome}
              onChange={handleChange}
              required
            />
            <input
              className={styles.inputField}
              name="cnpj"
              placeholder="CNPJ"
              value={form.cnpj}
              onChange={handleChange}
              required
            />
            <input
              className={styles.inputField}
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
            <input
              className={styles.inputField}
              name="telefone"
              placeholder="Telefone"
              value={form.telefone}
              onChange={handleChange}
            />
            <input
              className={styles.inputField}
              name="site"
              placeholder="Site"
              value={form.site}
              onChange={handleChange}
            />
            <input
              className={styles.inputField}
              name="setor"
              placeholder="Setor"
              value={form.setor}
              onChange={handleChange}
              required
            />
            <input
              className={styles.inputField}
              name="localizacao"
              placeholder="Localização"
              value={form.localizacao}
              onChange={handleChange}
              required
            />
            <button
              className={styles.submitButton}
              type="submit"
            >
              Cadastrar
            </button>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
}
