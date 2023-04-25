'use client'
import React, { HTMLAttributes } from 'react'
import { FormEvent, useState } from 'react'
import processFile from '@/lib/processFile'
import { Book } from '@/interfaces/Book'
import Button from '@/components/ui/Button'
import { NotificationManager } from 'react-notifications'
import { AxiosError, AxiosResponse } from 'axios'
import { ErrorResponse, SuccessResponse } from '@/interfaces/ServerResponse'
import useAxios from '@/hooks/useAxios'
import { ADMIN, BOOK_API, STATISTICS_API } from '@/lib/constants'
import { mutate } from 'swr'
import useApp from '@/hooks/useApp'
import joinClasses from '@/lib/joinClasses'

const UploadBooks = ({ className }: HTMLAttributes<HTMLElement>) => {
  const { user } = useApp()
  const acceptedDocType = 'text/tab-separated-values'
  const [file, setFile] = useState(null)
  const [bookList, setBookList] = useState<Book[]>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const axios = useAxios()

  // File upload
  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const fileList = e.currentTarget.files

    if (fileList[0].type !== acceptedDocType) {
      return NotificationManager.error('Document type is not valid! Please upload a TSV document.')
    }

    const file = fileList[0]
    try {
      setFile(file)
      processFile(file, setBookList)
    } catch (error: any) {
      console.error(error)
    }
  }

  const handleUpload = async () => {
    setLoading(true)

    await axios
      .post(BOOK_API, { bookList })
      .then((res: AxiosResponse<SuccessResponse>) => {
        setLoading(false)
        setFile(null)
        NotificationManager.success(res.data.message)
        mutate(STATISTICS_API) // Fetch new data for chart
      })
      .catch((err: AxiosError<ErrorResponse>) => {
        setLoading(false)
        console.log(err)

        if (err?.response) {
          NotificationManager.error(err.response.data.message)
        }
      })
  }

  if (user.role !== ADMIN) {
    return
  }

  return (
    <section className={joinClasses(className, 'grid place-items-center gap-6 h-max')}>
      <h1 className="text-4xl font-bold">
        Upload a
        <span
          className="cursor-help mx-3 inline-block underline decoration-dashed"
          title="A tab-separated values (TSV) file is a simple text format for storing data in a tabular structure"
        >
          tsv
        </span>
        file
      </h1>

      <input
        onChange={handleChange}
        type="file"
        className="file-input file-input-primary w-full max-w-xs items-center"
      />
      <Button className="p-2" onClick={handleUpload} loading={loading} disabled={!file}>
        Upload
      </Button>
    </section>
  )
}

export default UploadBooks
