'use client'
import React, { FormEvent } from 'react'
import { FormHTMLAttributes } from 'react'
import { FiSearch } from 'react-icons/fi'
import useApp from '@/hooks/useApp'
import Input from '@/ui/Input'
import FlexGroup from '@/components/ui/FlexGroup'
import { useState } from 'react'

const SearchInput = ({ className, ...props }: FormHTMLAttributes<HTMLFormElement>) => {
  const { searchQuery, setSearchQuery } = useApp()
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSearchQuery(inputValue)
  }

  return (
    <form
      {...props}
      className={`flex self-center items-center justify-center gap-0 max-w-[20em] py-2 ${className}`}
      onSubmit={handleSubmit}
    >
      <FlexGroup className="border-none focus-within:shadow-lg backdrop-blur-xl bg-white/95 text-neutral">
        <button className="opacity-60" type="submit" tabIndex={-1}>
          <FiSearch className="text-lg" />
        </button>
        <Input
          className="font-bold placeholder:font-extrabold px-0"
          type="text"
          placeholder="Search"
          defaultValue={searchQuery}
          onChange={(e) => setInputValue(e.target.value)}
          autoFocus
        />
      </FlexGroup>
    </form>
  )
}

export default SearchInput
