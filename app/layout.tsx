import type React from "react"
import type { Metadata } from "next"
import { Inter, DM_Sans } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import InstallPrompt from "@/components/pwa/install-prompt"
import OfflineBanner from "@/components/pwa/offline-banner"
import UpdateNotification from "@/components/pwa/update-notification"
import { NavigationContainer } from "@/components/navigation/navigation-container"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
})

export const metadata: Metadata = {
  title: "Siddu - Movies & Cricket Platform",
  description: "Your ultimate destination for movies and cricket content, reviews, and community discussions.",
  manifest: "/manifest.json",
  themeColor: "#1A1A1A",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Siddu",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: "Siddu - Movies & Cricket Platform",
    description: "Your ultimate destination for movies and cricket content, reviews, and community discussions.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Siddu - Movies & Cricket Platform",
    description: "Your ultimate destination for movies and cricket content, reviews, and community discussions.",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${dmSans.variable} font-sans antialiased bg-background text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <NavigationContainer />
          <main className="pt-16 sm:pt-20 pb-24 sm:pb-0">{children}</main>
          <OfflineBanner />
          <UpdateNotification />
          <InstallPrompt />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
