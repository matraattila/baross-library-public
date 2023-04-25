'use client'
import React, { PropsWithChildren } from 'react'
import Page from '@/components/Page'
import SearchInput from '@/components/SearchInput'
import Heading from '@/components/ui/Heading'

const Layout = ({ children }: PropsWithChildren): JSX.Element => {
  return (
    <Page className="gap-8">
      <Heading className="justify-self-center">Books</Heading>
      <SearchInput className="justify-self-center" />
      {children}
    </Page>
  )
}

export default Layout
