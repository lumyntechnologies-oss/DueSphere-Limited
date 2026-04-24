import React from "react"
import type { Metadata } from "next"
import { ClerkProvider } from "@clerk/nextjs"
import Header from "@/components/header"
import Footer from "@/components/footer"
import CookieConsentBanner from "@/components/cookie-consent"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "DueSphere - Professional Audit & Compliance Services",
    template: "%s | DueSphere"
  },
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
    "audit platform",
    "DueSphere",
    "audit company",
    "security consulting"
  ],
  authors: [{ name: "DueSphere Team" }],
  creator: "DueSphere Limited",
  publisher: "DueSphere Limited",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://due-sphere-limited.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "DueSphere - Professional Audit & Compliance Services",
    description: "Enterprise-grade security, compliance, and performance audits with comprehensive reporting.",
    url: "https://due-sphere-limited.vercel.app",
    siteName: "DueSphere",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DueSphere Audit Services"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "DueSphere - Professional Audit & Compliance Services",
    description: "Enterprise-grade security, compliance, and performance audits with comprehensive reporting.",
    creator: "@duessphere",
    images: ["/og-image.jpg"]
  },
  robots: {
    index: true,
    follow: true,
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
    apple: "/apple-touch-icon.png",
  },
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE"
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "DueSphere Limited",
    "url": "https://due-sphere-limited.vercel.app",
    "logo": "https://due-sphere-limited.vercel.app/logo.png",
    "description": "Enterprise-grade security, compliance, and performance audit services. Comprehensive audits with actionable insights.",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-DUE-SPHERE",
      "contactType": "customer service",
      "email": "info@duesphere.com"
    },
    "sameAs": [
      "https://twitter.com/duessphere",
      "https://linkedin.com/company/duesphere"
    ],
    "service": [
      {
        "@type": "Service",
        "name": "Security Audits",
        "description": "Comprehensive security vulnerability assessment and penetration testing"
      },
      {
        "@type": "Service",
        "name": "Compliance Audits",
        "description": "SOC 2, HIPAA, GDPR, ISO 27001 compliance assessment and certification readiness"
      },
      {
        "@type": "Service",
        "name": "Performance Audits",
        "description": "System optimization and efficiency analysis"
      },
      {
        "@type": "Service",
        "name": "Code Quality Audits",
        "description": "Code review, maintainability assessment, and best practices evaluation"
      }
    ]
  }

  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        </head>
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
