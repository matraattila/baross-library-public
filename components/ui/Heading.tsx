import React, { HTMLAttributes } from 'react'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import { BiErrorCircle } from 'react-icons/bi'

export interface HeadingProps
  extends HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof HeadingStyles> {}

const HeadingStyles = cva('font-bold mb-2', {
  variants: {
    intent: {
      primary: 'text-5xl',
      secondary: 'text-4xl',
      tertiary: 'text-3xl',
      notFound: 'text-xl px-4 py-3 rounded-md bg-base-100/90',
      error: 'flex gap-2 max-w-fit alert bg-error/90 text-base-100 text-xl font-bold',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
    fullWidth: {
      true: 'w-full',
    },
  },
  defaultVariants: {
    intent: 'primary',
    align: 'left',
  },
})

const Heading = ({ intent, fullWidth, className, children, ...props }: HeadingProps) => {
  return (
    <h1 {...props} className={`${className} ${HeadingStyles({ intent, fullWidth })}`}>
      {intent === 'error' && <BiErrorCircle className="text-3xl" />}
      {children}
    </h1>
  )
}

export default Heading
