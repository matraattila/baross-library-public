'use client'
import React from 'react'
import BooksTable from '@/components/BooksTable'
import Heading from '@/components/ui/Heading'
import useApp from '@/hooks/useApp'
import useFetcher from '@/hooks/useFetcher'
import useSWR from 'swr'
import { BOOK_API } from '@/lib/constants'
import { LoadingCircle } from '@/components/ui/LoadingIcons'

const Books = () => {
  const { searchQuery } = useApp()

  const fetcher = useFetcher()
  const {
    data,
    error: fetchError,
    isValidating,
    mutate,
  } = useSWR(`${BOOK_API}/?searchQuery=${searchQuery}`, fetcher, {
    revalidateOnFocus: false,
  })

  if (fetchError) {
    return <Heading intent="error">{fetchError?.response?.data?.message ?? 'Error'}</Heading>
  }

  if (isValidating || !data) {
    return <LoadingCircle />
  }

  if (data?.books.length === 0) {
    return (
      <Heading intent="notFound" fullWidth>
        No results
      </Heading>
    )
  }

  return <BooksTable books={data.books} mutate={mutate} />
}

export default Books
