import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '@/lib/dbConnect'
import User from '@/models/User'
import ResetToken, { ResetTokenProps } from '@/models/ResetToken'
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import transporter from '@/lib/nodemailer'
import { DB_CONN_FAILED_MSG, PASSWORD_RESET_TEMPLATE } from '@/lib/constants'
import { ApiError } from 'next/dist/server/api-utils'
import { UserDB } from '@/interfaces/User'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  try {
    await dbConnect()
  } catch (error) {
    return res.status(500).json({ message: DB_CONN_FAILED_MSG })
  }

  switch (method) {
    case 'POST':
      try {
        const { email }: { email: string } = req.body

        if (!email) {
          throw new ApiError(400, 'Email is required!')
        }

        // Check if user exists
        const user: UserDB = await User.findOne({ email: email })

        if (!user) {
          throw new ApiError(400, 'Email address is not registered!')
        }

        // Check if the user has an ongoing password reset
        const hasResetToken: ResetTokenProps = await ResetToken.findOne({ email: email })

        // Delete expired tokens
        const resetTokenExpired = new Date(hasResetToken?.expiration).getTime() < Date.now()
        if (hasResetToken && resetTokenExpired) {
          await ResetToken.deleteMany({ email: email })
        }

        if (hasResetToken && !resetTokenExpired) {
          throw new ApiError(400, 'You have already requested a password reset!')
        }

        // Generate token
        const token = crypto.randomBytes(64).toString('hex')

        // Save hashed token to database
        const hashedToken = await bcrypt.hash(token, 5)
        const newResetToken = new ResetToken<ResetTokenProps>({
          email,
          token: hashedToken,
          expiration: new Date(Date.now() + 1000 * 60 * 10), // Expires in 10 minutes
        })

        await newResetToken.save()

        // Send email
        const username = email.split('@')[0]
        const resetURL = `http://${req.headers.host}/createPassword?token=${token}&email=${email}`

        await transporter.sendMail({
          from: process.env.GMAIL_USER,
          to: process.env.NODE_ENV === 'development' ? process.env.GMAIL_USER : email,
          subject: 'Password Reset',
          templateName: PASSWORD_RESET_TEMPLATE,
          templateData: {
            username,
            resetURL,
          },
        })

        res.status(200).json({ message: 'Email was successfully sent!' })
      } catch (error) {
        return res
          .status(error.statusCode || 500)
          .json({ message: error.message || 'Failed to send email!' })
      }
      break
    default:
      res.status(405).json({ message: 'Request type is not supported' })
      break
  }
}
