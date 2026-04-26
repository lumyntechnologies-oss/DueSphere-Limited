import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "DueSphere News & Blog | Audit & Compliance Updates",
  description: "Stay informed about DueSphere news, audit insights, compliance updates, and professional services covering ISO 27001, SOC 2, GDPR, and HIPAA.",
  keywords: ["DueSphere", "audit services", "compliance", "security audit", "performance audit", "audit reports", "professional services", "ISO 27001", "SOC 2", "GDPR", "HIPAA"],
  authors: [{ name: "DueSphere Team" }],
  openGraph: {
    title: "DueSphere News & Blog | Audit & Compliance Updates",
    description: "Stay informed about DueSphere news, audit insights, compliance updates, and professional services covering ISO 27001, SOC 2, GDPR, and HIPAA.",
    url: "https://www.duespherelimited.co.ke/news",
    siteName: "DueSphere",
    locale: "en_KE",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DueSphere News & Updates"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "DueSphere News & Blog | Audit & Compliance Updates",
    description: "Stay informed about DueSphere news, audit insights, compliance updates, and professional services covering ISO 27001, SOC 2, GDPR, and HIPAA.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "/news",
  },
  robots: {
    index: true,
    follow: true,
  },
}
