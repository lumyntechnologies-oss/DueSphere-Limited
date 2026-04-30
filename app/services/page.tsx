import type { Metadata } from "next"
import { prisma } from "@/lib/prisma"
import styles from "./services.module.css"

export const metadata: Metadata = {
  title: "Due Diligence Services | Organization & Background Checks | DueSphere",
  description: "Comprehensive due diligence services including organization verification, new hire background checks, and vendor risk assessment. Make informed decisions with confidence.",
  keywords: [
    "due diligence services",
    "organization due diligence",
    "background check services",
    "KRA PIN verification",
    "CR12 certificate verification",
    "business permit verification",
    "director background check",
    "vendor due diligence",
    "PEP screening",
    "sanctions screening",
    "beneficial ownership",
    "pre-employment screening",
    "third-party risk assessment"
  ],
  openGraph: {
    title: "Due Diligence Services | DueSphere",
    description: "Comprehensive due diligence for mergers, acquisitions, new hires, and vendor partnerships. Verify organizations and individuals with confidence.",
    url: "https://www.duespherelimited.co.ke/services",
    siteName: "DueSphere",
    locale: "en_KE",
    type: "website",
    images: [
      {
        url: "/og-services.jpg",
        width: 1200,
        height: 630,
        alt: "DueSphere Due Diligence Services"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Due Diligence Services | DueSphere",
    description: "Comprehensive due diligence for mergers, acquisitions, new hires, and vendor partnerships.",
  },
  alternates: {
    canonical: "/services",
  },
  robots: {
    index: true,
    follow: true,
  },
}

const dueDiligenceServices = [
  {
    id: 'dd-org',
    title: 'Organization Due Diligence',
    description: 'Comprehensive background investigations of companies for mergers, acquisitions, or partnerships. We verify legal standing, ownership, financial health, and regulatory compliance.',
    icon: '🏢',
    features: [
      'Corporate registry verification (KRA, Business Permits, CR12)',
      'Beneficial ownership identification',
      'Legal and regulatory compliance review',
      'Financial statement analysis',
      'Litigation and liens search',
      'Sanctions and watchlist screening',
      'Reputation and media screening',
      'Management and director background checks'
    ],
    deliverables: [
      'Due diligence report with risk rating',
      'Verified corporate documents',
      'Sanctions screening results',
      'Ownership structure diagram',
      'Recommendations and red flags'
    ]
  },
  {
    id: 'dd-hire',
    title: 'New Hire Due Diligence',
    description: 'Pre-employment background checks and verification for key personnel, executives, and board members. Ensure you\'re making informed hiring decisions.',
    icon: '👤',
    features: [
      'Identity verification (National ID, Passport)',
      'Education and credential verification',
      'Employment history confirmation',
      'Professional reference checks',
      'Sanctions and PEP screening',
      'Criminal record check (where legally permissible)',
      'Directorship and affiliation searches',
      'Social media and reputation review'
    ],
    deliverables: [
      'Candidate background report',
      'Verification certificates',
      'Risk assessment matrix',
      'Recommendations for hire',
      'Ongoing monitoring setup'
    ]
  },
  {
    id: 'dd-vendor',
    title: 'Vendor & Third-Party Due Diligence',
    description: 'Assess the risk of engaging with third-party vendors, suppliers, and partners. Ensure your extended enterprise meets your standards.',
    icon: '🔗',
    features: [
      'Vendor business verification',
      'Financial stability assessment',
      'Cybersecurity posture review',
      'Compliance with relevant regulations',
      'Insurance and liability coverage check',
      'Supply chain risk analysis',
      'Business continuity planning',
      'Contractual obligation review'
    ],
    deliverables: [
      'Vendor risk assessment report',
      'Compliance checklist',
      'Contract risk analysis',
      'Monitoring recommendations',
      'Escalation procedures'
    ]
  }
]

export default async function ServicesPage() {
  return (
    <div className={styles.servicesPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.heroTitle}>Our Services</h1>
          <p className={styles.heroSubtitle}>Comprehensive due diligence solutions tailored to your organization's needs</p>
        </div>
      </section>

      {/* Due Diligence Services Section */}
      <section id="due-diligence" className={styles.servicesSection} style={{ backgroundColor: '#f8fafc' }}>
        <div className={styles.container}>
          <div className={styles.sectionHeaderCenter}>
            <span className={styles.sectionTag}>Due Diligence</span>
            <h2 className={styles.sectionTitle}>Background Checks & Organization Verification</h2>
            <p className={styles.sectionSubtitle}>
              Mitigate risk and make informed decisions with our thorough due diligence investigations for individuals and organizations.
            </p>
          </div>
          <div className={styles.servicesGrid}>
            {dueDiligenceServices.map((service) => (
              <div key={service.id} id={service.id} className={styles.serviceCard}>
                <div className={styles.serviceIconWrapper}>
                  <span className={styles.serviceIcon}>{service.icon}</span>
                </div>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceDescription}>{service.description}</p>
                <div className={styles.serviceFeatures}>
                  <h4>What We Cover:</h4>
                  <ul>
                    {service.features.slice(0, 4).map((feature: string, idx: number) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <div className={styles.serviceActions}>
                  <a href="/contact?type=organization" className={styles.ctaButton}>Request DD</a>
                  <a href="/due-diligence" className={styles.learnMoreLink}>Learn More →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Due Diligence Process Section */}
      <section className={styles.processSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Due Diligence Process</h2>
          <p style={{textAlign: 'center', maxWidth: '700px', margin: '0 auto 48px', color: '#64748b'}}>
            Our systematic 5-phase approach ensures thorough investigation and reliable risk assessment.
          </p>
          <div className={styles.processSteps}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <h3>Document Collection</h3>
              <p>Gather corporate documents, IDs, permits, and authorization forms.</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <h3>Verification</h3>
              <p>Cross-check all provided documents against official registries and databases.</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <h3>Screening</h3>
              <p>Conduct sanctions, PEP, and adverse media screening on all relevant parties.</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>4</div>
              <h3>Analysis & Reporting</h3>
              <p>Compile findings, assess risk levels, and provide clear recommendations.</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>5</div>
              <h3>Delivery & Debrief</h3>
              <p>Present final report, answer questions, and provide ongoing support as needed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <h2>Ready to Get Started?</h2>
          <p>Our team is ready to help you make informed, confident decisions with thorough due diligence investigations.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '24px' }}>
            <a href="/contact?type=organization" className={styles.ctaButton}>Request Due Diligence</a>
          </div>
        </div>
      </section>
    </div>
  )
}
