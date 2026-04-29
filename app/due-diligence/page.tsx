import type { Metadata } from "next"
import styles from "./due-diligence.module.css"

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
    url: "https://www.duespherelimited.co.ke/due-diligence",
    siteName: "DueSphere",
    locale: "en_KE",
    type: "website",
    images: [
      {
        url: "/og-due-diligence.jpg",
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
    canonical: "/due-diligence",
  },
  robots: {
    index: true,
    follow: true,
  },
}

const dueDiligenceServices = [
  {
    id: 'organization-dd',
    title: 'Organization Due Diligence',
    description: 'Comprehensive background investigations of companies for mergers, acquisitions, or partnerships. Verify legal standing, ownership, financial health, and regulatory compliance before engaging.',
    icon: '🏢',
    features: [
      'Corporate registry verification (KRA, Business Permits, CR12)',
      'Beneficial ownership identification and verification',
      'Legal and regulatory compliance review',
      'Financial statement analysis and stability assessment',
      'Litigation, liens, and encumbrances search',
      'Sanctions and watchlist screening (PEP, OFAC, UN, EU)',
      'Reputation and media screening',
      'Management and director background checks'
    ],
    process: [
      { step: 1, title: "Document Collection", desc: "Gather corporate filings, IDs, permits, and authorization letters" },
      { step: 2, title: "Registry Verification", desc: "Cross-check all documents against official government registries" },
      { step: 3, title: "Screening & Analysis", desc: "Conduct sanctions, PEP, adverse media, and financial risk analysis" },
      { step: 4, title: "Report & Recommendations", desc: "Compile findings, risk ratings, and clear go/no-go guidance" },
      { step: 5, title: "Delivery & Debrief", desc: "Present report, answer questions, and provide ongoing monitoring setup" }
    ],
    useCases: [
      'Mergers & Acquisitions (M&A)',
      'Strategic partnerships & joint ventures',
      'Major vendor onboarding',
      'Investment due diligence',
      'Franchise agreements',
      'Regulatory compliance requirements'
    ]
  },
  {
    id: 'new-hire-dd',
    title: 'New Hire Due Diligence',
    description: 'Pre-employment background checks and verification for key personnel, executives, and board members. Ensure you\'re making informed hiring decisions with thorough screening.',
    icon: '👤',
    features: [
      'Identity verification (National ID, Passport, driver\'s license)',
      'Education and professional credential verification',
      'Employment history and reference confirmation',
      'Professional license and certification validation',
      'Sanctions and PEP (Politically Exposed Person) screening',
      'Criminal record check (where legally permissible)',
      'Directorship and affiliation searches',
      'Social media and public reputation review'
    ],
    process: [
      { step: 1, title: "Consent & Documentation", desc: "Obtain candidate consent and collect required IDs and documents" },
      { step: 2, title: "Verification", desc: "Verify identity, education, employment, and credentials with issuing authorities" },
      { step: 3, title: "Screening", desc: "Run sanctions, PEP, criminal (where allowed), and media screening" },
      { step: 4, title: "Analysis", desc: "Compile findings, assess risk, and flag any concerns for review" },
      { step: 5, title: "Report Delivery", desc: "Provide comprehensive report with hiring recommendation and ongoing monitoring options" }
    ],
    useCases: [
      'C-suite and executive hires',
      'Board member appointments',
      'Key personnel in regulated industries',
      'Financial and accounting roles',
      'Access to sensitive data or systems',
      'Vendor-managed service personnel'
    ]
  },
  {
    id: 'vendor-dd',
    title: 'Vendor & Third-Party Due Diligence',
    description: 'Assess the risk of engaging with third-party vendors, suppliers, and partners. Ensure your extended enterprise meets your security, compliance, and operational standards.',
    icon: '🔗',
    features: [
      'Vendor business registration and legal standing verification',
      'Financial stability and creditworthiness assessment',
      'Cybersecurity posture and data protection review',
      'Compliance with relevant regulations (GDPR, CCPA, etc.)',
      'Insurance coverage and liability limits verification',
      'Supply chain risk analysis and dependencies mapping',
      'Business continuity and disaster recovery planning',
      'Contractual obligation and SLA review'
    ],
    process: [
      { step: 1, title: "Vendor Profiling", desc: "Collect business registration, financials, security policies, and compliance documents" },
      { step: 2, title: "Verification & Assessment", desc: "Validate claims, assess financial health, and review security controls" },
      { step: 3, title: "Risk Analysis", desc: "Evaluate supply chain risks, data handling practices, and business continuity" },
      { step: 4, title: "Decision & Onboarding", desc: "Provide risk rating, mitigation recommendations, and ongoing monitoring plan" },
      { step: 5, title: "Continuous Monitoring", desc: "Set up periodic re-screening and alerting for material changes" }
    ],
    useCases: [
      'Cloud service providers (AWS, Azure, GCP partners)',
      'Data processors and sub-processors',
      'Critical supply chain partners',
      ' Outsourced development and IT services',
      'Payment processors and financial institutions',
      'Logistics and distribution partners'
    ]
  }
]

export default function DueDiligencePage() {
  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}></div>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <span className={styles.heroBadge}>Due Diligence Services</span>
            <h1 className={styles.heroTitle}>
              Verify Before You Engage
            </h1>
            <p className={styles.heroSubtitle}>
              Comprehensive background investigations for organizations and individuals. Make confident decisions with verified intelligence.
            </p>
            <div className={styles.heroCTA}>
              <a href="/contact?type=due-diligence" className={styles.primaryBtn}>
                Request a Due Diligence Assessment
              </a>
              <a href="#services" className={styles.secondaryBtn}>
                Explore Our Services
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section id="services" className={styles.servicesOverview}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>What We Offer</span>
            <h2 className={styles.sectionTitle}>Our Due Diligence Solutions</h2>
            <p className={styles.sectionSubtitle}>
              Three specialized service lines to cover every due diligence need — from M&A to new hires to vendor risk.
            </p>
          </div>

          <div className={styles.servicesGrid}>
            {dueDiligenceServices.map((service) => (
              <div key={service.id} id={service.id} className={styles.serviceCard}>
                <div className={styles.serviceIcon}>{service.icon}</div>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceDescription}>{service.description}</p>
                <div className={styles.serviceFeatures}>
                  <h4>What's Included:</h4>
                  <ul>
                    {service.features.slice(0, 5).map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <a href={`/services#${service.id}`} className={styles.serviceLink}>
                  View Full Details →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Due Diligence Matters */}
      <section className={styles.whySection}>
        <div className={styles.container}>
          <div className={styles.whyGrid}>
            <div className={styles.whyCard}>
              <div className={styles.whyIcon}>⚠️</div>
              <h3>Avoid Costly Mistakes</h3>
              <p>A single poor hiring decision or undisclosed liability can cost millions. Due diligence uncovers red flags before it's too late.</p>
            </div>
            <div className={styles.whyCard}>
              <div className={styles.whyIcon}>⚡</div>
              <h3>Fast, Thorough, Reliable</h3>
              <p>Our structured 5-phase process delivers comprehensive results within days, not weeks, without cutting corners.</p>
            </div>
            <div className={styles.whyCard}>
              <div className={styles.whyIcon}>🛡️</div>
              <h3>Compliance & Peace of Mind</h3>
              <p>Meet regulatory requirements (FATF, GDPR, local laws) and protect your organization from reputational and legal risk.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className={styles.processSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>How It Works</span>
            <h2 className={styles.sectionTitle}>Our 5-Phase Due Diligence Process</h2>
            <p className={styles.sectionSubtitle}>
              A systematic, repeatable approach that ensures thoroughness and consistency across all engagements.
            </p>
          </div>

          <div className={styles.processTimeline}>
            <div className={styles.processStep}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepContent}>
                <h3>Document Collection</h3>
                <p>Gather all required corporate documents, personal IDs, authorizations, and consent forms from the subject.</p>
              </div>
            </div>
            <div className={styles.processStep}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepContent}>
                <h3>Verification</h3>
                <p>Cross-check every provided document against official registries, databases, and issuing authorities to confirm authenticity.</p>
              </div>
            </div>
            <div className={styles.processStep}>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepContent}>
                <h3>Screening</h3>
                <p>Run comprehensive sanctions, PEP, adverse media, and criminal (where permitted) screening on all relevant parties.</p>
              </div>
            </div>
            <div className={styles.processStep}>
              <div className={styles.stepNumber}>4</div>
              <div className={styles.stepContent}>
                <h3>Analysis & Reporting</h3>
                <p>Compile findings, assess risk levels (low/medium/high), and provide clear, actionable recommendations.</p>
              </div>
            </div>
            <div className={styles.processStep}>
              <div className={styles.stepNumber}>5</div>
              <div className={styles.stepContent}>
                <h3>Delivery & Debrief</h3>
                <p>Present the final report, answer questions, and set up ongoing monitoring if required.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <h2>Ready to Mitigate Risk?</h2>
          <p>Get started with a free consultation. Our team will help you determine the right scope for your due diligence needs.</p>
          <div className={styles.ctaActions}>
            <a href="/contact?type=due-diligence" className={styles.ctaButton}>
              Request a Consultation
            </a>
            <a href="tel:+254700000000" className={styles.ctaSecondary}>
              Call Us: +254 700 000 000
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
