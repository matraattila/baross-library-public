'use client'
import React, { PropsWithChildren } from 'react'
import { Context } from 'react'
import { UserApp } from '@/interfaces/User'
import { useState, createContext, Dispatch } from 'react'

interface AppContextProps {
  user: UserApp
  setUser: Dispatch<UserApp>
  searchQuery: string
  setSearchQuery: Dispatch<string>
}

const AppContext: Context<AppContextProps> = createContext<AppContextProps | null>(null)

const AppProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<UserApp | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>('')

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export { AppContext, AppProvider }
