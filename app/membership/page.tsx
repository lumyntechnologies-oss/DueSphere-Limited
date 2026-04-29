"use client"

import type React from "react"

import { useState } from "react"
import Head from "next/head"
import Link from "next/link"
import styles from "./membership.module.css"

export default function MembershipPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    serviceInterest: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setErrorMessage("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyName: formData.company,
          contactName: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          phone: formData.phone || undefined,
          auditType: formData.serviceInterest,
          description: formData.message || `Client onboarding inquiry from ${formData.firstName} ${formData.lastName}`,
        }),
      })

      if (response.ok) {
        setStatus("success")
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          company: "",
          serviceInterest: "",
          message: "",
        })
      } else {
        setStatus("error")
        setErrorMessage("Failed to submit. Please try again.")
      }
    } catch (error) {
      setStatus("error")
      setErrorMessage("An error occurred. Please try again later.")
    }
  }

  return (
    <>
      <Head>
        <title>Get Started with DueSphere | Join Our Client Community</title>
        <meta
          name="description"
          content="Become a DueSphere client. Get access to professional audit and due diligence services tailored to your organization's needs."
        />
        <meta name="keywords" content="DueSphere, client onboarding, audit services, due diligence, enterprise services" />
        <meta property="og:title" content="Get Started with DueSphere | Join Our Client Community" />
        <meta
          property="og:description"
          content="Become a DueSphere client. Get access to professional audit and due diligence services tailored to your organization's needs."
        />
        <meta property="og:url" content="https://due-sphere-limited.vercel.app/membership" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Get Started with DueSphere | Join Our Client Community" />
        <meta
          name="twitter:description"
          content="Become a DueSphere client. Get access to professional audit and due diligence services tailored to your organization's needs."
        />
        <link rel="canonical" href="https://due-sphere-limited.vercel.app/membership" />
      </Head>
      <div className={styles.membershipPage}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroPattern}></div>
          <div className={styles.heroContent}>
            <div className={styles.badge}>CLIENT ONBOARDING</div>
            <h1 className={styles.heroTitle}>Partner with DueSphere</h1>
            <p className={styles.heroSubtitle}>
              Join hundreds of organizations that trust DueSphere for their audit and due diligence needs
            </p>
          </div>
        </section>

        {/* Value Proposition */}
        <section className={styles.benefitsSection}>
          <div className={styles.container}>
            <div className={styles.benefitsIntro}>
              <h2 className={styles.sectionTitle}>Why Choose DueSphere?</h2>
              <p className={styles.sectionSubtitle}>
                Trusted by leading organizations across East Africa for comprehensive audits and due diligence
              </p>
            </div>
            <div className={styles.benefitsGrid}>
              <div className={styles.benefitCard}>
                <div className={styles.benefitNumber}>01</div>
                <h3 className={styles.benefitTitle}>Expert Auditors</h3>
                <p className={styles.benefitText}>
                  Certified professionals with deep expertise in security, compliance, and due diligence.
                </p>
              </div>
              <div className={styles.benefitCard}>
                <div className={styles.benefitNumber}>02</div>
                <h3 className={styles.benefitTitle}>Fast Turnaround</h3>
                <p className={styles.benefitText}>
                  Streamlined processes deliver quality results within agreed timelines, minimizing disruption.
                </p>
              </div>
              <div className={styles.benefitCard}>
                <div className={styles.benefitNumber}>03</div>
                <h3 className={styles.benefitTitle}>Actionable Reports</h3>
                <p className={styles.benefitText}>
                  Clear, prioritized recommendations you can implement immediately to improve your posture.
                </p>
              </div>
              <div className={styles.benefitCard}>
                <div className={styles.benefitNumber}>04</div>
                <h3 className={styles.benefitTitle}>End-to-End Support</h3>
                <p className={styles.benefitText}>
                  From initial scoping to report delivery and beyond — we're with you every step of the way.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Onboarding Form */}
        <section className={styles.formSection}>
          <div className={styles.container}>
            <div className={styles.formHeader}>
              <h2 className={styles.formTitle}>Start Your Engagement</h2>
              <p className={styles.formSubtitle}>
                Fill out the form below and our team will contact you within 24 hours
              </p>
            </div>

            {status === "success" && (
              <div className={styles.successMessage}>
                <div className={styles.successIcon}>✓</div>
                <h3>Thank You!</h3>
                <p>Your inquiry has been received. Our team will contact you shortly to discuss your audit or due diligence needs.</p>
              </div>
            )}

            {status === "error" && (
              <div className={styles.errorMessage}>
                <p>{errorMessage}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className={styles.form}>
              {/* Personal Information Card */}
              <div className={styles.formCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardIcon}>👤</div>
                  <h3 className={styles.cardTitle}>Contact Information</h3>
                </div>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="firstName" className={styles.label}>
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className={styles.input}
                      placeholder="John"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="lastName" className={styles.label}>
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className={styles.input}
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>
                      Work Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={styles.input}
                      placeholder="john.doe@company.com"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="phone" className={styles.label}>
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className={styles.input}
                      placeholder="+254 700 000 000"
                    />
                  </div>
                </div>
              </div>

              {/* Organization Card */}
              <div className={styles.formCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardIcon}>🏢</div>
                  <h3 className={styles.cardTitle}>Organization Details</h3>
                </div>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="company" className={styles.label}>
                      Company/Organization Name *
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      required
                      className={styles.input}
                      placeholder="Acme Corporation"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="serviceInterest" className={styles.label}>
                      Service Interest *
                    </label>
                    <select
                      id="serviceInterest"
                      name="serviceInterest"
                      value={formData.serviceInterest}
                      onChange={handleChange}
                      required
                      className={styles.select}
                    >
                      <option value="">Select a service</option>
                      <option value="security-audit">Security Audit</option>
                      <option value="compliance-audit">Compliance Audit (SOC 2, GDPR, etc.)</option>
                      <option value="performance-audit">Performance Audit</option>
                      <option value="code-quality-audit">Code Quality Audit</option>
                      <option value="organization-dd">Organization Due Diligence</option>
                      <option value="new-hire-dd">New Hire Background Check</option>
                      <option value="vendor-dd">Vendor Due Diligence</option>
                      <option value="other">Other / Not Sure</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Message Card */}
              <div className={styles.formCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardIcon}>💬</div>
                  <h3 className={styles.cardTitle}>Tell Us About Your Needs</h3>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.label}>
                    Project Details & Requirements
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={styles.textarea}
                    rows={5}
                    placeholder="Describe your audit or due diligence needs, timeline, and any specific concerns..."
                  />
                </div>
              </div>

              <button type="submit" className={styles.submitBtn} disabled={status === "loading"}>
                {status === "loading" ? (
                  <>
                    <span className={styles.spinner}></span>
                    Submitting...
                  </>
                ) : (
                  "Request a Consultation →"
                )}
              </button>

              <p className={styles.disclaimer}>
                By submitting this form, you agree to receive communications from DueSphere about your inquiry.
                We respect your privacy and will never share your information.
              </p>
            </form>
          </div>
        </section>
    </>
  )
}
