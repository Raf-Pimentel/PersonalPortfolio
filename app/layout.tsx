import type { Metadata } from 'next'
import { Inter, Fraunces } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-sans' })
const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
  axes: ['opsz'],
})

export const metadata: Metadata = {
  title: 'Rafael Melo, Engineer & Researcher',
  description:
    'Mechatronics Engineering student at Unicamp (Top 3 out of 57). NXTP Fellow, NVIDIA-supported researcher in Computer Vision & Diffusion Models at LIDS, and former President of the Unicamp Entrepreneurship League.',
  openGraph: {
    title: 'Rafael Melo, Engineer & Researcher',
    description:
      'Research across Computer Vision, Diffusion Models, Quantitative Finance and Autonomous Systems. Unicamp Mechatronics Engineering, Top 3 in class.',
    images: [{ url: '/profile-photo.jpg', width: 800, height: 800, alt: 'Rafael Melo' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rafael Melo, Engineer & Researcher',
    description: 'Computer Vision, Diffusion Models, Quantitative Finance & Autonomous Systems.',
    images: ['/profile-photo.jpg'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body>{children}</body>
    </html>
  )
}
