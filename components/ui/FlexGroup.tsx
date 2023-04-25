import React from 'react'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import { HTMLAttributes } from 'react'

export interface FlexGroupProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof FlexGroupStyles> {}

const FlexGroupStyles = cva('flex px-3 rounded-lg', {
  variants: {
    direction: {
      col: 'flex-col',
    },
    gap: {
      0: 'gap-0',
      base: 'gap-2',
      lg: 'gap-6',
    },
    items: {
      center: 'items-center',
      start: 'items-start',
      stretch: 'items-stretch',
    },
    justify: {
      start: 'justify-start',
    },
    border: {
      true: 'border-2 border-black/20 focus:border-black/50',
    },
  },
  defaultVariants: {
    gap: 'base',
    items: 'center',
    border: true,
  },
})

const FlexGroup = ({
  className,
  border,
  direction,
  gap,
  justify,
  items,
  children,
  ...props
}: FlexGroupProps) => {
  return (
    <div
      {...props}
      className={`${className} ${FlexGroupStyles({ border, direction, gap, justify, items })}`}
    >
      {children}
    </div>
  )
}

export default FlexGroup
