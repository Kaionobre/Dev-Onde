"use client";
import { useState } from "react";

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
    const { name, value } = e.target;

    if (e.target instanceof HTMLInputElement && e.target.type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: e.target.checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
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
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 space-y-4">
      <h2 className="text-2xl font-bold mb-2">Criar Vaga</h2>

      <div>
        <label className="block font-medium">
          *Título:
          <input
            type="text"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </label>
      </div>

      <div>
        <label className="block font-medium">
          *Descrição:
          <textarea
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </label>
      </div>

      <div>
        <label className="block font-medium">
          Salário:
          <input
            type="number"
            name="salario"
            value={formData.salario}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </label>
      </div>

      <div>
        <label className="block font-medium">
          *Tipo de Contrato:
          <input
            type="text"
            name="tipo_contrato"
            value={formData.tipo_contrato}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </label>
      </div>

      <div>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            name="vaga_ativa"
            checked={formData.vaga_ativa}
            onChange={handleChange}
            className="mr-2"
          />
          Vaga Ativa
        </label>
      </div>

      <div>
        <label className="block font-medium">
          *Empresa (ID):
          <input
            type="text"
            name="empresa"
            value={formData.empresa}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </label>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Criar Vaga
      </button>
    </form>
  );
}
