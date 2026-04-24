"use client"

import { useEffect, useRef, useState } from "react"
import Head from "next/head"
import styles from "./privacy.module.css"
import type { JSX } from "react/jsx-runtime"

interface Section {
  id: string
  title: string
  content: JSX.Element
}

export default function PrivacyPage() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id))
          }
        })
      },
      { threshold: 0.1 },
    )

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  const sections: Section[] = [
    {
      id: "introduction",
      title: "Introduction",
      content: (
        <p className={styles.text}>
          DueSphere ("we," "us," "our," or "Company") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our audit services platform, including our website and client portal. Please read this privacy policy carefully. If you do not agree with our policies and practices, please do not use our services.
        </p>
      ),
    },
    {
      id: "information-collect",
      title: "Information We Collect",
      content: (
        <div className={styles.section}>
          <p className={styles.text}>
            We collect information in various ways, including:
          </p>
          <ul className={styles.list}>
            <li><strong>Information You Provide:</strong> Contact information, company details, audit preferences, and communication records when you request audits or contact us.</li>
            <li><strong>Audit Information:</strong> Data and systems information you provide during audits, which is treated with strict confidentiality.</li>
            <li><strong>Account Information:</strong> Login credentials, preferences, and profile information for your client dashboard.</li>
            <li><strong>Website Information:</strong> IP address, browser type, pages visited, and duration of visits through cookies and analytics.</li>
            <li><strong>Payment Information:</strong> Billing details processed securely through our payment processors.</li>
          </ul>
        </div>
      ),
    },
    {
      id: "use-information",
      title: "How We Use Your Information",
      content: (
        <div className={styles.section}>
          <p className={styles.text}>
            We use collected information to:
          </p>
          <ul className={styles.list}>
            <li>Conduct audits and provide services as requested</li>
            <li>Communicate with you about audit status, findings, and recommendations</li>
            <li>Process payments and billing</li>
            <li>Improve our services and website functionality</li>
            <li>Comply with legal obligations and regulations</li>
            <li>Protect against fraud and security threats</li>
            <li>Respond to inquiries and customer support requests</li>
          </ul>
        </div>
      ),
    },
    {
      id: "data-protection",
      title: "Data Protection & Security",
      content: (
        <div className={styles.section}>
          <p className={styles.text}>
            We implement comprehensive security measures to protect your information:
          </p>
          <ul className={styles.list}>
            <li>Encryption of data in transit (TLS/SSL) and at rest</li>
            <li>Secure authentication and access controls</li>
            <li>Regular security audits and vulnerability assessments</li>
            <li>Strict access policies limiting employee access to audit data</li>
            <li>Non-disclosure agreements with all team members</li>
            <li>Secure data destruction protocols after audit completion</li>
            <li>Compliance with GDPR, CCPA, and industry-standard security frameworks</li>
          </ul>
          <p className={styles.text}>
            However, no method of transmission over the Internet is 100% secure. While we use industry-standard protections, we cannot guarantee absolute security.
          </p>
        </div>
      ),
    },
    {
      id: "data-sharing",
      title: "Data Sharing & Disclosure",
      content: (
        <div className={styles.section}>
          <p className={styles.text}>
            We do not sell, trade, or rent your information. We may share information only in these circumstances:
          </p>
          <ul className={styles.list}>
            <li>With your explicit consent or request</li>
            <li>With our trusted service providers who assist in delivering services (all bound by confidentiality)</li>
            <li>When required by law or legal process</li>
            <li>To protect against fraud, security, or legal issues</li>
            <li>In case of merger, acquisition, or business transfer (with notice)</li>
          </ul>
        </div>
      ),
    },
    {
      id: "your-rights",
      title: "Your Rights & Choices",
      content: (
        <div className={styles.section}>
          <p className={styles.text}>
            You have the right to:
          </p>
          <ul className={styles.list}>
            <li>Access your personal information and request copies</li>
            <li>Correct inaccurate or incomplete information</li>
            <li>Request deletion of your information (subject to legal requirements)</li>
            <li>Opt-out of marketing communications</li>
            <li>Request a portable copy of your data</li>
            <li>Withdraw consent for data processing</li>
          </ul>
          <p className={styles.text}>
            To exercise these rights, contact us at privacy@duessphere.com with your request and verification of identity.
          </p>
        </div>
      ),
    },
    {
      id: "retention",
      title: "Data Retention",
      content: (
        <p className={styles.text}>
          We retain personal information for as long as necessary to provide services, comply with legal obligations, and resolve disputes. Audit data is retained according to your industry&apos;s requirements and your preferences. You can request deletion of your account and associated data at any time, subject to legal retention requirements.
        </p>
      ),
    },
    {
      id: "contact",
      title: "Contact Us",
      content: (
        <div className={styles.section}>
          <p className={styles.text}>
            If you have questions about this Privacy Policy or our privacy practices, contact us:
          </p>
          <div className={styles.contactInfo}>
            <p><strong>Email:</strong> privacy@duessphere.com</p>
            <p><strong>Website:</strong> www.duessphere.com/contact</p>
            <p><strong>Address:</strong> DueSphere, Inc. | [Your Address]</p>
          </div>
          <p className={styles.text}>
            We will respond to privacy inquiries within 30 days.
          </p>
        </div>
      ),
    },
  ]

  return (
    <>
      <Head>
        <title>Privacy Policy | DueSphere</title>
        <meta name="description" content="DueSphere Privacy Policy - Learn how we protect and handle your data." />
      </Head>

      <div className={styles.privacyPage}>
        <section className={styles.hero}>
          <div className={styles.container}>
            <h1 className={styles.heroTitle}>Privacy Policy</h1>
            <p className={styles.heroSubtitle}>Your data privacy and security is our priority</p>
            <p className={styles.lastUpdated}>Last Updated: April 2026</p>
          </div>
        </section>

        <section className={styles.policyContent}>
          <div className={styles.container}>
            {sections.map((section) => (
              <div
                key={section.id}
                ref={(el) => {
                  if (el) sectionRefs.current[section.id] = el
                }}
                id={section.id}
                className={`${styles.policySection} ${visibleSections.has(section.id) ? styles.visible : ""}`}
              >
                <h2 className={styles.sectionTitle}>{section.title}</h2>
                {section.content}
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
