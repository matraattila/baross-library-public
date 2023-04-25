import { Book } from '@/interfaces/Book'
import { DB_CONN_FAILED_MSG } from '@/lib/constants'
import dbConnect from '@/lib/dbConnect'
import Statistic from '@/models/Statistic'
import { NextApiRequest, NextApiResponse } from 'next'
import BookModel from '@/models/Book'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  try {
    await dbConnect()
  } catch (error) {
    return res.status(500).json({ message: DB_CONN_FAILED_MSG })
  }

  switch (method) {
    case 'GET':
      {
        const { raktariJel } = req.query

        try {
          const book = await BookModel.findOne({ raktariJel })

          if (!book) {
            return res.status(404).json({ message: 'Book not found!' })
          }

          res.status(200).json(book)
        } catch (error) {
          res.status(500).json({ message: error })
        }
      }
      break
    case 'PUT':
      {
        try {
          const { updatedBook }: { updatedBook: Book } = req.body
          const savedBook = await BookModel.findOneAndUpdate(
            { raktariJel: updatedBook.raktariJel },
            updatedBook
          )

          if (!savedBook) {
            return res
              .status(500)
              .json({ message: `Failed to update book: ${savedBook.raktariJel}` })
          }

          return res.json({ message: `Successfully updated book: ${savedBook.raktariJel}` })
        } catch (error) {
          res.status(500).json({ message: error })
        }
      }
      break
    case 'DELETE':
      {
        const { raktariJel } = req.query

        try {
          const deletedBook = await BookModel.findOneAndDelete({ raktariJel })
          await Statistic.findOneAndUpdate(
            {},
            {
              $inc: { bookCount: -1 },
            }
          ).exec()

          if (!deletedBook) {
            return res.status(500).json({ message: `Failed to delete book: ${raktariJel}` })
          }

          return res.json({ message: `Successfully deleted book: ${raktariJel}` })
        } catch (error) {
          res.status(500).json({ message: error })
        }
      }
      break
    default:
      res.status(405).json({ message: 'Request type is not supported' })
  }
}
