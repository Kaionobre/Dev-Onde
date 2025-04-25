"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./VagaForm.module.css";
import Navbar from "@/components/navbar_sair/Navbar"
import ProtectedRoute from "@/components/guardiao_rota/ProtectedRoute"

interface FormData {
  titulo: string;
  descricao: string;
  salario: string;
  tipo_contrato: string;
  vaga_ativa: boolean;
  empresa: string;
}

export default function CriarVagaForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    titulo: "",
    descricao: "",
    salario: "",
    tipo_contrato: "",
    vaga_ativa: true,
    empresa: "",
  });

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });

  const tiposContrato = [
    "CLT",
    "PJ",
    "Freelancer",
    "Estágio",
    "Temporário"
  ];

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
    setLoading(true);
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

      const data = await response.json();

      if (response.ok) {
        setAlert({
          show: true,
          message: 'Vaga criada com sucesso!',
          type: 'success'
        });
        setTimeout(() => {
          router.push('/vagas');
        }, 2000);
      } else {
        setAlert({
          show: true,
          message: data.message || 'Erro ao criar vaga.',
          type: 'error'
        });
      }
    } catch (err) {
      setAlert({
        show: true,
        message: 'Erro de conexão. Tente novamente.',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <Navbar />
      <div style={{ height: "90px" }} />

      {alert.show && (
        <div className={`${styles.alert} ${styles[alert.type]}`}>
          {alert.message}
        </div>
      )}

      <div className={styles.blobTopLeft}></div>
      <div className={styles.blobBottomRight}></div>

      <div className={styles.registerPage}>
        <div className={styles.formContainer}>
          <h2 className={styles.formTitle}>Criar Nova Vaga</h2>

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
                  placeholder="Ex: Desenvolvedor Full Stack Senior"
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
                  placeholder="Descreva os requisitos e responsabilidades da vaga"
                  rows={5}
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
                  placeholder="Ex: 5000"
                  min="0"
                  step="100"
                />
              </label>
            </div>

            <div>
              <label className={styles.labelField}>
                Tipo de Contrato:
                <select
                  className={styles.inputField}
                  name="tipo_contrato"
                  value={formData.tipo_contrato}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecione um tipo</option>
                  {tiposContrato.map((tipo) => (
                    <option key={tipo} value={tipo}>
                      {tipo}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className={styles.checkboxField}>
              <input
                type="checkbox"
                name="vaga_ativa"
                id="vaga_ativa"
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
                  placeholder="Digite o ID da empresa"
                />
              </label>
            </div>

            <button 
              className={styles.submitButton} 
              type="submit"
              disabled={loading}
            >
              {loading ? "Criando..." : "Criar Vaga"}
            </button>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
}