import type { Metadata } from "next"
import { prisma } from "@/lib/prisma"
import styles from "./services.module.css"

export const metadata: Metadata = {
  title: "Audit & Due Diligence Services | DueSphere",
  description: "Comprehensive audits and due diligence services including security, compliance, background checks, organization verification for enterprises.",
  keywords: [
    "security audit services",
    "compliance audit",
    "performance audit",
    "code quality audit",
    "enterprise audit services",
    "SOC 2 compliance",
    "HIPAA audit",
    "GDPR compliance",
    "ISO 27001",
    "vulnerability assessment",
    "due diligence services",
    "organization due diligence",
    "background check services",
    "KRA PIN verification",
    "CR12 certificate",
    "business permit verification",
    "director background check",
    "vendor due diligence"
  ],
  openGraph: {
    title: "Audit & Due Diligence Services | DueSphere",
    description: "Comprehensive audits and due diligence services including security, compliance, background checks, organization verification for enterprises.",
    url: "https://www.duespherelimited.co.ke/services",
    siteName: "DueSphere",
    locale: "en_KE",
    type: "website",
    images: [
      {
        url: "/og-services.jpg",
        width: 1200,
        height: 630,
        alt: "DueSphere Audit & Due Diligence Services"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Audit & Due Diligence Services | DueSphere",
    description: "Comprehensive audits and due diligence services including security, compliance, background checks, organization verification for enterprises.",
  },
  alternates: {
    canonical: "/services",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  })

  // Separate services into audit and due diligence categories
  const auditServices = services.filter(s => 
    s.title.toLowerCase().includes('audit') || 
    ['security', 'compliance', 'performance', 'code quality'].some(keyword => 
      s.title.toLowerCase().includes(keyword)
    )
  )
  
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

  return (
    <div className={styles.servicesPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.heroTitle}>Our Services</h1>
          <p className={styles.heroSubtitle}>Comprehensive audits and due diligence solutions tailored to your organization's needs</p>
        </div>
      </section>

      {/* Audit Services Section */}
      <section className={styles.servicesSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeaderCenter}>
            <span className={styles.sectionTag}>Audit Services</span>
            <h2 className={styles.sectionTitle}>Security, Compliance & Performance Audits</h2>
            <p className={styles.sectionSubtitle}>
              Identify vulnerabilities, ensure regulatory compliance, and optimize system performance with our expert audit services.
            </p>
          </div>
          {auditServices.length === 0 ? (
            <div className={styles.emptyState}>
              <p>No audit services available at the moment.</p>
            </div>
          ) : (
            <div className={styles.servicesGrid}>
              {auditServices.map((service) => (
                <div key={service.id} className={styles.serviceCard}>
                  <div className={styles.serviceIconWrapper}>
                    <span className={styles.serviceIcon}>{service.icon}</span>
                  </div>
                  <h3 className={styles.serviceTitle}>{service.title}</h3>
                  <p className={styles.serviceDescription}>{service.description}</p>
                  {service.features && service.features.length > 0 && (
                    <div className={styles.serviceFeatures}>
                      <h4>What We Assess:</h4>
                      <ul>
                        {service.features.slice(0, 4).map((feature: string, idx: number) => (
                          <li key={idx}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className={styles.serviceActions}>
                    <a href="/contact?type=audit" className={styles.ctaButton}>Request Audit</a>
                    <a href={`#${service.id}`} className={styles.learnMoreLink}>Learn More</a>
                  </div>
                </div>
              ))}
            </div>
          )}
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
                  <a href="/contact?type=due-diligence" className={styles.ctaButton}>Request DD</a>
                  <a href="/due-diligence" className={styles.learnMoreLink}>Learn More →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audit Process Section */}
      <section className={styles.processSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Our Audit Process</h2>
          <div className={styles.processSteps}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <h3>Consultation</h3>
              <p>We discuss your needs, scope, and objectives to tailor the audit perfectly.</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <h3>Assessment</h3>
              <p>Our experts conduct thorough analysis using rigorous methodologies.</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <h3>Analysis</h3>
              <p>We compile findings, evaluate severity, and prioritize recommendations.</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>4</div>
              <h3>Reporting</h3>
              <p>You receive comprehensive reports with clear, actionable insights.</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>5</div>
              <h3>Support</h3>
              <p>We're available to discuss findings and support your remediation efforts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Due Diligence Process Section */}
      <section className={styles.processSection} style={{ backgroundColor: '#f8fafc' }}>
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
          <p>Whether you need a security audit or due diligence investigation, our team is ready to help you make informed, confident decisions.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '24px' }}>
            <a href="/contact?type=audit" className={styles.ctaButton}>Request an Audit</a>
            <a href="/contact?type=due-diligence" className={styles.ctaButton} style={{ background: 'transparent', border: '2px solid white', color: 'white' }}>Request Due Diligence</a>
          </div>
        </div>
      </section>
    </div>
  )
}
