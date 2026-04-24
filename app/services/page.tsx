import type { Metadata } from "next"
import styles from "./services.module.css"

export const metadata: Metadata = {
  title: "Audit Services | DueSphere",
  description: "Comprehensive security, compliance, performance, and code quality audits designed for enterprise organizations.",
  keywords: [
    "security audit",
    "compliance audit",
    "performance audit",
    "code quality audit",
    "enterprise audit services"
  ],
  openGraph: {
    title: "Audit Services | DueSphere",
    description: "Comprehensive security, compliance, performance, and code quality audits.",
    url: "https://duessphere.vercel.app/services",
    type: "website",
  },
}

export default function ServicesPage() {
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
          <div className={styles.serviceDetail}>
            <div className={styles.serviceHeader}>
              <h2 className={styles.serviceTitle}>🔒 Security Audits</h2>
            </div>
            <div className={styles.serviceContent}>
              <p>
                Identify vulnerabilities and strengthen your security posture with our comprehensive security assessments.
              </p>
              <h3 className={styles.subsectionTitle}>What We Assess:</h3>
              <ul className={styles.featureList}>
                <li>Infrastructure security and network architecture</li>
                <li>Application security and code vulnerabilities</li>
                <li>Access control and authentication mechanisms</li>
                <li>Data protection and encryption practices</li>
                <li>Threat landscape and exposure analysis</li>
                <li>Security policies and incident response procedures</li>
              </ul>
              <p className={styles.deliverableText}>
                <strong>Deliverables:</strong> Vulnerability report, risk assessment matrix, prioritized remediation roadmap, and executive summary.
              </p>
            </div>
          </div>

          <div className={styles.serviceDetail}>
            <div className={styles.serviceHeader}>
              <h2 className={styles.serviceTitle}>✓ Compliance Audits</h2>
            </div>
            <div className={styles.serviceContent}>
              <p>
                Ensure your organization meets regulatory requirements and industry standards with detailed compliance assessment.
              </p>
              <h3 className={styles.subsectionTitle}>What We Assess:</h3>
              <ul className={styles.featureList}>
                <li>Regulatory requirements (SOC 2, HIPAA, GDPR, ISO 27001, etc.)</li>
                <li>Policies, controls, and procedures documentation</li>
                <li>Data handling and privacy practices</li>
                <li>Audit trails and logging requirements</li>
                <li>Employee training and awareness programs</li>
                <li>Documentation and evidence gathering</li>
              </ul>
              <p className={styles.deliverableText}>
                <strong>Deliverables:</strong> Compliance gap analysis, control mapping, remediation plan, and certification readiness assessment.
              </p>
            </div>
          </div>

          <div className={styles.serviceDetail}>
            <div className={styles.serviceHeader}>
              <h2 className={styles.serviceTitle}>⚡ Performance Audits</h2>
            </div>
            <div className={styles.serviceContent}>
              <p>
                Optimize system efficiency and operational effectiveness through comprehensive performance analysis.
              </p>
              <h3 className={styles.subsectionTitle}>What We Assess:</h3>
              <ul className={styles.featureList}>
                <li>System performance metrics and benchmarks</li>
                <li>Resource utilization and capacity planning</li>
                <li>Scalability and bottleneck analysis</li>
                <li>Infrastructure optimization opportunities</li>
                <li>Cost efficiency and operational overhead</li>
                <li>Disaster recovery and business continuity</li>
              </ul>
              <p className={styles.deliverableText}>
                <strong>Deliverables:</strong> Performance report, optimization recommendations, cost-benefit analysis, and implementation timeline.
              </p>
            </div>
          </div>

          <div className={styles.serviceDetail}>
            <div className={styles.serviceHeader}>
              <h2 className={styles.serviceTitle}>📝 Code Quality Audits</h2>
            </div>
            <div className={styles.serviceContent}>
              <p>
                Evaluate code quality, maintainability, and adherence to best practices across your software projects.
              </p>
              <h3 className={styles.subsectionTitle}>What We Assess:</h3>
              <ul className={styles.featureList}>
                <li>Code architecture and design patterns</li>
                <li>Security vulnerabilities in codebase</li>
                <li>Code maintainability and technical debt</li>
                <li>Testing coverage and quality assurance practices</li>
                <li>Performance and optimization opportunities</li>
                <li>Compliance with coding standards and best practices</li>
              </ul>
              <p className={styles.deliverableText}>
                <strong>Deliverables:</strong> Code quality report, vulnerability findings, refactoring recommendations, and metrics dashboard.
              </p>
            </div>
          </div>
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
