import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Request Due Diligence | DueSphere Professional Services",
  description: "Request comprehensive due diligence services including organization verification and background checks. Get started today and make informed decisions with confidence.",
  keywords: ["due diligence request", "organization due diligence", "background check", "KRA verification", "CR12 certificate", "business permit verification", "director background check", "PEP screening", "DueSphere"],
  authors: [{ name: "DueSphere Team" }],
  openGraph: {
    title: "Request Due Diligence | DueSphere Professional Services",
    description: "Request comprehensive due diligence services. Get started today and make informed decisions with confidence.",
    url: "https://www.duespherelimited.co.ke/contact",
    siteName: "DueSphere",
    locale: "en_KE",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DueSphere Due Diligence Request"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Request Due Diligence | DueSphere Professional Services",
    description: "Request comprehensive due diligence services. Get started today and make informed decisions.",
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
