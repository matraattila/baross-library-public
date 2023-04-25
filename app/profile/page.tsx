'use client'
import React, { FormEvent } from 'react'
import { useState } from 'react'
import Heading from '@/components/ui/Heading'
import Page from '@/components/Page'
import useAxios from '@/hooks/useAxios'
import useApp from '@/hooks/useApp'
import Avatar from '@/components/Avatar'
import InputField from '@/components/ui/Input'
import FlexGroup from '@/components/ui/FlexGroup'
import { MdLock } from 'react-icons/md'
import Button from '@/components/ui/Button'
import { NotificationManager } from 'react-notifications'
import { LOGIN_PAGE, LOGOUT_API, PASSWORD_CHANGE_API } from '@/lib/constants'
import { ErrorResponse, SuccessResponse } from '@/interfaces/ServerResponse'
import { AxiosError, AxiosResponse } from 'axios'
import { useRouter } from 'next/navigation'

interface PasswordChangeProps {
  currentPassword: string
  password: string
  passwordRepeat: string
}

export interface PasswordChangePropsAPI {
  currentPassword: string
  newPassword: string
}

const Profile = () => {
  const axios = useAxios()
  const { user, setUser } = useApp()
  const router = useRouter()

  const [passwords, setPasswords] = useState<PasswordChangeProps>({
    password: '',
    passwordRepeat: '',
    currentPassword: '',
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (passwords.password !== passwords.passwordRepeat) {
      setLoading(false)
      NotificationManager.error("Passwords don't match!")
      return
    }

    const data: PasswordChangePropsAPI = {
      currentPassword: passwords.currentPassword,
      newPassword: passwords.password,
    }

    // API call
    await axios
      .post(PASSWORD_CHANGE_API, data)
      .then((res: AxiosResponse<SuccessResponse>) => {
        setLoading(false)
        NotificationManager.success(res.data.message)
        setPasswords({ currentPassword: '', password: '', passwordRepeat: '' })
      })
      .then(async () => {
        // Log out the user
        await axios
          .post(LOGOUT_API)
          .then(() => {
            router.push(LOGIN_PAGE)
          })
          .then(() => setUser(null))
          .then(() => NotificationManager.info('Please log in again.'))
      })
      .catch((error: AxiosError<ErrorResponse>) => {
        setLoading(false)
        NotificationManager.error(error.response.data.message)
      })
  }

  return (
    <Page className="gap-10 place-items-start">
      <Heading>Profile</Heading>

      <div className="grid justify-items-center gap-8 p-8 rounded-md bg-base-100/90">
        <div className="grid gap-3 place-items-center">
          <Avatar className="max-w-[10em]" />
          <div className="text-center leading-8">
            <h1 className="font-bold text-2xl">{user?.email}</h1>
            <h2 className="opacity-60">{user?.role?.toLocaleUpperCase()}</h2>
          </div>
        </div>

        <form className="grid gap-4" onSubmit={handleSubmit}>
          <FlexGroup>
            <InputField
              type="password"
              id="currentPassword"
              placeholder="Current password"
              minLength={6}
              onChange={(e) =>
                setPasswords((prev) => ({ ...prev, currentPassword: e.target.value }))
              }
              required
            />
            <MdLock />
          </FlexGroup>

          <FlexGroup>
            <InputField
              type="password"
              id="password"
              placeholder="New password"
              minLength={6}
              onChange={(e) => setPasswords((prev) => ({ ...prev, password: e.target.value }))}
              required
            />
            <MdLock />
          </FlexGroup>

          <FlexGroup>
            <InputField
              type="password"
              id="passwordRepeat"
              placeholder="New password"
              minLength={6}
              onChange={(e) =>
                setPasswords((prev) => ({ ...prev, passwordRepeat: e.target.value }))
              }
              required
            />
            <MdLock />
          </FlexGroup>

          <Button type="submit" loading={loading} fullWidth>
            Change Password
          </Button>
        </form>
      </div>
    </Page>
  )
}

export default Profile
