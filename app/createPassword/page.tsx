'use client'
import Page from '@/components/Page'
import Button from '@/components/ui/Button'
import FlexGroup from '@/components/ui/FlexGroup'
import Heading from '@/components/ui/Heading'
import Input from '@/components/ui/Input'
import useAxios from '@/hooks/useAxios'
import { CreatePasswordAPIProps } from '@/interfaces/CreatePassword'
import { ErrorResponse, SuccessResponse } from '@/interfaces/ServerResponse'
import { CREATE_PASSWORD_API, LOGIN_PAGE, PASSWORD_RESET_PAGE } from '@/lib/constants'
import { AxiosError, AxiosResponse } from 'axios'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { FormEvent, useState } from 'react'
import { MdLock } from 'react-icons/md'
import { NotificationManager } from 'react-notifications'

interface PasswordsProps {
  password: string
  passwordRepeat: string
}

const CreatePassword = () => {
  const router = useRouter()
  const axios = useAxios()
  const params = useSearchParams()

  const [token] = useState(params.get('token'))
  const [email] = useState(params.get('email'))
  const [passwords, setPasswords] = useState<PasswordsProps>({ password: '', passwordRepeat: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (passwords.password !== passwords.passwordRepeat) {
      setLoading(false)
      NotificationManager.error("Passwords don't match!")
      return
    }

    const data: CreatePasswordAPIProps = {
      email,
      password: passwords.password,
      token,
    }

    await axios
      .post(CREATE_PASSWORD_API, data)
      .then((res: AxiosResponse<SuccessResponse>) => {
        NotificationManager.success(res.data.message)
        router.push(LOGIN_PAGE)
      })
      .catch((err: AxiosError<ErrorResponse>) => {
        NotificationManager.error(err.response.data.message)
      })
      .finally(() => setLoading(false))
  }

  return (
    <Page className="h-full place-items-center">
      <form className="grid gap-5 px-14 py-10 bg-base-100 rounded-3xl" onSubmit={handleSubmit}>
        <Heading className="justify-self-center pb-3" intent="secondary">
          Create password
        </Heading>

        <FlexGroup>
          <Input
            intent="flexGroupItem"
            type="password"
            id="password"
            placeholder="Password"
            minLength={6}
            onChange={(e) => setPasswords((prev) => ({ ...prev, password: e.target.value }))}
            required
          />
          <MdLock />
        </FlexGroup>

        <FlexGroup>
          <Input
            intent="flexGroupItem"
            type="password"
            id="passwordRepeat"
            placeholder="Password"
            minLength={6}
            onChange={(e) => setPasswords((prev) => ({ ...prev, passwordRepeat: e.target.value }))}
            required
          />
          <MdLock />
        </FlexGroup>

        <Button type="submit" loading={loading} fullWidth>
          Create
        </Button>

        <Link href={PASSWORD_RESET_PAGE} className="text-sm text-right link">
          Reset password again?
        </Link>
      </form>
    </Page>
  )
}

export default CreatePassword
