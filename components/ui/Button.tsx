import React from 'react'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import type {} from 'react'
import { ButtonHTMLAttributes } from 'react'
import { LoadingBars } from './LoadingIcons'

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof ButtonStyles> {
  loading?: boolean
}

const ButtonStyles = cva('flex items-center gap-2 btn', {
  variants: {
    intent: {
      primary: 'btn-primary font-bold',
      secondary: 'btn-neutral',
      error: 'btn-error',
    },
    btnOutline: {
      true: 'btn-outline',
    },
    fullWidth: {
      true: 'w-full',
    },
    justifyItems: {
      start: 'justify-start',
      center: 'justify-center',
    },
    rounded: {
      full: 'btn-circle',
    },
    fontSize: {
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
    },
  },
  defaultVariants: {
    intent: 'primary',
    fontSize: 'base',
  },
})

const Button = ({
  intent,
  btnOutline,
  fullWidth,
  justifyItems,
  loading,
  rounded,
  fontSize,
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={`${ButtonStyles({
        intent,
        btnOutline,
        fullWidth,
        justifyItems,
        rounded,
        fontSize,
      })} ${className} ${loading ? 'btn-disabled' : ''}`}
    >
      {loading ? <LoadingBars width={30} height={30} /> : children}
    </button>
  )
}

export default Button
