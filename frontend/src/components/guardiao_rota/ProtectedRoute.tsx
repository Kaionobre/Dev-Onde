"use client"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('access_token')
      if (!token) {
        router.push('/auth/login')
      } else {
        setAuthorized(true)
      }
    }

    checkAuth()
  }, [router])

  return authorized ? <>{children}</> : null
}