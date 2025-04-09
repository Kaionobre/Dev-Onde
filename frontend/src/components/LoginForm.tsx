"use client";
import { useState } from "react";

export default function LoginForm({ tipo_usuario }: { tipo_usuario: string }) {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/auth/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);
        window.location.href = "/painel";
      } else {
        const error = await response.json();
        console.error("Erro ao fazer login:", error);
      }
    } catch (err) {
      console.error("Erro de rede:", err);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login - {tipo_usuario}</h2>
      <input
        type="text"
        name="username"
        placeholder="Usuário"
        value={formData.username}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Senha"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Entrar</button>
    </form>
  );
}
