import type { Metadata, Viewport } from 'next'
import './globals.css'
import { AppStoreProvider } from '@/store/app-store'

export const metadata: Metadata = {
  title: 'PetStay AI',
  description: '성향 분석, 루틴, 리포트, 커뮤니티, 커머스를 연결하는 반려생활 운영 앱',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f97316',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='ko'>
      <body className='min-h-screen bg-[#fffaf5] text-foreground antialiased'>
        <AppStoreProvider>{children}</AppStoreProvider>
      </body>
    </html>
  )
}