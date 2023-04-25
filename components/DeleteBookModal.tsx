import axios from 'axios'
import React, { Dispatch, FormEvent, useState } from 'react'
import Modal from './Modal'
import Heading from './ui/Heading'
import { NotificationManager } from 'react-notifications'
import { Book } from '@/interfaces/Book'
import Button from './ui/Button'
import { deleteBookProps } from './BooksTable'
import { BOOK_API } from '@/lib/constants'

interface deleteBookModalProps {
  data: Book[]
  setData: Dispatch<Book[]>
  deleteBook: deleteBookProps
  setDeleteBook: Dispatch<deleteBookProps>
  skipAutoResetPageIndex: Dispatch<void>
}

const DeleteBookModal = ({
  states: { deleteBook, setDeleteBook, data, setData, skipAutoResetPageIndex },
}: {
  states: deleteBookModalProps
}) => {
  const [raktariJel] = useState(deleteBook.raktariJel)
  const handleDelete = async (e: FormEvent) => {
    e.preventDefault()
    // Delete book from database
    try {
      const res = await axios.delete(`${BOOK_API}/${raktariJel}`)

      if (res) {
        NotificationManager.success(res?.data?.message)
      }

      // Update the table data's state
      skipAutoResetPageIndex()
      setData(data.filter((book) => book.raktariJel !== raktariJel))

      setDeleteBook({ raktariJel: null })
    } catch (error) {
      if (error) {
        NotificationManager.error('Book deletion failed!')
      }
    }
  }

  return (
    <Modal modalKey={'deleteBookModal'}>
      <form
        onSubmit={handleDelete}
        className="h-full w-full grid place-items-center gap-5 p-6 bg-base-100 rounded-xl"
      >
        <Heading intent="secondary">
          Delete book{' '}
          <a
            draggable="false"
            href={'#' + raktariJel}
            className="hover:opacity-60"
            title="Raktári Jel"
          >
            {raktariJel}
          </a>
          ?
        </Heading>

        <div className="flex gap-3">
          <Button type="submit">Yes</Button>
          <Button onClick={() => setDeleteBook({ raktariJel: null })} intent="secondary" btnOutline>
            No
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default DeleteBookModal
