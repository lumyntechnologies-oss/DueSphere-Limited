"use client"

import { useEffect, useRef, useState } from "react"
import Head from "next/head"
import styles from "./terms.module.css"
import type { JSX } from "react/jsx-runtime"

interface Section {
  id: string
  title: string
  content: JSX.Element
}

export default function TermsPage() {
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
      id: "acceptance",
      title: "1. Acceptance of Terms",
      content: (
        <p className={styles.text}>
          By accessing and using DueSphere&apos;s website, services, and client portal, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services. These terms apply to all users including clients, audit participants, and website visitors.
        </p>
      ),
    },
    {
      id: "audit-services",
      title: "2. Audit Services",
      content: (
        <>
          <h3 className={styles.subheading}>2.1 Scope and Limitations</h3>
          <p className={styles.text}>
            Audits are conducted according to the agreed-upon scope. DueSphere makes no guarantee to identify all issues or vulnerabilities. Audits are point-in-time assessments and do not guarantee future security or compliance.
          </p>

          <h3 className={styles.subheading}>2.2 Client Obligations</h3>
          <p className={styles.text}>Clients agree to:</p>
          <ul className={styles.list}>
            <li>Provide accurate information about systems and environments to be audited</li>
            <li>Grant necessary access to systems, networks, and personnel as required</li>
            <li>Maintain confidentiality of audit processes and findings</li>
            <li>Pay agreed-upon fees by the specified due date</li>
            <li>Notify DueSphere of any changes to scope or environment during the audit</li>
          </ul>

          <h3 className={styles.subheading}>2.3 Audit Process</h3>
          <p className={styles.text}>
            The audit process includes consultation, assessment, analysis, and reporting. DueSphere will work with you to define specific audit parameters, timeline, and deliverables during the initial consultation.
          </p>
        </>
      ),
    },
    {
      id: "confidentiality",
      title: "3. Confidentiality",
      content: (
        <>
          <h3 className={styles.subheading}>3.1 Protection of Information</h3>
          <p className={styles.text}>
            DueSphere commits to maintaining strict confidentiality of all audit findings, client data, and communications. Audit reports are proprietary to the client and may not be publicly distributed without written consent.
          </p>

          <h3 className={styles.subheading}>3.2 Use of Findings</h3>
          <p className={styles.text}>
            Audit findings are provided for your internal use only. You may not publish, share, or distribute audit reports outside your organization without DueSphere&apos;s written permission, except as required by law or regulation.
          </p>

          <h3 className={styles.subheading}>3.3 Data Protection</h3>
          <p className={styles.text}>
            DueSphere implements industry-standard security measures to protect your information. All audit data is encrypted, securely stored, and destroyed according to agreed-upon retention policies. See our Privacy Policy for details.
          </p>
        </>
      ),
    },
    {
      id: "payments",
      title: "4. Payments and Billing",
      content: (
        <>
          <h3 className={styles.subheading}>4.1 Payment Terms</h3>
          <p className={styles.text}>
            Payment for audit services is due according to the agreed-upon terms in your audit proposal. Invoices will be issued upon commencement of the audit. Late payments may result in suspension of services.
          </p>

          <h3 className={styles.subheading}>4.2 Refunds</h3>
          <p className={styles.text}>
            Refunds are not available for completed audit work. If an audit is cancelled before completion by the client, charges will be assessed for work already completed. Refund requests must be made in writing within 30 days of service completion.
          </p>

          <h3 className={styles.subheading}>4.3 Additional Costs</h3>
          <p className={styles.text}>
            If audit scope expands or additional work is required beyond the original agreement, DueSphere will notify you and provide a separate estimate for approval before proceeding.
          </p>
        </>
      ),
    },
    {
      id: "liability",
      title: "5. Limitations of Liability",
      content: (
        <>
          <p className={styles.text}>
            DueSphere audit services are provided &quot;as is&quot; based on industry-standard assessment methodologies. While we strive for accuracy, DueSphere makes no warranty that audit findings will be complete, error-free, or identify all vulnerabilities or compliance issues.
          </p>

          <p className={styles.text}>
            To the fullest extent permitted by law, DueSphere and its personnel shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from the use or inability to use our services, even if advised of the possibility of such damages.
          </p>

          <p className={styles.text}>
            DueSphere&apos;s liability for direct damages shall not exceed the total amount paid for the specific audit that gave rise to the claim.
          </p>
        </>
      ),
    },
    {
      id: "disclaimer",
      title: "6. Disclaimer of Warranties",
      content: (
        <p className={styles.text}>
          DueSphere&apos;s website, portal, and services are provided &quot;as is&quot; without warranties of any kind, express or implied. We do not warrant that our services will be uninterrupted, secure, or error-free. DueSphere specifically disclaims warranties of merchantability, fitness for a particular purpose, and non-infringement of intellectual property rights.
        </p>
      ),
    },
    {
      id: "acceptable-use",
      title: "7. Acceptable Use",
      content: (
        <>
          <h3 className={styles.subheading}>7.1 Prohibited Conduct</h3>
          <p className={styles.text}>You agree not to:</p>
          <ul className={styles.list}>
            <li>Use the website or services for any unlawful purpose</li>
            <li>Attempt unauthorized access to systems, networks, or accounts</li>
            <li>Interfere with or disrupt the functionality of our website or services</li>
            <li>Upload malicious code, viruses, or harmful content</li>
            <li>Harass, threaten, or intimidate DueSphere personnel</li>
            <li>Reverse engineer, disassemble, or attempt to derive source code</li>
          </ul>

          <h3 className={styles.subheading}>7.2 Intellectual Property</h3>
          <p className={styles.text}>
            All content on DueSphere&apos;s website, including text, graphics, logos, and software, is the property of DueSphere or its licensors. You may not reproduce, distribute, or create derivative works without written permission.
          </p>
        </>
      ),
    },
    {
      id: "termination",
      title: "8. Termination",
      content: (
        <>
          <p className={styles.text}>
            DueSphere reserves the right to terminate or suspend your access to our services at any time for violations of these terms, illegal activity, or non-payment of fees.
          </p>

          <p className={styles.text}>
            Upon termination, your right to access the website and services ceases immediately. Outstanding payments remain due. DueSphere will return or securely destroy audit data according to agreed-upon protocols.
          </p>
        </>
      ),
    },
    {
      id: "governing-law",
      title: "9. Governing Law",
      content: (
        <p className={styles.text}>
          These Terms and Conditions are governed by and construed in accordance with applicable laws. Any disputes arising under or relating to these terms shall be resolved through arbitration or litigation as permitted by law, with jurisdiction in the courts of the applicable jurisdiction.
        </p>
      ),
    },
    {
      id: "changes",
      title: "10. Changes to Terms",
      content: (
        <p className={styles.text}>
          DueSphere may revise these Terms and Conditions at any time. Changes will be effective upon posting to the website. Your continued use of our services constitutes acceptance of revised terms. We will notify you of material changes via email.
        </p>
      ),
    },
  ]

  return (
    <>
      <Head>
        <title>Terms & Conditions | DueSphere</title>
        <meta
          name="description"
          content="Read DueSphere&apos;s Terms and Conditions for audit services, confidentiality, and service agreements."
        />
        <meta name="keywords" content="terms, conditions, audit services, confidentiality, DueSphere" />
        <meta property="og:title" content="Terms & Conditions | DueSphere" />
        <meta
          property="og:description"
          content="DueSphere Terms and Conditions for audit services and confidentiality."
        />
        <meta property="og:url" content="https://duessphere.vercel.app/terms" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Terms & Conditions | DueSphere" />
        <link rel="canonical" href="https://duessphere.vercel.app/terms" />
      </Head>
      <div className={styles.termsPage}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Terms & Conditions</h1>
            <p className={styles.heroSubtitle}>Please read these terms carefully before using our services</p>
            <p className={styles.lastUpdated}>Last Updated: April 2026</p>
          </div>
        </section>

        <section className={styles.contentSection}>
          <div className={styles.container}>
            {sections.map((section, index) => (
              <section
                key={section.id}
                id={section.id}
                ref={(el) => {
                  sectionRefs.current[section.id] = el
                }}
                className={`${styles.sectionCard} ${visibleSections.has(section.id) ? styles.visible : ""}`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <h2 className={styles.sectionTitle}>{section.title}</h2>
                <div className={styles.sectionContent}>{section.content}</div>
              </section>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
