"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import styles from "./Vagas.module.css"
import { Building2, Briefcase, BadgeDollarSign } from 'lucide-react'
import Navbar from "@/components/navbar_sair/Navbar"
import ProtectedRoute from "@/components/guardiao_rota/ProtectedRoute"

interface Vaga {
  id: number;
  titulo: string;
  descricao: string;
  salario: string;
  tipo_contrato: string;
  vaga_ativa: boolean;
  empresa: number;
  recrutador: number;
  url_form: string;
  nome_empresa: string; // 👈 novo campo para exibir no frontend

}

export default function ListaVagas() {
  const [vagas, setVagas] = useState<Vaga[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchVagas = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem('access_token')
        
        if (!token) {
          router.push('/auth/login')
          return
        }

        const response = await fetch("http://127.0.0.1:8000/api/vagas/", {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })

        if (!response.ok) {
          if (response.status === 401) {
            router.push('/auth/login')
            return
          }
          throw new Error(`Erro na requisição: ${response.status}`)
        }

        const data = await response.json()
        setVagas(Array.isArray(data) ? data : data.results || [])
      } catch (err) {
        console.error("Erro ao carregar vagas:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchVagas()
  }, [router])

  if (loading) {
    return (
      <ProtectedRoute>
        <Navbar />
        <div className={styles.loadingContainer}>
          <div className={styles.loader}></div>
          <p>Carregando vagas...</p>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.title}>Vagas Disponíveis</h1>
        <div className={styles.vagaList}>
          {vagas.length > 0 ? (
            vagas.map((vaga) => (
              <div
                key={vaga.id}
                className={styles.card}
                onClick={() => router.push(`/vagas/${vaga.id}`)}
              >
                <div className={styles.cardHeader}>
                  <h2 className={styles.cardTitle}>{vaga.titulo}</h2>
                  {vaga.vaga_ativa && (
                    <span className={styles.statusBadge}>Ativa</span>
                  )}
                </div>

                <p className={styles.description}>{vaga.descricao}</p>

                <div className={styles.infoGrid}>
                  <div className={styles.infoItem}>
                    <Building2 size={18} />
                    <span>Empresa:{vaga.nome_empresa}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <Briefcase size={18} />
                    <span>{vaga.tipo_contrato}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <BadgeDollarSign size={18} />
                    <span className={styles.salary}>
                      R$ {parseFloat(vaga.salario).toLocaleString('pt-BR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </span>
                  </div>
                </div>
                <button
                  className={styles.detailsButton}
                  onClick={(e) => {
                    e.stopPropagation(); // impede que o card inteiro redirecione
                    window.open(vaga.url_form, '_blank');
                  }}
                >
                  Aplicar →
                </button>
              </div>
            ))
          ) : (
            <div className={styles.emptyState}>
              <h3>Nenhuma vaga disponível no momento</h3>
              <p>Volte mais tarde para novas oportunidades!</p>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}