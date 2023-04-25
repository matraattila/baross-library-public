'use client'
import { AxiosError } from 'axios'
import { useEffect } from 'react'
import axios from '@/lib/axios'
import useApp from './useApp'
import { NotificationManager } from 'react-notifications'
import { useRouter } from 'next/navigation'

const useAxios = () => {
  const { user, setUser } = useApp()
  const router = useRouter()

  useEffect(() => {
    const responseIntercept = axios.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        // Cookie  expired
        if (user && error?.response?.status === 401) {
          // Log out the user
          NotificationManager.warning('You have been logged out!')
          setUser(null)
          router.push('/login')
        }

        return Promise.reject(error)
      }
    )

    return () => {
      axios.interceptors.response.eject(responseIntercept)
    }
  }, [router, setUser, user])

  return axios
}

export default useAxios
