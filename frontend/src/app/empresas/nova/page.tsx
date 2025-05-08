"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { criarEmpresa } from "@/service/api";
import Navbar from "@/components/navbar_sair/Navbar";
import ProtectedRoute from "@/components/guardiao_rota/ProtectedRoute";
import styles from "./empresas.module.css"; // importando o CSS module
import Image from "next/image";


export default function NovaEmpresaPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    nome: "",
    setor: "",
    site: "",
    localizacao: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
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
        {/* Blobs decorativos */}
        <div className={styles.blobTopLeft} />
        <div className={styles.blobBottomRight} />

        {/* Seção da imagem */}
        <div className={styles.imageSection}>
          <img
            src="/imagens/computer-illustration.png"
            alt="Ilustração de computador"
            className={styles.illustration}
          />
        </div>

        {/* Formulário */}
        <div className={styles.formContainer}>
          <h1 className={styles.formTitle}>Cadastrar Empresa</h1>
          <form onSubmit={handleSubmit}>
            <input
              className={styles.inputField}
              name="nome"
              placeholder="Nome"
              value={form.nome}
              onChange={handleChange}
            />
            <input
              className={styles.inputField}
              name="setor"
              placeholder="Setor"
              value={form.setor}
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
              name="localizacao"
              placeholder="Localização"
              value={form.localizacao}
              onChange={handleChange}
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
