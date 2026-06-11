import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  title: 'Rafael Melo – Engineer & Researcher',
  description:
    'Mechatronics Engineering student at Unicamp (Top 2 in class). NVIDIA-supported researcher in Computer Vision & Diffusion Models, Visiting Researcher at University of West Bohemia, and President of Unicamp Entrepreneurship League.',
  openGraph: {
    title: 'Rafael Melo – Engineer & Researcher',
    description:
      'Researcher in Computer Vision, Diffusion Models, and Autonomous Systems. Unicamp Mechatronics Engineering – Top 2 in class.',
    images: [{ url: '/profile-photo.jpg', width: 800, height: 800, alt: 'Rafael Melo' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rafael Melo – Engineer & Researcher',
    description: 'Researcher in Computer Vision, Diffusion Models & Autonomous Systems.',
    images: ['/profile-photo.jpg'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
