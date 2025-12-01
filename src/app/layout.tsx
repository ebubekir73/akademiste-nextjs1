import type { Metadata } from 'next'
import './globals.css'
import Layout from '@/components/Layout'

export const metadata: Metadata = {
  title: 'Boğaziçi Akademi - Online Özel Ders',
  description: 'Türkiye\'nin en başarılı öğrencilerinden birebir özel ders alın, sınav sürecinizi bir üst seviyeye taşıyın.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/images/WhatsApp_Image_2025-10-18_at_15.52.54-removebg-preview.png', sizes: '192x192', type: 'image/png' }
    ],
    apple: '/images/WhatsApp_Image_2025-10-18_at_15.52.54-removebg-preview.png',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  )
}