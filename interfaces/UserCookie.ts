import { CookieValueTypes } from 'cookies-next'

export type UserCookie = {
  id: string
  email: string
  role: string
} & CookieValueTypes
