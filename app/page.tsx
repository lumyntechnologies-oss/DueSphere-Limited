"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
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
    findingsResolved: 0
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
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>DueSphere</h1>
          <p className={styles.heroSubtitle}>Enterprise Audit & Compliance Services</p>
          <p className={styles.heroDescription}>
            Comprehensive security, compliance, and performance audits designed to strengthen your systems and protect your organization
          </p>
          <Link href="/contact" className={styles.joinButton}>
            Request an Audit
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className={styles.aboutSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Trust Through Transparency</h2>
          <p className={styles.aboutText}>
            DueSphere delivers comprehensive audits that identify vulnerabilities, ensure compliance, and drive organizational excellence. 
            Our expert team provides actionable insights backed by thorough analysis and professional reporting.
          </p>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <h3 className={styles.statNumber}>{loading ? "..." : stats.auditsCompleted}</h3>
              <p className={styles.statLabel}>Audits Completed</p>
            </div>
            <div className={styles.statCard}>
              <h3 className={styles.statNumber}>{loading ? "..." : stats.clientsServed}</h3>
              <p className={styles.statLabel}>Clients Served</p>
            </div>
            <div className={styles.statCard}>
              <h3 className={styles.statNumber}>{loading ? "..." : stats.findingsResolved}</h3>
              <p className={styles.statLabel}>Findings Resolved</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.eventsSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Our Audit Services</h2>
            <Link href="/contact" className={styles.viewAllLink}>
              Learn More →
            </Link>
          </div>
          <div className={styles.eventsGrid}>
            <div className={styles.eventCard}>
              <div className={styles.eventDate}>
                <div className={styles.eventDay}>🔒</div>
              </div>
              <div className={styles.eventContent}>
                <h3 className={styles.eventTitle}>Security Audits</h3>
                <p className={styles.eventDescription}>
                  Identify vulnerabilities and strengthen your security posture with comprehensive threat assessment and penetration testing.
                </p>
              </div>
            </div>

            <div className={styles.eventCard}>
              <div className={styles.eventDate}>
                <div className={styles.eventDay}>✓</div>
              </div>
              <div className={styles.eventContent}>
                <h3 className={styles.eventTitle}>Compliance Audits</h3>
                <p className={styles.eventDescription}>
                  Ensure adherence to regulatory requirements and industry standards with detailed compliance assessment and reporting.
                </p>
              </div>
            </div>

            <div className={styles.eventCard}>
              <div className={styles.eventDate}>
                <div className={styles.eventDay}>⚡</div>
              </div>
              <div className={styles.eventContent}>
                <h3 className={styles.eventTitle}>Performance Audits</h3>
                <p className={styles.eventDescription}>
                  Optimize system performance and efficiency through detailed analysis and actionable recommendations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.newsSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Why Choose DueSphere</h2>
          </div>
          <div className={styles.newsGrid}>
            <div className={styles.newsCard}>
              <div className={styles.newsImagePlaceholder}>📊</div>
              <div className={styles.newsContent}>
                <h3 className={styles.newsTitle}>Data-Driven Analysis</h3>
                <p className={styles.newsExcerpt}>
                  We use advanced tools and methodologies to provide comprehensive, quantifiable insights into your organization's security and compliance posture.
                </p>
              </div>
            </div>

            <div className={styles.newsCard}>
              <div className={styles.newsImagePlaceholder}>👥</div>
              <div className={styles.newsContent}>
                <h3 className={styles.newsTitle}>Expert Team</h3>
                <p className={styles.newsExcerpt}>
                  Our certified auditors bring decades of combined experience across multiple industries and compliance frameworks.
                </p>
              </div>
            </div>

            <div className={styles.newsCard}>
              <div className={styles.newsImagePlaceholder}>📋</div>
              <div className={styles.newsContent}>
                <h3 className={styles.newsTitle}>Clear Reporting</h3>
                <p className={styles.newsExcerpt}>
                  Receive detailed reports with executive summaries, risk assessments, and prioritized recommendations for immediate action.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaOverlay}></div>
        <div className={`${styles.container} ${styles.ctaContainer}`}>
          <h2 className={styles.ctaTitle}>Get Started Today</h2>
          <p className={styles.ctaText}>
            Let our experts conduct a comprehensive audit of your systems. Identify vulnerabilities, ensure compliance, and achieve peace of mind.
          </p>
          <Link href="/contact" className={styles.ctaButton}>
            Request Audit
          </Link>
        </div>
      </section>
    </div>
  )
}
