import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '@/lib/dbConnect'
import Statistic from '@/models/Statistic'
import getUserCookie from '@/lib/getUserCookie'
import { DB_CONN_FAILED_MSG } from '@/lib/constants'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  // Check for user
  const user = getUserCookie(req, res)
  if (!user) {
    return res.status(401).send({ message: 'User is undefined!' })
  }

  try {
    await dbConnect()
  } catch (error) {
    return res.status(500).json({ message: DB_CONN_FAILED_MSG })
  }

  switch (method) {
    case 'GET':
      try {
        const statistics = await Statistic.findOne().exec()

        return res.status(200).json(statistics)
      } catch (error) {
        res.status(500).json({ message: error })
      }
      break
    default:
      res.status(405).json({ message: 'Request type is not supported' })
      break
  }
}
