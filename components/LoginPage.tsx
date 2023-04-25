'use client'
import React, { FormEvent } from 'react'
import { useState } from 'react'
import useApp from '@/hooks/useApp'
import { AxiosError, AxiosResponse } from 'axios'
import Input from '@/components/ui/Input'
import Heading from '@/components/ui/Heading'
import Button from '@/components/ui/Button'
import { MdAlternateEmail, MdLock } from 'react-icons/md'
import FlexGroup from '@/components/ui/FlexGroup'
import { ErrorResponse, SuccessResponse } from '@/interfaces/ServerResponse'
import { NotificationManager } from 'react-notifications'
import useAxios from '@/hooks/useAxios'
import { LOGIN_API, PASSWORD_RESET_PAGE } from '@/lib/constants'
import Link from 'next/link'

export default function LoginPage() {
  const { setUser } = useApp()
  const [formData, setFormData] = useState<{ email: string; password: string }>({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const axios = useAxios()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    axios
      .post(LOGIN_API, {
        email: formData.email,
        password: formData.password,
      })
      .then((res: AxiosResponse<SuccessResponse>) => {
        if (res) {
          NotificationManager.success(res?.data?.message)
          setUser(res.data.user)
        }
      })
      .catch((err: AxiosError<ErrorResponse>) => {
        console.log(err)
        NotificationManager.error(err?.response?.data?.message ?? err?.message)
      })
      .finally(() => setLoading(false))
  }

  return (
    <form className="grid gap-5 px-14 py-10 bg-base-100 rounded-3xl" onSubmit={handleSubmit}>
      <Heading className="justify-self-center pb-3">Login</Heading>

      <FlexGroup>
        <Input
          intent="flexGroupItem"
          type="email"
          id="email"
          placeholder="Email"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <MdAlternateEmail />
      </FlexGroup>

      <div>
        <FlexGroup>
          <Input
            intent="flexGroupItem"
            type="password"
            id="password"
            placeholder="Password"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <MdLock />
        </FlexGroup>
      </div>

      <Button type="submit" loading={loading} fullWidth>
        Login
      </Button>

      <Link href={PASSWORD_RESET_PAGE} className="text-sm text-right link-primary">
        Forgot your password?
      </Link>

      {/* <Link
        href={'/passwordReset'}
        className="underline underline-offset-1 justify-self-end block text-right text-sm text-mainBg mt-2"
      >
        Forgot your password?
      </Link> */}
    </form>
  )
}
