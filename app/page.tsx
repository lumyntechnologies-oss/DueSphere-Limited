"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import styles from "./page.module.css"

interface NewsItem {
  id: string
  title: string
  content: string
  excerpt: string
  image: string
  author: string
  createdAt: string
  category: string
}

interface Service {
  id: string
  title: string
  description: string
  icon: string
  isActive: boolean
}

const certifications = [
  { name: "ISO 27001", icon: "🛡️" },
  { name: "SOC 2 Type II", icon: "✓" },
  { name: "GDPR Compliant", icon: "🔒" },
  { name: "HIPAA Certified", icon: "🏥" },
  { name: "NIST Aligned", icon: "📊" },
  { name: "PCI DSS", icon: "💳" },
  { name: "CISA Registered", icon: "📋" },
  { name: "ISO 9001", icon: "⭐" },
]

export default function HomePage() {
  const [latestNews, setLatestNews] = useState<NewsItem[]>([])
  const [newsLoading, setNewsLoading] = useState(true)
  const [services, setServices] = useState<Service[]>([])
  const [servicesLoading, setServicesLoading] = useState(true)

   useEffect(() => {
     async function fetchLatestNews() {
       try {
         const res = await fetch("/api/news")
         const data = await res.json()
         setLatestNews(data.slice(0, 3))
       } catch (error) {
         console.error("Failed to fetch news:", error)
       } finally {
         setNewsLoading(false)
       }
     }

     fetchLatestNews()
   }, [])

   useEffect(() => {
     async function fetchServices() {
       try {
         const res = await fetch("/api/services")
         const data = await res.json()
         if (Array.isArray(data)) {
           setServices(data.filter((s: Service) => s.isActive))
         }
       } catch (error) {
         console.error("Failed to fetch services:", error)
       } finally {
         setServicesLoading(false)
       }
     }

     fetchServices()
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
          <p className={styles.heroSubtitle}>Watchlist Screening, Sanctions & Compliance Services</p>
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

      {/* Trust Badges Marquee */}
      <section className={styles.trustBar}>
        <div className={styles.trustHeader}>
          <span className={styles.trustLabel}>Trusted Compliance & Certifications</span>
        </div>
        <div className={styles.marqueeWrapper}>
          <div className={styles.marqueeTrack}>
            {[...certifications, ...certifications, ...certifications].map((cert, i) => (
              <div key={i} className={styles.marqueeItem}>
                <span className={styles.marqueeIcon}>{cert.icon}</span>
                <span className={styles.marqueeName}>{cert.name}</span>
              </div>
            ))}
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
              Comprehensive audit solutions for every aspect of your organization's security and compliance needs.
            </p>
          </div>
          {servicesLoading ? (
            <div className={styles.loadingGrid}>
              <div className={styles.loadingCard}></div>
              <div className={styles.loadingCard}></div>
              <div className={styles.loadingCard}></div>
            </div>
          ) : services.length === 0 ? (
            <p style={{ textAlign: "center", color: "#64748b", padding: "40px 0" }}>No services available.</p>
          ) : (
            <div className={styles.servicesGrid}>
              {services.map((service) => (
                <div key={service.id} className={styles.serviceCard}>
                  <div className={styles.serviceIconWrapper}>
                    <span className={styles.serviceIcon}>{service.icon}</span>
                  </div>
                  <h3 className={styles.serviceTitle}>{service.title}</h3>
                  <p className={styles.serviceDescription}>{service.description}</p>
                  <Link href="/services" className={styles.serviceLink}>
                    Learn More →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Due Diligence Section */}
      <section className={styles.servicesSection} style={{ backgroundColor: '#f8fafc' }}>
        <div className={styles.container}>
          <div className={styles.sectionHeaderCenter}>
            <span className={styles.sectionTag}>Due Diligence</span>
            <h2 className={styles.sectionTitle}>Background Checks & Organization Verification</h2>
            <p className={styles.sectionSubtitle}>
              Thorough investigations for mergers, acquisitions, new hires, and vendor partnerships. Verify corporate standing and mitigate risk.
            </p>
          </div>
          <div className={styles.dueGrid}>
            <div className={styles.dueCard}>
              <div className={styles.dueIcon}>🏢</div>
              <h3 className={styles.dueTitle}>Organization Due Diligence</h3>
              <p className={styles.dueDescription}>
               Verify legal standing, ownership, and compliance for mergers, acquisitions, or partnerships. Includes KRA, Business Permit, CR12 verification.
              </p>
              <Link href="/contact?type=dd-org" className={styles.dueLink}>Request Organization DD →</Link>
            </div>
            <div className={styles.dueCard}>
              <div className={styles.dueIcon}>👤</div>
              <h3 className={styles.dueTitle}>New Hire Background Checks</h3>
              <p className={styles.dueDescription}>
                Pre-employment screening for executives and key personnel. Identity, education, employment history, sanctions & PEP screening.
              </p>
              <Link href="/contact?type=dd-hire" className={styles.dueLink}>Request Background Check →</Link>
            </div>
            <div className={styles.dueCard}>
              <div className={styles.dueIcon}>🔗</div>
              <h3 className={styles.dueTitle}>Vendor & Third-Party DD</h3>
              <p className={styles.dueDescription}>
                Assess vendor risk, financial stability, compliance posture, and supply chain integrity before engagement.
              </p>
              <Link href="/contact?type=dd-vendor" className={styles.dueLink}>Request Vendor DD →</Link>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '32px' }}>
              <Link href="/due-diligence" className={styles.dueLink}>Explore Due Diligence Services →</Link>
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

      {/* Latest News Section */}
      <section className={styles.newsSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeaderCenter}>
            <span className={styles.sectionTag}>Stay Informed</span>
            <h2 className={styles.sectionTitle}>Latest Service Updates</h2>
            <p className={styles.sectionSubtitle}>
              Get the latest news about our audit services, compliance insights, and industry updates.
            </p>
          </div>

          {newsLoading ? (
            <div className={styles.loadingGrid}>
              <div className={styles.loadingCard}></div>
              <div className={styles.loadingCard}></div>
              <div className={styles.loadingCard}></div>
            </div>
          ) : (
            <div className={styles.newsGrid}>
              {latestNews.map((item) => (
                <article key={item.id} className={styles.newsCard}>
                  <div className={styles.newsImageWrapper}>
                    <Image
                      src={item.image || "/placeholder.svg?height=200&width=300&query=news"}
                      alt={item.title}
                      fill
                      className={styles.newsImage}
                    />
                    <span className={styles.newsCategory}>{item.category}</span>
                  </div>
                  <div className={styles.newsContent}>
                    <div className={styles.newsMeta}>
                      <span className={styles.newsDate}>{new Date(item.createdAt).toLocaleDateString()}</span>
                    </div>
                    <h3 className={styles.newsTitle}>{item.title}</h3>
                    <p className={styles.newsExcerpt}>{item.excerpt}</p>
                    <Link href={`/news/${item.id}`} className={styles.newsLink}>
                      Read More →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

          <div className={styles.sectionFooter}>
            <Link href="/news" className={styles.viewAllLink}>
              View All Updates →
            </Link>
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

