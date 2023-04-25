import { UserCookie } from '@/interfaces/UserCookie'
import { CookieValueTypes, getCookie } from 'cookies-next'
import { NextApiRequest, NextApiResponse } from 'next'

const getUserCookie = (req: NextApiRequest, res: NextApiResponse): UserCookie => {
  const cookie: CookieValueTypes = getCookie('user', { req, res })

  // Cookie is not present
  if (!cookie) {
    return null
  }

  return JSON.parse(cookie.toString())
}

export default getUserCookie
