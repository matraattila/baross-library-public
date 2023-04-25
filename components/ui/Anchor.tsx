import React from 'react'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import { HTMLAttributes } from 'react'

export interface AnchorProps
  extends HTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof AnchorStyles> {
  href: string
}

const AnchorStyles = cva('block p-2.5 hover:opacity-50 focus:scale-90', {
  variants: {
    text: {
      primary: 'text-primary',
    },
    size: {
      lg: 'text-lg',
      xl: 'text-xl',
    },
  },
  defaultVariants: {
    size: 'lg',
  },
})

const Anchor = ({ className, href, color, size, children, ...props }: AnchorProps) => {
  return (
    <a href={href} {...props} className={`${className} ${AnchorStyles({ size })}`}>
      {children}
    </a>
  )
}

export default Anchor
