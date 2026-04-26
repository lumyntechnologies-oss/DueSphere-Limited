import type { Metadata } from "next"
import { prisma } from "@/lib/prisma"
import styles from "./services.module.css"

export const metadata: Metadata = {
  title: "Audit Services | DueSphere",
  description: "Comprehensive security, compliance, performance, and code quality audits designed for enterprise organizations. Get actionable insights and professional reporting.",
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
    "vulnerability assessment"
  ],
  openGraph: {
    title: "Audit Services | DueSphere",
    description: "Comprehensive security, compliance, performance, and code quality audits designed for enterprise organizations.",
    url: "https://www.duespherelimited.co.ke/services",
    siteName: "DueSphere",
    locale: "en_KE",
    type: "website",
    images: [
      {
        url: "/og-services.jpg",
        width: 1200,
        height: 630,
        alt: "DueSphere Audit Services"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Audit Services | DueSphere",
    description: "Comprehensive security, compliance, performance, and code quality audits designed for enterprise organizations.",
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

  return (
    <div className={styles.servicesPage}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.heroTitle}>Our Audit Services</h1>
          <p className={styles.heroSubtitle}>Comprehensive assessments tailored to your organization's needs</p>
        </div>
      </section>

      <section className={styles.servicesSection}>
        <div className={styles.container}>
          {services.length === 0 ? (
            <div className={styles.emptyState}>
              <p>No services available at the moment. Please check back later.</p>
            </div>
          ) : (
            services.map((service) => (
              <div key={service.id} className={styles.serviceDetail}>
                <div className={styles.serviceHeader}>
                  <h2 className={styles.serviceTitle}>{service.icon} {service.title}</h2>
                </div>
                <div className={styles.serviceContent}>
                  <p>{service.description}</p>
                  {service.features.length > 0 && (
                    <>
                      <h3 className={styles.subsectionTitle}>What We Assess:</h3>
                      <ul className={styles.featureList}>
                        {service.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </>
                  )}
                  {service.deliverables.length > 0 && (
                    <p className={styles.deliverableText}>
                      <strong>Deliverables:</strong> {service.deliverables.join(", ")}
                    </p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

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

      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <h2>Let's Strengthen Your Organization</h2>
          <p>Request an audit today and get expert insights into your security, compliance, and operational posture.</p>
          <a href="/contact" className={styles.ctaButton}>Request an Audit</a>
        </div>
      </section>
    </div>
  )
}
