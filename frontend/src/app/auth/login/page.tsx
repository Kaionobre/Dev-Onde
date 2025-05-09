"use client"
import { useState, useEffect } from "react"
import styles from "./LoginForm.module.css"
import Navbar from "@/components/navbar_cadastrar/Navbar"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [alert, setAlert] = useState({ show: false, message: '', type: '' })
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })

  useEffect(() => {
    if (alert.show && alert.type === 'success') {
      const timer = setTimeout(() => {
        setAlert(prev => ({ ...prev, show: false }))
        router.push('/home')
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [alert.show, alert.type, router])

  const Alert = ({ message, type }: { message: string, type: string }) => {
    const alertClasses = {
      success: 'bg-green-100 border-green-400 text-green-700',
      danger: 'bg-red-100 border-red-400 text-red-700',
    }[type]

    return (
      <div className={`fixed top-20 right-4 px-4 py-3 rounded border ${alertClasses} flex items-center max-w-sm shadow-lg z-50`} role="alert">
        <div className="mr-2">
          {type === 'success' ? (
            <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          )}
        </div>
        <span className="block sm:inline">{message}</span>
      </div>
    )
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("http://127.0.0.1:8000/api/auth/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem("access_token", data.access)
        localStorage.setItem("refresh_token", data.refresh)
        setAlert({
          show: true,
          message: 'Login realizado com sucesso!',
          type: 'success'
        })
      } else {
        setAlert({
          show: true,
          message: data.message || 'Erro ao fazer login.',
          type: 'danger'
        })
        console.error(data)
      }
    } catch (error) {
      console.error("Erro inesperado:", error)
      setAlert({
        show: true,
        message: 'Erro inesperado. Tente novamente mais tarde.',
        type: 'danger'
      })
    }
  }

  return (
    <>
      <Navbar />
      {alert.show && <Alert message={alert.message} type={alert.type} />}
      <div className={styles.blobTopLeft} />
      <div className={styles.blobBottomRight} />
      <div className={styles.loginPage}>
        <div className={styles.imageSection}>
          <img
            src="/imagens/computer-illustration.png"
            alt="Ilustração de computador"
            className={styles.illustration}
          />
        </div>

        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <h2 className={styles.formTitle}>Login</h2>

          <input
            type="text"
            name="username"
            placeholder="Nome de usuário"
            value={formData.username}
            onChange={handleChange}
            required
            className={styles.inputField}
          />

          <input
            type="password"
            name="password"
            placeholder="Senha"
            value={formData.password}
            onChange={handleChange}
            required
            className={styles.inputField}
          />

          <button type="submit" className={styles.submitButton}>
            Entrar
          </button>
        </form>
      </div>
    </>
  )
}
