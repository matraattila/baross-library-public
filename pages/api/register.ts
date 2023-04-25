import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../lib/dbConnect'
import User from '../../models/User'
import bcrypt from 'bcrypt'
import { UserDB } from '@/interfaces/User'
import { createAvatar } from '@dicebear/core'
import { initials } from '@dicebear/collection'
import { DB_CONN_FAILED_MSG, ROLES } from '@/lib/constants'
import { ApiError } from 'next/dist/server/api-utils'
import { ObjectId } from 'mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  try {
    await dbConnect()
  } catch (error) {
    return res.status(500).json({ message: DB_CONN_FAILED_MSG })
  }

  switch (method) {
    case 'POST': {
      const { email, password, role }: UserDB = req.body

      try {
        if (!email || !password || !role) {
          throw new ApiError(400, 'Required fields are email, password and role!')
        }

        if (!ROLES.includes(role)) {
          throw new ApiError(400, `Accepted roles are the following: ${ROLES.join(', ')}!`)
        }

        const isUser = await User.findOne({ email })

        if (isUser) {
          throw new ApiError(400, 'Email address is registered!')
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password.toString(), 10)

        if (!hashedPassword) {
          throw new ApiError(400, 'Failed to generate hashed password!')
        }

        // Create new user
        const newUserId = new ObjectId()

        // Generate profile picture
        const avatarUri = `public/img/${newUserId}.png` // For createAvatar
        const avatarPath = `/img/${newUserId}.png` // For the client

        const avatar = createAvatar(initials, {
          seed: email,
          chars: 1,
        })

        await avatar.png().toFile(avatarUri)

        const newUserObject: UserDB = {
          _id: newUserId,
          email,
          password: hashedPassword,
          role: role.toLowerCase(),
          avatar: avatarPath,
        }

        const newUser = new User<UserDB>(newUserObject)
        await newUser.save()

        res.status(200).json({ message: 'Registration was successful!' })
      } catch (error) {
        res
          .status(error.statusCode || 500)
          .json({ message: error.message || 'Registration failed!' })
      }
      break
    }
    default:
      res.status(405).json({ message: 'Request type is not supported' })
      break
  }
}
