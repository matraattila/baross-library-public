import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import User from '@/models/User'
import getUserCookie from '@/lib/getUserCookie'
import dbConnect from '@/lib/dbConnect'
import { PasswordChangePropsAPI } from 'app/profile/page'
import { ApiError } from 'next/dist/server/api-utils'
import { DB_CONN_FAILED_MSG } from '@/lib/constants'
import { UserDB } from '@/interfaces/User'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  // Check if user logged in
  const userCookie = getUserCookie(req, res)

  if (!userCookie) {
    return res.status(401).send({ message: 'User is undefined!' })
  }

  try {
    await dbConnect()
  } catch (error) {
    return res.status(500).json({ error: DB_CONN_FAILED_MSG })
  }

  switch (method) {
    case 'POST':
      try {
        const { currentPassword, newPassword } = req.body as PasswordChangePropsAPI

        if (!currentPassword || !newPassword) {
          throw new ApiError(400, 'The required fields are currentPassword, newPassword!')
        }

        // Validate current password
        const userId = userCookie.id
        const userFromDb: UserDB = await User.findById(userId).exec()
        const passwordsMatch = await bcrypt.compare(currentPassword, userFromDb.password)

        if (!passwordsMatch) {
          throw new ApiError(400, 'Current password is invalid!')
        }

        // Check if the password is the same as the previous one
        const newPasswordHash = await bcrypt.hash(newPassword.toString(), 10)
        const newPasswordIsTheSame = await bcrypt.compare(currentPassword, newPasswordHash)

        if (newPasswordIsTheSame) {
          throw new ApiError(400, 'New password must be different from old one!')
        }

        // Update password in database
        userFromDb.password = newPasswordHash
        await userFromDb.save()

        res.status(200).json({ message: 'Successfully updated password!' })
      } catch (error) {
        return res
          .status(error.statusCode || 500)
          .json({ message: error.message || 'Failed to reset password!' })
      }
      break
    default:
      res.status(405).json({ message: 'Request type is not supported' })
      break
  }
}
