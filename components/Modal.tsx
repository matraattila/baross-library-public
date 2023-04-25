import React, { useEffect } from 'react'
import { motion } from 'framer-motion'

interface modalProps extends React.AllHTMLAttributes<HTMLDivElement> {
  modalKey: string
}
const Modal = ({ children, className, modalKey }: modalProps) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <motion.div
      className={className}
      key={modalKey}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0.7 }}
      transition={{ type: 'spring', duration: 0.5 }}
      layout
    >
      {children}
    </motion.div>
  )
}

export default Modal
