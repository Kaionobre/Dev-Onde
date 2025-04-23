"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import styles from "./Vagas.module.css"

// Defina uma interface para o tipo Vaga
interface Vaga {
  id: number;
  titulo: string;
  tipo_contrato: string;
  salario: number | null;
  // Adicione outros campos que você precisa
}

export default function ListaVagas() {
  // Use a interface Vaga no estado inicial
  const [vagas, setVagas] = useState<Vaga[]>([])
  const router = useRouter()

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/vagas/")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Erro na requisição: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Dados recebidos:", data);
        // Verifica a estrutura da resposta
        if (Array.isArray(data)) {
          setVagas(data);
        } else if (data && typeof data === 'object' && data.results) {
          setVagas(data.results);
        } else {
          setVagas([]);
        }
      })
      .catch((err) => {
        console.error("Erro ao carregar vagas:", err);
      });
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Vagas disponíveis</h1>
      <div className={styles.vagaList}>
        {vagas.length > 0 ? (
          vagas.map((vaga, index) => (
            <div
              key={vaga.id || `vaga-${index}`}
              className={styles.card}
              onClick={() => router.push(`/vagas/${vaga.id}`)}
            >
              <h2>{vaga.titulo || "Título não disponível"}</h2>
              <p>Tipo de contrato: <strong>{vaga.tipo_contrato || "Não especificado"}</strong></p>
              <p>Salário: <strong>{vaga.salario ? `R$ ${vaga.salario}` : "A combinar"}</strong></p>
              <span className={styles.link}>Ver detalhes →</span>
            </div>
          ))
        ) : (
          <p>Nenhuma vaga disponível no momento.</p>
        )}
      </div>
    </div>
  )
}