'use client'
import { SuccessResponse } from '@/interfaces/ServerResponse'
import { UserApp } from '@/interfaces/User'
import { ALLOWED_PAGES, USER_API } from '@/lib/constants'
import { AxiosResponse } from 'axios'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import useApp from './useApp'
import useAxios from './useAxios'

const useUser = (): {
  isValidating: boolean
  user: UserApp
  error: any
} => {
  const router = useRouter()
  const pathname = usePathname()
  const { user, setUser } = useApp()
  const axios = useAxios()
  const isValidating = false
  const error = null

  useEffect(() => {
    const fetchUser = async () => {
      await axios.get(USER_API).then((res: AxiosResponse<SuccessResponse>) => {
        if (res.data.user) {
          setUser(res.data.user)
        } else {
          setUser(null)
          if (!ALLOWED_PAGES.includes(pathname)) router.push('/login')
        }
      })
    }
    fetchUser()
  }, [router, setUser, pathname, axios])

  return { isValidating, user, error }
}

export default useUser
