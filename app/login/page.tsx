'use client'
import React, { useEffect } from 'react'
import LoginPage from '@/components/LoginPage'
import Page from '@/components/Page'
import useApp from '@/hooks/useApp'
import { useRouter } from 'next/navigation'

const Login = () => {
  const router = useRouter()
  const { user } = useApp()

  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [router, user])

  return (
    <Page className="h-full place-items-center">
      <LoginPage />
    </Page>
  )
}

export default Login
