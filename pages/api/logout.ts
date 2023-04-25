import { deleteCookie } from 'cookies-next'
import { NextApiRequest, NextApiResponse } from 'next/types'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case 'POST':
      try {
        deleteCookie('user', { req, res })
        res.status(200).json({ message: 'You have logged out!' })
      } catch (error) {
        return res.status(500).json({ message: 'Failed to log out! Please try again!' })
      }

      break
    default:
      res.status(405).json({ message: 'Request type is not supported' })
  }
}
