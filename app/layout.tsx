import type { Metadata } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['300', '400', '500', '600', '700'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '700', '900'],
})

export const metadata: Metadata = {
  title: 'Briesa — Compliance made simple',
  description: 'AI-powered compliance management. Audit-ready by design.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        {/* Prevent flash of wrong theme */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){
            try {
              var stored = localStorage.getItem('briesa-theme');
              var preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
              var theme = stored || preferred;
              if (theme === 'dark') document.documentElement.classList.add('dark');
            } catch(e) {}
          })();
        `}} />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
