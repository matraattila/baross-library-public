import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '@/lib/dbConnect'
import BookModel from '@/models/Book'
import { getCookie } from 'cookies-next'
import Statistic from '@/models/Statistic'
import { DB_CONN_FAILED_MSG } from '@/lib/constants'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  // Check for user
  const user = getCookie('user', { req, res })
  if (!user) {
    return res.status(401).send({ message: 'User is undefined!' })
  }

  try {
    await dbConnect()
  } catch (error) {
    return res.status(500).json({ message: DB_CONN_FAILED_MSG })
  }

  switch (method) {
    case 'POST':
      try {
        const { bookList: books } = req.body

        if (!books) {
          res.status(400).json({ message: 'Books array is required!' })
          return
        }

        // Insert
        const result = await BookModel.insertMany(books, {
          ordered: false,
          rawResult: true,
        })

        await Statistic.findOneAndUpdate(
          {},
          {
            $inc: { bookCount: result.insertedCount },
            $push: { uploads: { value: result.insertedCount, date: new Date() } },
          },
          {
            upsert: true,
            returnNewDocument: true,
          }
        ).exec()

        return res
          .status(200)
          .json({ message: `Successfully uploaded ${result.insertedCount} book(s).` })
      } catch (error) {
        if (error.code === 11000 && error.insertedDocs.length !== 0) {
          const instertedDocCount = error.insertedDocs.length

          const updatedStatistic = await Statistic.findOneAndUpdate(
            {},
            {
              $inc: { bookCount: instertedDocCount },
              $push: { uploads: { value: instertedDocCount, date: new Date() } },
            },
            {
              upsert: true,
              returnNewDocument: true,
            }
          ).exec()

          if (updatedStatistic) {
            return res
              .status(200)
              .json({ message: `Successfully uploaded ${instertedDocCount} book(s)` })
          }

          return res.status(400).json({ message: error.message })
        } else if (error.insertedDocs.length === 0) {
          return res
            .status(400)
            .json({ message: "There aren't any new books in the selected file." })
        }

        return res.status(400).json({ message: error.message })
      }
      break
    case 'GET':
      try {
        const searchQuery = String(req.query.searchQuery) ?? ''
        const books = await searchForBooks(searchQuery)

        if (books) {
          return res.status(200).json({ books })
        }

        res.status(500).json({ message: 'Search for books failed!' })
      } catch (error) {
        res.status(500).json({ message: error })
      }
      break
    default:
      res.status(405).json({ message: 'Request type is not supported' })
      break
  }
}

export const searchForBooks = async (searchQuery: string) => {
  try {
    const books = await BookModel.find({
      $or: [
        { cim: new RegExp(searchQuery, 'i') },
        { 'szerzoiAdatok.szerzo': new RegExp(searchQuery, 'i') },
      ],
    })

    return books
  } catch (error) {
    return null
  }
}
