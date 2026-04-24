import React from "react"
import type { Metadata } from "next"
import { ClerkProvider } from "@clerk/nextjs"
import Header from "@/components/header"
import Footer from "@/components/footer"
import CookieConsentBanner from "@/components/cookie-consent"
import "./globals.css"

export const metadata: Metadata = {
  title: "DueSphere - Professional Audit & Compliance Services",
  description:
    "Enterprise-grade security, compliance, and performance audits. Get comprehensive reports, actionable findings, and improve your systems with DueSphere.",
  keywords: [
    "security audit",
    "compliance audit",
    "code quality assessment",
    "performance audit",
    "enterprise audit",
    "cybersecurity",
    "compliance reporting",
    "audit services",
    "system assessment",
    "audit platform"
  ],
  authors: [{ name: "DueSphere" }],
  creator: "DueSphere",
  publisher: "DueSphere",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://duessphere.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "DueSphere - Professional Audit & Compliance Services",
    description: "Enterprise-grade security, compliance, and performance audits with comprehensive reporting.",
    url: "https://duessphere.vercel.app",
    siteName: "DueSphere",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "DueSphere - Professional Audit & Compliance Services",
    description: "Enterprise-grade security, compliance, and performance audits with comprehensive reporting.",
    creator: "@duessphere",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
  verification: {
    google: "YOUR_VERIFICATION_CODE",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Header />
          <main className="pt-20">{children}</main>
          <Footer />
          <CookieConsentBanner />
        </body>
      </html>
    </ClerkProvider>
  )
}
