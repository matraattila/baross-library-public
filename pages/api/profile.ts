import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import User from '../../models/User'
import dbConnect from '../../lib/dbConnect'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case 'PUT': {
      const { avatarSmallData, avatarBigData, userId } = req.body
      if (!userId) {
        res.status(400).json({ error: 'You are not allowed to change profile picture' })
      }
      const avatarSmallbase64 = avatarSmallData.replace(/^data:image\/png;base64,/, '')
      const avatarBigbase64 = avatarBigData.replace(/^data:image\/png;base64,/, '')

      const avatarName = `public/uploads/avatar_${userId}.png`
      const avatarIconName = `public/uploads/avatar_${userId}_icon.png`

      const avatarNameDb = `/uploads/avatar_${userId}.png`
      const avatarIconNameDb = `/uploads/avatar_${userId}_icon.png`

      // Save images to the disk
      fs.writeFile(avatarName, avatarBigbase64, 'base64', (err) => {
        if (err) {
          return res.status(401).json({ error: 'Error while writing to file' })
        }
      })
      fs.writeFile(avatarIconName, avatarSmallbase64, 'base64', (err) => {
        if (err) {
          return res.status(401).json({ error: 'Error while writing to file' })
        }
      })

      // Update image reference in the database
      try {
        await dbConnect()
      } catch (error) {
        return res.status(401).json({ error: 'Error while connecting to the database' })
      }

      User.findByIdAndUpdate(
        userId,
        { image: { image: avatarNameDb, icon: avatarIconNameDb } },
        (err, doc) => {
          if (err) {
            return res.status(401).json({ error: 'Error while updating the database' })
          }
          res.status(200).json({ doc })
        }
      )

      return res.status(200).json({
        message:
          'Your profile picture has been updated successfully! (Press F5 to refresh the page and apply the changes)',
      })
      break
    }
    default:
      res.status(405).json({ message: 'Request type is not supported' })
  }
}

export const config = {
  api: {
    // Setting maximum file size to be uploaded
    bodyParser: {
      sizeLimit: '4mb',
    },
  },
}
