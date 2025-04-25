"use client";
import { getEmpresas } from "@/service/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EmpresasPage() {
  const [empresas, setEmpresas] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    getEmpresas(token)
      .then(setEmpresas)
      .catch(() => {
        alert("Erro ao buscar empresas");
        router.push("auth/login");
      });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Empresas</h1>
      {empresas.map((empresa: any) => (
        <div key={empresa.id} className="border p-2 my-2 rounded">
          <p><strong>Nome:</strong> {empresa.nome}</p>
          <p><strong>Setor:</strong> {empresa.setor}</p>
          <p><strong>Localização:</strong> {empresa.localizacao}</p>
        </div>
      ))}
    </div>
  );
}
