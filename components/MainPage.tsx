'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import LoadingPage from './LoadingPage'
import useUser from '@/hooks/useUser'
import { usePathname } from 'next/navigation'
import { ALLOWED_PAGES } from '@/lib/constants'

const MainPage = ({
  children,
  className,
  ...props
}: {
  children: ReactNode | string | boolean | JSX.Element
  className?: string
}): JSX.Element => {
  const variants = {
    hidden: { opacity: 0.8, x: 0, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -200 },
  }

  const pathname = usePathname()
  const { user, isValidating, error } = useUser()

  if (error) {
    return <h1>Error</h1>
  }

  if (isValidating) {
    return <LoadingPage />
  }

  return (
    <motion.main
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      transition={{ ease: 'anticipate', duration: 0.6 }}
      className={`min-h-screen w-full grid gap-14 place-items-start py-10 px-4 md:px-10 bg-[url('/img/svg-abstract-background.svg')] bg-no-repeat bg-cover bg-fixed ${className}
      `}
      {...props}
    >
      {user || ALLOWED_PAGES.includes(pathname) ? children : null}
    </motion.main>
  )
}

export default MainPage
