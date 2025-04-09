"use client";
import { useEffect, useState } from "react";

interface Vaga {
  id: number;
  titulo: string;
  descricao: string;
  salario: number | null;
  tipo_contrato: string;
}

export default function ListaVagas() {
  const [vagas, setVagas] = useState<Vaga[]>([]);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVagas() {
      try {
        const token = localStorage.getItem("accessToken");

        const res = await fetch("http://127.0.0.1:8000/api/vagas/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        console.log("Vagas recebidas:", data);

        if (Array.isArray(data)) {
          setVagas(data);
        } else {
          setErro("Formato de resposta inválido.");
        }
      } catch (err) {
        console.error(err);
        setErro("Erro ao buscar vagas.");
      }
    }

    fetchVagas();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl mb-4">Vagas disponíveis</h1>

      {erro && <p className="text-red-500">{erro}</p>}

      <ul className="space-y-2">
        {vagas.map((vaga) => (
          <li key={vaga.id} className="p-4 border rounded shadow">
            <h2 className="text-lg font-bold">{vaga.titulo}</h2>
            <p>{vaga.descricao}</p>
            <p className="text-sm text-gray-600">
              Tipo de contrato: {vaga.tipo_contrato}
              {vaga.salario !== null && ` • Salário: R$ ${vaga.salario}`}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
