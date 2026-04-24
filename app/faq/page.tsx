"use client"

import { useEffect, useRef, useState } from "react"
import Head from "next/head"
import styles from "./faq.module.css"
import type { JSX } from "react/jsx-runtime"

interface Section {
  id: string
  title: string
  content: JSX.Element
}

export default function FAQPage() {
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
      id: "about-duessphere",
      title: "About DueSphere",
      content: (
        <>
          <details className={styles.faqItem}>
            <summary className={styles.faqQuestion}>What is DueSphere?</summary>
            <p className={styles.faqAnswer}>
              DueSphere is an enterprise-grade audit and compliance platform that provides comprehensive security, compliance, performance, and code quality assessments. We help organizations identify risks, ensure regulatory adherence, and achieve operational excellence through professional audits delivered by certified experts.
            </p>
          </details>
          <details className={styles.faqItem}>
            <summary className={styles.faqQuestion}>What types of audits does DueSphere offer?</summary>
            <p className={styles.faqAnswer}>
              We offer four primary audit services: Security Audits (identifying vulnerabilities and threats), Compliance Audits (ensuring regulatory adherence), Performance Audits (optimizing efficiency), and Code Quality Audits (assessing software quality and security). Each audit is customized to your organization's specific needs.
            </p>
          </details>
          <details className={styles.faqItem}>
            <summary className={styles.faqQuestion}>Who should use DueSphere?</summary>
            <p className={styles.faqAnswer}>
              Any organization concerned with security, compliance, and operational excellence can benefit from DueSphere. This includes small businesses, mid-market companies, enterprises, government agencies, and regulated industries like healthcare, finance, and technology.
            </p>
          </details>
        </>
      ),
    },
    {
      id: "audits",
      title: "Audit Services",
      content: (
        <>
          <details className={styles.faqItem}>
            <summary className={styles.faqQuestion}>How long does an audit typically take?</summary>
            <p className={styles.faqAnswer}>
              Audit duration varies based on scope and complexity. Security audits typically take 2-6 weeks, compliance audits 3-8 weeks, performance audits 2-4 weeks, and code quality audits 1-3 weeks. We'll provide a detailed timeline during the initial consultation.
            </p>
          </details>
          <details className={styles.faqItem}>
            <summary className={styles.faqQuestion}>What's included in an audit report?</summary>
            <p className={styles.faqAnswer}>
              Each report includes an executive summary, detailed findings with severity ratings, risk assessments, evidence documentation, and prioritized recommendations. Reports are tailored to be understandable for both technical and non-technical stakeholders.
            </p>
          </details>
          <details className={styles.faqItem}>
            <summary className={styles.faqQuestion}>Can I customize an audit scope?</summary>
            <p className={styles.faqAnswer}>
              Absolutely. We work with you during the consultation phase to define exactly what needs to be audited. Whether you need a full system audit or focused assessment of specific areas, we can tailor the engagement to your requirements and budget.
            </p>
          </details>
          <details className={styles.faqItem}>
            <summary className={styles.faqQuestion}>Do you provide follow-up support after the audit?</summary>
            <p className={styles.faqAnswer}>
              Yes. After delivering your report, our team is available to discuss findings, answer questions, and provide guidance on implementing recommendations. We can also schedule follow-up assessments to verify remediation efforts.
            </p>
          </details>
        </>
      ),
    },
    {
      id: "process",
      title: "Our Process",
      content: (
        <>
          <details className={styles.faqItem}>
            <summary className={styles.faqQuestion}>How do I request an audit?</summary>
            <p className={styles.faqAnswer}>
              Simply visit our "Request an Audit" page and fill out the form with your organization's information and audit requirements. One of our experts will contact you within 24 hours to discuss your needs in detail.
            </p>
          </details>
          <details className={styles.faqItem}>
            <summary className={styles.faqQuestion}>What happens during the initial consultation?</summary>
            <p className={styles.faqAnswer}>
              During the consultation, we'll discuss your organization's background, specific concerns, compliance requirements, systems involved, and desired outcomes. This helps us develop a customized audit plan and provide an accurate estimate.
            </p>
          </details>
          <details className={styles.faqItem}>
            <summary className={styles.faqQuestion}>How much do audits cost?</summary>
            <p className={styles.faqAnswer}>
              Pricing depends on audit type, scope, complexity, and your organization's size. We provide transparent estimates after the consultation. We offer flexible engagement options to fit various budgets, from focused assessments to comprehensive evaluations.
            </p>
          </details>
          <details className={styles.faqItem}>
            <summary className={styles.faqQuestion}>What's your audit methodology?</summary>
            <p className={styles.faqAnswer}>
              We use industry-standard audit frameworks combined with our proprietary methodologies. Our approach includes documentation review, system testing, security testing (where applicable), interviews with stakeholders, and comprehensive analysis before delivering findings and recommendations.
            </p>
          </details>
        </>
      ),
    },
    {
      id: "confidentiality",
      title: "Confidentiality & Security",
      content: (
        <>
          <details className={styles.faqItem}>
            <summary className={styles.faqQuestion}>Is my audit information confidential?</summary>
            <p className={styles.faqAnswer}>
              Yes. All audit information is strictly confidential and protected under non-disclosure agreements. Only your designated contacts and relevant team members see audit findings. We never share client information with third parties without explicit permission.
            </p>
          </details>
          <details className={styles.faqItem}>
            <summary className={styles.faqQuestion}>How do you protect client data during audits?</summary>
            <p className={styles.faqAnswer}>
              We follow strict data protection protocols including encrypted communication, secure data handling, limited access to sensitive information, and secure destruction of data after the audit. Our auditors sign confidentiality agreements and comply with all relevant privacy regulations.
            </p>
          </details>
          <details className={styles.faqItem}>
            <summary className={styles.faqQuestion}>Can audits be done remotely?</summary>
            <p className={styles.faqAnswer}>
              Yes. Many of our audits can be conducted remotely via secure connections, video calls, and secure file sharing. For audits requiring on-site assessment, we can arrange visits based on your security requirements and comfort level.
            </p>
          </details>
        </>
      ),
    },
    {
      id: "dashboard",
      title: "Client Dashboard",
      content: (
        <>
          <details className={styles.faqItem}>
            <summary className={styles.faqQuestion}>Do I get a dashboard to track my audit?</summary>
            <p className={styles.faqAnswer}>
              Yes. Our secure client portal gives you real-time visibility into your audit status, allows you to upload documents, schedule meetings with auditors, and access completed reports. You can log in anytime to check progress.
            </p>
          </details>
          <details className={styles.faqItem}>
            <summary className={styles.faqQuestion}>How do I access my audit reports?</summary>
            <p className={styles.faqAnswer}>
              Audit reports are delivered through our secure client dashboard and also sent via email. You can download, share with your team, and store reports securely. All access is logged and tracked for audit trail purposes.
            </p>
          </details>
          <details className={styles.faqItem}>
            <summary className={styles.faqQuestion}>Can multiple team members access the dashboard?</summary>
            <p className={styles.faqAnswer}>
              Absolutely. You can invite multiple team members to your account with different permission levels. Executive leadership, IT teams, compliance officers, and other stakeholders can all have secure access to relevant audit information.
            </p>
          </details>
        </>
      ),
    },
  ]

  return (
    <>
      <Head>
        <title>FAQ | DueSphere - Audit & Compliance Services</title>
        <meta name="description" content="Frequently asked questions about DueSphere audit services, pricing, process, and confidentiality." />
        <meta name="keywords" content="FAQ, audit questions, compliance, DueSphere" />
      </Head>

      <div className={styles.faqPage}>
        <section className={styles.hero}>
          <div className={styles.container}>
            <h1 className={styles.heroTitle}>Frequently Asked Questions</h1>
            <p className={styles.heroSubtitle}>Find answers to common questions about our audit services</p>
          </div>
        </section>

        <section className={styles.faqContent}>
          <div className={styles.container}>
            {sections.map((section) => (
              <div
                key={section.id}
                ref={(el) => {
                  if (el) sectionRefs.current[section.id] = el
                }}
                id={section.id}
                className={`${styles.faqSection} ${visibleSections.has(section.id) ? styles.visible : ""}`}
              >
                <h2 className={styles.sectionTitle}>{section.title}</h2>
                {section.content}
              </div>
            ))}
          </div>
        </section>

        <section className={styles.ctaSection}>
          <div className={styles.container}>
            <h2>Still have questions?</h2>
            <p>Contact our team for more information or to request a consultation.</p>
            <a href="/contact" className={styles.ctaButton}>
              Get in Touch
            </a>
          </div>
        </section>
      </div>
    </>
  )
}
