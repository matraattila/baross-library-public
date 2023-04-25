import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import UserModel from '../../models/User'
import dbConnect from '../../lib/dbConnect'
import { UserApp, UserDB } from '@/interfaces/User'
import { setCookie } from 'cookies-next'
import { DB_CONN_FAILED_MSG } from '@/lib/constants'
import { ApiError } from 'next/dist/server/api-utils'
import fs from 'fs'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  try {
    await dbConnect()
  } catch (error) {
    return res.status(500).json({ message: DB_CONN_FAILED_MSG })
  }

  switch (method) {
    case 'POST': {
      const loginFailedMessage = 'Login failed! Please check your credentials!'
      const { email, password } = req.body

      try {
        if (!email || !password) {
          throw new ApiError(400, 'There is no user or password present!')
        }

        const user: UserDB = await UserModel.findOne({ email: email }).exec()

        if (!user) {
          throw new ApiError(400, loginFailedMessage)
        }

        // Compare password and hash
        const hash = user.password
        const passwordsMatch = await bcrypt.compare(password, hash)

        // Passwords mismatch
        if (!passwordsMatch) {
          throw new ApiError(400, loginFailedMessage)
        }

        // Passwords match
        // Check if avatar picture exists
        const avatarImgExists = fs.existsSync('public/' + user.avatar)

        const userAppObject: UserApp = {
          id: user._id.toString(),
          email: user.email,
          role: user.role,
          avatar: avatarImgExists && user.avatar,
        }
        const cookieMaxAge = Number(process.env.COOKIE_MAX_AGE)
        setCookie('user', userAppObject, {
          req,
          res,
          maxAge: cookieMaxAge,
          httpOnly: true,
          sameSite: 'strict',
        })
        res.status(200).json({ message: "You've successfully logged in!", user: userAppObject })
      } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || 'Login failed!' })
      }

      break
    }
    default:
      res.status(405).json({ message: 'Request type is not supported' })
      break
  }
}
