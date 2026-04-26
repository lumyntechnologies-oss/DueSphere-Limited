"use client"

import type React from "react"
import { useState } from "react"
import styles from "./contact.module.css"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    auditType: "",
    description: "",
  })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus("success")
        setFormData({ companyName: "", contactName: "", email: "", phone: "", auditType: "", description: "" })
      } else {
        setStatus("error")
        setErrorMessage("Failed to send request. Please try again.")
      }
    } catch (error) {
      setStatus("error")
      setErrorMessage("An error occurred. Please try again later.")
    }

    setTimeout(() => setStatus("idle"), 5000)
  }

  return (
    <>

      <div className={styles.contactPage}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Request Your Audit</h1>
            <p className={styles.heroSubtitle}>Let's strengthen your organization together</p>
          </div>
        </section>

        <section className={styles.contactSection}>
          <div className={styles.container}>
            <div className={styles.contactGrid}>
              <div className={styles.contactInfo}>
                <h2 className={styles.infoTitle}>Get Started</h2>
                <p className={styles.infoText}>
                  Fill out the form to request a comprehensive audit. Our experts will review your needs and get back to you within 24 hours to discuss your organization's audit requirements.
                </p>

                <div className={styles.infoCards}>
                  <div className={styles.infoCard}>
                    <div className={styles.infoIcon}>📋</div>
                    <h3 className={styles.infoCardTitle}>Fast Response</h3>
                    <p className={styles.infoCardText}>We respond to audit requests within 24 hours</p>
                  </div>

                  <div className={styles.infoCard}>
                    <div className={styles.infoIcon}>✓</div>
                    <h3 className={styles.infoCardTitle}>Expert Team</h3>
                    <p className={styles.infoCardText}>Certified auditors with deep industry experience</p>
                  </div>

                  <div className={styles.infoCard}>
                    <div className={styles.infoIcon}>🔒</div>
                    <h3 className={styles.infoCardTitle}>Confidential</h3>
                    <p className={styles.infoCardText}>Your information is secure and confidential</p>
                  </div>
                </div>

                <div className={styles.auditTypesSection}>
                  <h3 className={styles.auditTypesTitle}>Audit Types</h3>
                  <ul className={styles.auditTypesList}>
                    <li>Security Audits</li>
                    <li>Compliance Audits</li>
                    <li>Performance Audits</li>
                    <li>Code Quality Audits</li>
                  </ul>
                </div>
              </div>

              <div className={styles.contactForm}>
                <h2 className={styles.formTitle}>Audit Request Form</h2>

                {status === "success" && (
                  <div className={styles.successMessage}>
                    <p>Thank you! We'll review your audit request and contact you shortly.</p>
                  </div>
                )}

                {status === "error" && (
                  <div className={styles.errorMessage}>
                    <p>{errorMessage}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className={styles.formGroup}>
                    <label htmlFor="companyName" className={styles.label}>
                      Company Name *
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      required
                      className={styles.input}
                      placeholder="Your Organization"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="contactName" className={styles.label}>
                      Contact Name *
                    </label>
                    <input
                      type="text"
                      id="contactName"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleChange}
                      required
                      className={styles.input}
                      placeholder="Joshua Mwendwa"
                    />
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="email" className={styles.label}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={styles.input}
                        placeholder="josh@company.com"
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="phone" className={styles.label}>
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={styles.input}
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="auditType" className={styles.label}>
                      Audit Type *
                    </label>
                    <select
                      id="auditType"
                      name="auditType"
                      value={formData.auditType}
                      onChange={handleChange}
                      required
                      className={styles.select}
                    >
                      <option value="">Select an audit type</option>
                      <option value="security">Security Audit</option>
                      <option value="compliance">Compliance Audit</option>
                      <option value="performance">Performance Audit</option>
                      <option value="code-quality">Code Quality Audit</option>
                      <option value="other">Other / Not Sure</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="description" className={styles.label}>
                      Tell us about your needs *
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      className={styles.textarea}
                      rows={6}
                      placeholder="Describe what you'd like us to audit, any specific concerns, or compliance requirements..."
                    />
                  </div>

                  <button type="submit" className={styles.submitBtn} disabled={status === "loading"}>
                    {status === "loading" ? "Submitting..." : "Request Audit"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
