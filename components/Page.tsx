'use client'
import { motion } from 'framer-motion'
import React, { ReactNode } from 'react'

const Page = ({
  children,
  className = '',
  ...props
}: {
  children: ReactNode
  className?: string
}) => {
  const variants = {
    hidden: { opacity: 0, x: 0, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -200 },
  }

  return (
    <motion.main
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      transition={{ ease: 'anticipate', duration: 0.6 }}
      className={`w-full grid ${className}`}
      {...props}
    >
      {children}
    </motion.main>
  )
}

export default Page
