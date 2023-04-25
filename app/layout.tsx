'use client'
import './globals.css'
import 'react-notifications/lib/notifications.css'

import '@fontsource/baskervville'
import '@fontsource/orienta'
import '@fontsource/lora'
import '@fontsource/public-sans'

import React from 'react'
import Providers from './providers'
import Sidebar from '@/components/Sidebar'
import MainPage from '@/components/MainPage'
import { NotificationContainer } from 'react-notifications'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // const [theme, setTheme] = useState<string>('light')
  // useEffect(() => {
  //   if (localStorage.getItem('theme') !== '') {
  //     setTheme(localStorage.getItem('theme'))
  //   }
  // })

  return (
    <html
    // data-theme={theme}
    >
      <body className="flex justify-items-stretch">
        <Providers>
          <Sidebar />
          <MainPage>{children}</MainPage>
        </Providers>
        <NotificationContainer />
      </body>
    </html>
  )
}
