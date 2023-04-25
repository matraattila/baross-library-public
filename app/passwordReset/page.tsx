'use client'
import React, { FormEvent } from 'react'
import Page from '@/components/Page'
import Button from '@/components/ui/Button'
import Heading from '@/components/ui/Heading'
import InputField from '@/components/ui/Input'
import { useState } from 'react'
import { MdAlternateEmail } from 'react-icons/md'
import FlexGroup from '@/components/ui/FlexGroup'
import Link from 'next/link'
import { LOGIN_PAGE, PASSWORD_RESET_API } from '@/lib/constants'
import useAxios from '@/hooks/useAxios'
import { SuccessResponse, ErrorResponse } from '@/interfaces/ServerResponse'
import { AxiosResponse, AxiosError } from 'axios'
import { NotificationManager } from 'react-notifications'

const PasswordReset = () => {
  const axios = useAxios()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    axios
      .post(PASSWORD_RESET_API, { email })
      .then((res: AxiosResponse<SuccessResponse>) => {
        NotificationManager.success(res.data.message)
      })
      .catch((error: AxiosError<ErrorResponse>) => {
        NotificationManager.error(error.response.data.message)
      })
      .finally(() => setLoading(false))
  }

  return (
    <Page className="h-full place-items-center">
      <div className="max-w-xl grid gap-5 p-12 bg-base-100 rounded-3xl">
        <div className="flex flex-col gap-3">
          <Heading className="text-center" intent="tertiary">
            Reset your password
          </Heading>
          <p className="opacity-80">
            Enter your email below and we will send you instructions to reset your password.
          </p>
        </div>

        <form className="grid gap-5" onSubmit={handleSubmit}>
          <FlexGroup gap={0}>
            <InputField
              intent="flexGroupItem"
              className="w-full"
              type="email"
              id="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
              required
            />
            <MdAlternateEmail />
          </FlexGroup>

          <div className="grid grid-cols-2 items-center gap-5 max-w-fit">
            <Button type="submit" loading={loading}>
              Reset password
            </Button>
            <Link href={LOGIN_PAGE} className="btn-link">
              Return to login
            </Link>
          </div>
        </form>
      </div>
    </Page>
  )
}

export default PasswordReset
