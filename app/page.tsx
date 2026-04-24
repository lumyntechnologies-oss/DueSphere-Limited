"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import styles from "./page.module.css"

interface Stats {
  auditsCompleted: number
  clientsServed: number
  findingsResolved: number
}

export default function HomePage() {
  const [stats, setStats] = useState<Stats>({
    auditsCompleted: 0,
    clientsServed: 0,
    findingsResolved: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/stats")
        const data = await res.json()
        setStats(data)
      } catch (error) {
        console.error("Failed to fetch stats:", error)
        setStats({ auditsCompleted: 150, clientsServed: 45, findingsResolved: 820 })
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return (
    <div className={styles.homePage}>
      {/* Hero Section with Image Background */}
      <section className={styles.hero}>
        <div className={styles.heroImageWrapper}>
          <Image
            src="/image1.png"
            alt="DueSphere Audit Platform"
            fill
            className={styles.heroImage}
            priority
          />
        </div>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <span className={styles.heroTag}>Trusted by Industry Leaders</span>
          <h1 className={styles.heroTitle}>DueSphere</h1>
          <p className={styles.heroSubtitle}>Enterprise Audit & Compliance Services</p>
          <p className={styles.heroDescription}>
            Comprehensive security, compliance, and performance audits designed to strengthen your systems and protect your organization.
          </p>
          <div className={styles.heroActions}>
            <Link href="/contact" className={styles.primaryBtn}>
              Request an Audit
            </Link>
            <Link href="/services" className={styles.secondaryBtn}>
              Explore Services
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className={styles.statsBar}>
        <div className={styles.container}>
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <h3 className={styles.statNumber}>{loading ? "..." : stats.auditsCompleted}</h3>
              <p className={styles.statLabel}>Audits Completed</p>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <h3 className={styles.statNumber}>{loading ? "..." : stats.clientsServed}</h3>
              <p className={styles.statLabel}>Clients Served</p>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <h3 className={styles.statNumber}>{loading ? "..." : stats.findingsResolved}</h3>
              <p className={styles.statLabel}>Findings Resolved</p>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <h3 className={styles.statNumber}>99%</h3>
              <p className={styles.statLabel}>Client Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section with Image */}
      <section className={styles.aboutSection}>
        <div className={styles.container}>
          <div className={styles.aboutGrid}>
            <div className={styles.aboutImageWrapper}>
              <Image
                src="/image2.png"
                alt="Our audit team at work"
                width={560}
                height={400}
                className={styles.aboutImage}
              />
            </div>
            <div className={styles.aboutContent}>
              <span className={styles.sectionTag}>Who We Are</span>
              <h2 className={styles.sectionTitle}>Trust Through Transparency</h2>
              <p className={styles.aboutText}>
                DueSphere delivers comprehensive audits that identify vulnerabilities, ensure compliance, and drive organizational excellence. Our expert team provides actionable insights backed by thorough analysis and professional reporting.
              </p>
              <ul className={styles.featureList}>
                <li className={styles.featureItem}>
                  <span className={styles.featureIcon}>✓</span>
                  <span>ISO 27001 & SOC 2 Certified Auditors</span>
                </li>
                <li className={styles.featureItem}>
                  <span className={styles.featureIcon}>✓</span>
                  <span>Real-time Reporting Dashboard</span>
                </li>
                <li className={styles.featureItem}>
                  <span className={styles.featureIcon}>✓</span>
                  <span>24/7 Security Monitoring</span>
                </li>
              </ul>
              <Link href="/about" className={styles.learnMoreLink}>
                Learn More About Us →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className={styles.servicesSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeaderCenter}>
            <span className={styles.sectionTag}>What We Offer</span>
            <h2 className={styles.sectionTitle}>Our Audit Services</h2>
            <p className={styles.sectionSubtitle}>
              Tailored audit solutions for every aspect of your organization's security and compliance needs.
            </p>
          </div>
          <div className={styles.servicesGrid}>
            <div className={styles.serviceCard}>
              <div className={styles.serviceIconWrapper}>
                <span className={styles.serviceIcon}>🔒</span>
              </div>
              <h3 className={styles.serviceTitle}>Security Audits</h3>
              <p className={styles.serviceDescription}>
                Identify vulnerabilities and strengthen your security posture with comprehensive threat assessment and penetration testing.
              </p>
              <Link href="/services" className={styles.serviceLink}>
                Learn More →
              </Link>
            </div>

            <div className={styles.serviceCard}>
              <div className={styles.serviceIconWrapper}>
                <span className={styles.serviceIcon}>✓</span>
              </div>
              <h3 className={styles.serviceTitle}>Compliance Audits</h3>
              <p className={styles.serviceDescription}>
                Ensure adherence to regulatory requirements and industry standards with detailed compliance assessment and reporting.
              </p>
              <Link href="/services" className={styles.serviceLink}>
                Learn More →
              </Link>
            </div>

            <div className={styles.serviceCard}>
              <div className={styles.serviceIconWrapper}>
                <span className={styles.serviceIcon}>⚡</span>
              </div>
              <h3 className={styles.serviceTitle}>Performance Audits</h3>
              <p className={styles.serviceDescription}>
                Optimize system performance and efficiency through detailed analysis and actionable recommendations.
              </p>
              <Link href="/services" className={styles.serviceLink}>
                Learn More →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className={styles.whySection}>
        <div className={styles.container}>
          <div className={styles.sectionHeaderCenter}>
            <span className={styles.sectionTagDark}>Why Choose Us</span>
            <h2 className={styles.sectionTitleDark}>The DueSphere Advantage</h2>
          </div>
          <div className={styles.whyGrid}>
            <div className={styles.whyCard}>
              <div className={styles.whyImagePlaceholder}>
                <Image src="/image3.png" alt="Data driven" width={80} height={80} className={styles.whyImg} />
              </div>
              <h3 className={styles.whyCardTitle}>Data-Driven Analysis</h3>
              <p className={styles.whyCardText}>
                We use advanced tools and methodologies to provide comprehensive, quantifiable insights into your organization's security and compliance posture.
              </p>
            </div>

            <div className={styles.whyCard}>
              <div className={styles.whyIcon}>👥</div>
              <h3 className={styles.whyCardTitle}>Expert Team</h3>
              <p className={styles.whyCardText}>
                Our certified auditors bring decades of combined experience across multiple industries and compliance frameworks.
              </p>
            </div>

            <div className={styles.whyCard}>
              <div className={styles.whyIcon}>📋</div>
              <h3 className={styles.whyCardTitle}>Clear Reporting</h3>
              <p className={styles.whyCardText}>
                Receive detailed reports with executive summaries, risk assessments, and prioritized recommendations for immediate action.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaImageWrapper}>
          <Image
            src="/image1.png"
            alt="Background"
            fill
            className={styles.ctaImage}
          />
        </div>
        <div className={styles.ctaOverlay}></div>
        <div className={`${styles.container} ${styles.ctaContainer}`}>
          <span className={styles.ctaTag}>Ready to Get Started?</span>
          <h2 className={styles.ctaTitle}>Secure Your Organization Today</h2>
          <p className={styles.ctaText}>
            Let our experts conduct a comprehensive audit of your systems. Identify vulnerabilities, ensure compliance, and achieve peace of mind.
          </p>
          <Link href="/contact" className={styles.ctaButton}>
            Request Your Audit
          </Link>
        </div>
      </section>
    </div>
  )
}

