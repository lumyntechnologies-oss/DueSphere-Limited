import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Request an Audit | DueSphere Professional Services",
  description: "Request a comprehensive security, compliance, or performance audit from DueSphere. Get started with your audit today and strengthen your organization.",
  keywords: ["audit request", "security audit", "compliance audit", "performance audit", "code quality audit", "ISO 27001", "SOC 2", "GDPR", "HIPAA", "DueSphere"],
  authors: [{ name: "DueSphere Team" }],
  openGraph: {
    title: "Request an Audit | DueSphere Professional Services",
    description: "Request a comprehensive security, compliance, or performance audit from DueSphere. Get started with your audit today.",
    url: "https://www.duespherelimited.co.ke/contact",
    siteName: "DueSphere",
    locale: "en_KE",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DueSphere Audit Request"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Request an Audit | DueSphere Professional Services",
    description: "Request a comprehensive security, compliance, or performance audit from DueSphere.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "/contact",
  },
  robots: {
    index: true,
    follow: true,
  },
}
