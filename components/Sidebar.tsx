'use client'
import React from 'react'
import { ImBooks, ImHome, ImUpload } from 'react-icons/im'
import { usePathname, useRouter } from 'next/navigation'
import Avatar from '@/components/Avatar'
import useApp from '@/hooks/useApp'
import Link from 'next/link'
import { useMemo } from 'react'
import { MdLogout } from 'react-icons/md'
import { NotificationManager } from 'react-notifications'
import useAxios from '@/hooks/useAxios'
import Button from './ui/Button'
import { LOGIN_PAGE, LOGOUT_API } from '@/lib/constants'

const Sidebar = () => {
  const router = useRouter()
  const { user, setUser } = useApp()
  const pathname = usePathname()
  const axios = useAxios()

  const Links = useMemo(
    () => [
      { name: 'Home', href: '/', icon: <ImHome />, tooltip: 'Home' },
      { name: 'Books', href: '/books', icon: <ImBooks />, tooltip: 'Books' },
      // {
      //   name: 'User Management',
      //   href: '/user-management',
      //   icon: <ImUsers />,
      //   tooltip: 'User Management',
      // },
    ],
    []
  )

  const handleLogout = async () => {
    await axios
      .post(LOGOUT_API)
      .then(() => {
        router.push(LOGIN_PAGE)
      })
      .then(() => NotificationManager.info('You have logged out!'))
      .catch(() => NotificationManager.error('Oops, an error occured! Please try again!'))
      .finally(() => setUser(null))
  }

  return (
    <nav
      className={`h-screen min-w-[1fr] sticky top-0 grid gap-24 py-5 px-3 bg-primary text-base-100 text-xl select-none`}
    >
      <div className="flex flex-col gap-7">
        <ul className="flex flex-col items-center gap-4">
          {Links.map((link, i) => (
            <li key={i}>
              <Link
                className={`p-4 flex items-center rounded-full font-bold active:scale-95 opacity-90 hover:opacity-100
                ${
                  link.href === pathname
                    ? 'bg-base-100/95 text-primary opacity-100'
                    : 'hover:bg-base-100/10'
                } text-3xl justify-center`}
                key={link.href}
                href={link.href}
                title={link.name}
              >
                <span>{link.icon}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {user ? (
        <div className={`self-end flex flex-col gap-2 px-2 py-2 rounded-lg`}>
          <Link
            href={'/profile'}
            className={`${
              pathname === '/profile' ? 'bg-base-100/20' : ''
            } flex gap-5 p-2 rounded-lg`}
          >
            <Avatar className="self-start justify-self-start min-w-[40px] max-w-[2.5em]" />
          </Link>
          <Button
            onClick={handleLogout}
            title="Log Out"
            className="bg-transparent border-none focus:outline-base-100 focus:outline-2"
          >
            <MdLogout className="text-2xl" />
          </Button>
        </div>
      ) : (
        ''
      )}
    </nav>
  )
}

export default Sidebar
