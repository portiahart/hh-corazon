import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Hart Hospitality',
  icons: {
    icon: 'https://dqfrqjsbfmwtclkclmvc.supabase.co/storage/v1/object/public/brand/hart-favicon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
