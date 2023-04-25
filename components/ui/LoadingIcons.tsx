import React from 'react'
import type {} from 'react'
import { Bars, Oval } from 'react-loader-spinner'

const mainColor = '#06603A'

const LoadingBars = ({
  fillColor,
  width,
  height,
  ...props
}: {
  fillColor?: string
  width?: number
  height?: number
  className?: string
}) => {
  return (
    <Bars
      width={width ? width : 50}
      height={height ? height : 50}
      color={fillColor ? fillColor : mainColor}
      {...props}
    />
  )
}

interface LoadingCircleProps {
  width?: number
  height?: number
  strokeWidth?: number
  strokeWidthSecondary?: number
  color?: string
  secondaryColor?: string
}

const LoadingCircle = ({
  width,
  height,
  strokeWidth,
  strokeWidthSecondary,
  color,
  secondaryColor,
}: LoadingCircleProps) => {
  return (
    <Oval
      width={width ? width : 40}
      height={height ? height : 40}
      strokeWidth={strokeWidth ? strokeWidth : 5}
      strokeWidthSecondary={strokeWidthSecondary ? strokeWidthSecondary : 5}
      color={color ? color : mainColor}
      secondaryColor={secondaryColor ? color : mainColor}
    />
  )
}

export { LoadingBars, LoadingCircle }
