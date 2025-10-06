import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] })


export const metadata: Metadata = {
  title: "Genshin Impact Guide - Characters, Weapons, Artifacts & Teams",
  description: "Comprehensive Genshin Impact guide featuring characters, weapons, artifacts, team compositions, and strategies. Build the perfect team and master the game.",
  keywords: "Genshin Impact, guide, characters, weapons, artifacts, teams, builds, strategy, game guide",
  authors: [{ name: "Genshin Guide Team" }],
  openGraph: {
    title: "Genshin Impact Guide",
    description: "Comprehensive guide to Genshin Impact",
    type: "website",
  },
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
