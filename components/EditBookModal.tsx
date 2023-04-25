import React from 'react'
import { Book } from '@/interfaces/Book'
import axios from '@/lib/axios'
import { Dispatch, FormEvent, useState } from 'react'
import Button from './ui/Button'
import FlexGroup from './ui/FlexGroup'
import InputField from './ui/Input'
import { NotificationManager } from 'react-notifications'
import { editedBookProps } from './BooksTable'
import Heading from './ui/Heading'
import Modal from './Modal'
import { BOOK_API } from '@/lib/constants'
import { AnimatePresence } from 'framer-motion'

interface editBookModalProps {
  data: Book[]
  setData: Dispatch<Book[]>
  editedBook: editedBookProps | null
  setEditedBook: Dispatch<editedBookProps | null>
  skipAutoResetPageIndex: Dispatch<void>
}

const EditBookModal = ({
  states: { data, setData, editedBook, setEditedBook, skipAutoResetPageIndex },
}: {
  states: editBookModalProps
}) => {
  const [book] = useState(editedBook.book)
  const [updatedBook, setUpdatedBook] = useState<Book>(book)

  const handleSave = async (e: FormEvent) => {
    e.preventDefault()

    // Update book in database
    try {
      const res = await axios.put(`${BOOK_API}/${book.raktariJel}`, { updatedBook })
      if (res) {
        NotificationManager.success(res?.data?.message)
      }
    } catch (error) {
      if (error) {
        NotificationManager.error('Book editing failed!')
      }
    }

    // Update the table data's state
    skipAutoResetPageIndex()
    setData(
      data.map((row, index) => {
        if (index === editedBook.index) {
          return updatedBook
        }

        return row
      })
    )

    setEditedBook({ index: null, book: null })
  }

  return (
    <AnimatePresence>
      <Modal modalKey={'editBookModal'}>
        <form
          onSubmit={handleSave}
          className="h-full w-full grid place-items-center gap-5 p-6 bg-base-100 rounded-xl "
        >
          <Heading intent="secondary" fullWidth>
            <a
              draggable="false"
              href={'#' + book.raktariJel}
              className="block text-center hover:opacity-60 select-none px-1"
              title="Raktári Jel"
            >
              {book.raktariJel}
            </a>
          </Heading>
          <div className="flex">
            {/* Cutter Szám */}
            <FlexGroup direction="col" gap={0} border={false} items="stretch">
              <label htmlFor="cutterSzam" className="py-2 select-none">
                Cutter Szám
              </label>
              <InputField
                id="cutterSzam"
                onChange={(e) => setUpdatedBook({ ...updatedBook, cutterSzam: e.target.value })}
                defaultValue={book.cutterSzam}
                focus={true}
                border
              />
            </FlexGroup>
            {/* Cím */}
            <FlexGroup direction="col" gap={0} border={false} items="stretch">
              <label htmlFor="cim" className="py-2 select-none">
                Cím
              </label>
              <InputField
                id="cim"
                onChange={(e) => setUpdatedBook({ ...updatedBook, cim: e.target.value })}
                defaultValue={book.cim}
                focus={true}
                border
              />
            </FlexGroup>
            {/* Szerző */}
            <FlexGroup direction="col" gap={0} border={false} items="stretch">
              <label htmlFor="szerzo" className="py-2 select-none">
                Szerző
              </label>
              <InputField
                id="szerzo"
                onChange={(e) =>
                  setUpdatedBook({
                    ...updatedBook,
                    szerzoiAdatok: {
                      ...updatedBook.szerzoiAdatok,
                      szerzo: e.target.value,
                    },
                  })
                }
                defaultValue={book.szerzoiAdatok.szerzo}
                focus={true}
                border
              />
            </FlexGroup>
            {/* Megjelenés */}
            <FlexGroup direction="col" gap={0} border={false} items="stretch">
              <label htmlFor="megjelenes" className="py-2 select-none">
                Megjelenés
              </label>
              <InputField
                id="megjelenes"
                onChange={(e) => setUpdatedBook({ ...updatedBook, megjelenes: e.target.value })}
                defaultValue={book.megjelenes}
                focus={true}
                border
              />
            </FlexGroup>
            {/* Kiadás */}
            <FlexGroup direction="col" gap={0} border={false} items="stretch">
              <label htmlFor="kiadas" className="py-2 select-none">
                Kiadás
              </label>
              <InputField
                id="kiadas"
                onChange={(e) => setUpdatedBook({ ...updatedBook, kiadas: e.target.value })}
                defaultValue={book.kiadas}
                focus={true}
                border
              />
            </FlexGroup>
          </div>
          <div className="flex gap-3">
            <Button type="submit">Save</Button>
            <Button
              onClick={() => setEditedBook({ index: null, book: null })}
              intent="secondary"
              btnOutline
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </AnimatePresence>
  )
}

export default EditBookModal
