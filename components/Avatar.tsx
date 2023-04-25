import React from 'react'
import useApp from '@/hooks/useApp'
import Image from 'next/image'
import { DEFAULT_AVATAR } from '@/lib/constants'

const Avatar = ({ className, ...props }: { className: string }) => {
  const { user } = useApp()

  return (
    <Image
      {...props}
      className={`${className} rounded-full`}
      src={user.avatar ? user.avatar.toString() : DEFAULT_AVATAR}
      width={150}
      height={150}
      alt="Profile"
      title="Profile"
    />
  )
}

export default Avatar
