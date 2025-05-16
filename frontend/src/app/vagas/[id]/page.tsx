"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"; // Usando useSearchParams em vez de useRouter

interface Vaga {
  id: number;
  titulo: string;
  empresa: string;
  tipo_contrato: string;
  salario: string;
  descricao: string;
}

export default function VagaDetalhada() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id'); // Pega o id da URL

  const [vaga, setVaga] = useState<Vaga | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return; // Se o id não estiver disponível, não faz a requisição

    async function fetchVaga() {
      try {
        const response = await fetch(`http://localhost:8000/api/vagas/${id}`);

        if (!response.ok) {
          setError("Erro ao buscar vaga. Tente novamente mais tarde.");
          return;
        }

        const data = await response.json();

        // Se a vaga não for encontrada, exibe a mensagem de erro
        if (!data || !data.id) {
          setError("Vaga não encontrada.");
          return;
        }

        setVaga(data); // Exibe os detalhes da vaga se encontrada
      } catch (error) {
        setError("Erro ao buscar vaga. Tente novamente mais tarde.");
      }
    }

    fetchVaga();
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  // Se a vaga não existir, mostra a mensagem de erro, mas sempre exibe um estado
  if (!vaga) {
    return <p>Carregando detalhes...</p>;
  }

  // Exibe os detalhes da vaga se encontrada
  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4">{vaga.titulo}</h1>
      <p className="text-gray-700 mb-2"><strong>Empresa:</strong> {vaga.empresa}</p>
      <p className="text-gray-700 mb-2"><strong>Tipo de Contrato:</strong> {vaga.tipo_contrato}</p>
      <p className="text-gray-700 mb-2"><strong>Salário:</strong> {vaga.salario}</p>
      <p className="text-gray-700 mb-4"><strong>Descrição:</strong> {vaga.descricao}</p>

      <button
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={() => alert("Inscrição realizada com sucesso!")}
      >
        Inscrever-se na Vaga
      </button>
    </div>
  );
}
