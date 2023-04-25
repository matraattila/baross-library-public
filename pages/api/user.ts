import getUserCookie from '@/lib/getUserCookie'
import { NextApiRequest, NextApiResponse } from 'next/types'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const userCookie = getUserCookie(req, res)

        if (!userCookie) {
          return res.status(200).json({ user: null })
        }

        res.status(200).json({ user: userCookie })
      } catch (error) {
        res.status(500).json({ message: error })
      }
      break
    default:
      res.status(405).json({ message: 'Request type is not supported' })
  }
}
