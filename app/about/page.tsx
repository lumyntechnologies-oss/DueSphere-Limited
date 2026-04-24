import type { Metadata } from "next"
import styles from "./about.module.css"

export const metadata: Metadata = {
  title: "About DueSphere | Enterprise Audit Platform",
  description: "Learn about DueSphere, the professional audit and compliance platform. Discover our mission to help organizations achieve security, compliance, and operational excellence through comprehensive audits.",
  keywords: [
    "about DueSphere",
    "audit platform",
    "compliance services",
    "enterprise audits",
    "security assessments",
    "audit company"
  ],
  openGraph: {
    title: "About DueSphere | Enterprise Audit Platform",
    description: "Learn about DueSphere, the professional audit and compliance platform.",
    url: "https://duessphere.vercel.app/about",
    siteName: "DueSphere",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About DueSphere | Enterprise Audit Platform",
    description: "Learn about DueSphere, the professional audit and compliance platform.",
  },
}

export default async function AboutPage() {
  return (
    <div className={styles.aboutPage}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>About DueSphere</h1>
          <p className={styles.heroSubtitle}>Trust Through Rigorous, Professional Assessment</p>
        </div>
      </section>

      <section className={styles.missionSection}>
        <div className={styles.container}>
          <div className={styles.missionGrid}>
            <div className={styles.missionContent}>
              <h2 className={styles.sectionTitle}>Our Mission</h2>
              <p className={styles.missionText}>
                DueSphere empowers organizations to achieve operational excellence, regulatory compliance, and robust security through comprehensive, professional audits. We provide the insights and analysis organizations need to identify risks, strengthen systems, and build stakeholder confidence.
              </p>
              <p className={styles.missionText}>
                We believe that every organization deserves expert-level audit services backed by rigorous methodology and transparent reporting. Our commitment is to deliver actionable findings that drive meaningful improvement.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.missionSection}>
        <div className={styles.container}>
          <div className={styles.missionGrid}>
            <div className={styles.missionContent}>
              <h2 className={styles.sectionTitle}>Our Values</h2>
              <p className={styles.missionText}>
                At DueSphere, we are guided by principles that shape every audit we conduct and every report we deliver.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.valuesSection}>
        <div className={styles.container}>
          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>🔍</div>
              <h3 className={styles.valueTitle}>Rigor</h3>
              <p className={styles.valueText}>
                We apply exhaustive, methodical approaches to every audit, ensuring comprehensive coverage and precise findings.
              </p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>🎯</div>
              <h3 className={styles.valueTitle}>Precision</h3>
              <p className={styles.valueText}>
                Our expert team delivers accurate assessments and actionable recommendations tailored to your organization.
              </p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>📊</div>
              <h3 className={styles.valueTitle}>Transparency</h3>
              <p className={styles.valueText}>
                Clear, detailed reporting gives you complete visibility into findings, risks, and the path forward.
              </p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>🤝</div>
              <h3 className={styles.valueTitle}>Partnership</h3>
              <p className={styles.valueText}>
                We work as your trusted advisors, committed to your organization's success and growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.serviceSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>What We Audit</h2>
          <div className={styles.servicesGrid}>
            <div className={styles.serviceCard}>
              <h3 className={styles.serviceTitle}>Security Audits</h3>
              <p className={styles.serviceText}>
                Comprehensive security assessments identifying vulnerabilities, threats, and exposure points across your systems and infrastructure.
              </p>
            </div>
            <div className={styles.serviceCard}>
              <h3 className={styles.serviceTitle}>Compliance Audits</h3>
              <p className={styles.serviceText}>
                Ensure adherence to regulatory requirements and industry standards with detailed assessment of policies, controls, and procedures.
              </p>
            </div>
            <div className={styles.serviceCard}>
              <h3 className={styles.serviceTitle}>Performance Audits</h3>
              <p className={styles.serviceText}>
                Evaluate system efficiency, optimize resource utilization, and identify opportunities for operational improvement.
              </p>
            </div>
            <div className={styles.serviceCard}>
              <h3 className={styles.serviceTitle}>Code Quality Audits</h3>
              <p className={styles.serviceText}>
                Analyze your codebase for quality, maintainability, security issues, and best practice adherence.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.commitmentSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Our Commitment</h2>
          <div className={styles.commitmentGrid}>
            <div className={styles.commitmentItem}>
              <div className={styles.commitmentIcon}>✓</div>
              <h3>Expert Assessment</h3>
              <p>Certified auditors with deep industry experience and technical expertise.</p>
            </div>
            <div className={styles.commitmentItem}>
              <div className={styles.commitmentIcon}>✓</div>
              <h3>Detailed Reporting</h3>
              <p>Comprehensive reports with executive summaries, risk ratings, and prioritized recommendations.</p>
            </div>
            <div className={styles.commitmentItem}>
              <div className={styles.commitmentIcon}>✓</div>
              <h3>Actionable Insights</h3>
              <p>Practical, implementable recommendations that drive real improvement.</p>
            </div>
            <div className={styles.commitmentItem}>
              <div className={styles.commitmentIcon}>✓</div>
              <h3>Ongoing Support</h3>
              <p>Partner with us throughout your audit journey for questions and guidance.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <h2 className={styles.ctaTitle}>Ready to Get Started?</h2>
          <p className={styles.ctaText}>
            Let&apos;s work together to strengthen your organization and achieve peace of mind.
          </p>
          <a href="/contact" className={styles.ctaButton}>
            Request an Audit
          </a>
        </div>
      </section>
    </div>
  )
}
