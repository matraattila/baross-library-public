import React from 'react'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import type { InputHTMLAttributes } from 'react'

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof InputStyles> {}

const InputStyles = cva('bg-transparent font-bold', {
  variants: {
    intent: {
      flexGroupItem: 'w-full px-0', // Input that is inside a FlexGroup
    },
    padding: {
      base: 'p-2',
      lg: 'p-3',
      xl: 'p-4',
    },
    border: {
      true: 'border-2',
    },
    focus: {
      true: 'focus:outline-2',
      false: 'focus:outline-none',
    },
  },
  defaultVariants: {
    padding: 'base',
    focus: false,
  },
})

const InputField = ({ intent, className, padding, border, focus, ...props }: InputProps) => {
  return (
    <input
      {...props}
      className={`${className} ${InputStyles({ intent, padding, border, focus })}`}
    />
  )
}

export default InputField
