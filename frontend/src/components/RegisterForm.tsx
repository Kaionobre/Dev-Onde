"use client"

import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"

export default function RegisterForm() {
  const router = useRouter()
  const pathname = usePathname()

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  })

  const tipo_usuario = pathname.includes("recrutador") ? "recrutador" : "desenvolvedor"

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const response = await fetch("http://127.0.0.1:8000/api/auth/register/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, tipo_usuario }),
    })

    if (response.ok) {
      alert("Registrado com sucesso!")
      router.push("/") // ou redireciona para o login
    } else {
      const erro = await response.json()
      console.error(erro)
      alert("Erro ao registrar.")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-bold text-center">Registro - {tipo_usuario}</h2>

      <input
        type="text"
        name="username"
        placeholder="Usuário"
        value={formData.username}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="email"
        name="email"
        placeholder="E-mail"
        value={formData.email}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Senha"
        value={formData.password}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <button type="submit" className="button">
        Registrar
      </button>
    </form>
  )
}
