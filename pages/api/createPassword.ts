import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../lib/dbConnect'
import { DB_CONN_FAILED_MSG } from '@/lib/constants'
import User from '@/models/User'
import ResetToken, { ResetTokenProps } from '@/models/ResetToken'
import bcrypt from 'bcrypt'
import { ApiError } from 'next/dist/server/api-utils'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  try {
    await dbConnect()
  } catch (error) {
    return res.status(500).json({ message: DB_CONN_FAILED_MSG })
  }

  switch (method) {
    case 'POST':
      {
        const { email, password, token } = req.body

        try {
          // Find token
          const resetTokenObject = await ResetToken.findOne<ResetTokenProps>({
            email: email,
          })

          if (!resetTokenObject)
            throw new ApiError(400, 'This email has no ongoing password reset!')

          // Check if the token has expired
          const resetTokenExpired = new Date(resetTokenObject.expiration).getTime() < Date.now()

          if (resetTokenExpired) {
            // Delete tokens associated with this email
            await ResetToken.deleteMany({ email: email })

            throw new ApiError(400, 'Token has expired!')
          }

          // Validate token
          const hashedToken = resetTokenObject.token
          const validToken: boolean = await bcrypt.compare(token, hashedToken)

          if (!validToken) throw new ApiError(400, 'Token is invalid!')

          // Update password
          const hashedPassword = await bcrypt.hash(password, 10)
          await User.findOneAndUpdate({ email: email }, { password: hashedPassword })

          // Delete tokens associated with this email
          await ResetToken.deleteMany({ email: email })

          res.status(200).json({ message: 'Successfully created password!' })
        } catch (error) {
          res
            .status(error.statusCode || 500)
            .json({ message: error.message || 'Failed to create new password!', error })
        }
      }
      break
    default:
      res.status(405).json({ message: 'Request type is not supported' })
      break
  }
}
