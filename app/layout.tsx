import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { Toaster } from 'sonner'
import './globals.css'
import BackToTopButton from '@/components/BacktoTop'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'EventPilot — Intelligent Campus Event Planner',
  description: 'AI-enhanced scheduling and event coordination designed for modern educational institutions.',
  keywords: [
    'EventPilot',
    'college event planner',
    'campus scheduler',
    'AI event management',
    'university event system',
    'smart scheduling'
  ],
  authors: [
    {
      name: 'Soumojit Banerjee',
      url: 'https://github.com/soumojit622',
    },
  ],
  creator: 'soumojit622',
  metadataBase: new URL('https://github.com/soumojit622'),
  icons: {
    icon: '/logo.svg',
  },
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#6366F1",
          colorBackground: "transparent",
          colorText: "#FFFFFF",
          borderRadius: "14px",
          fontFamily: "Poppins, sans-serif",
        },
        elements: {
          // Glassy Auth Card
          card:
            "backdrop-blur-2xl bg-black/40 border border-white/10 shadow-xl p-6 md:p-8",

          headerTitle: "text-white font-semibold text-3xl tracking-tight",
          headerSubtitle: "text-gray-300 text-sm",

          // Inputs
          formFieldInput:
            "bg-white/10 text-white border border-white/20 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder:text-gray-400 transition",

          // Social Auth Buttons
          socialButtonsBlockButton:
            "bg-white/5 border border-white/20 hover:bg-white/10 hover:border-white/30 text-white transition-all duration-200 rounded-lg font-medium",
          socialButtonsIconButton:
            "bg-white/5 border border-white/20 hover:bg-white/10 hover:border-white/30 text-white transition-all duration-200 rounded-lg",
          socialButtonsIcon: "text-white h-5 w-5",

          // Divider between Social and Email Login
          dividerRow:
            "my-6 flex items-center w-full before:flex-1 after:flex-1 before:h-px after:h-px before:bg-white/20 after:bg-white/20",
          dividerText:
            "px-3 text-gray-300 text-xs uppercase tracking-wide",

          // Primary Submit Button
          formButtonPrimary:
            "bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2.5 transition-all rounded-lg shadow-md hover:shadow-lg",

          // Footer / Links (like “Forgot password”)
          footerActionLink:
            "text-indigo-400 hover:text-indigo-300 hover:underline transition",
        },
      }}
    >
      <html lang="en">
        <body className={poppins.variable}>
          <div className="inset-0 bg-[url('/bg1.jpg')] opacity-50 fixed -z-10" />
          {children}
          <Toaster richColors closeButton />
          <BackToTopButton />
        </body>
      </html>
    </ClerkProvider>

  )
}
