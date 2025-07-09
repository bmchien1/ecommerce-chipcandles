import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ChipCandles',
  description: 'Created with bmchien1',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
