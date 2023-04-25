'use client'
import React, { PropsWithChildren } from 'react'
import { AppProvider } from '@/contexts/AppContext'

const Providers = ({ children }: PropsWithChildren) => {
  return <AppProvider>{children}</AppProvider>
}

export default Providers
