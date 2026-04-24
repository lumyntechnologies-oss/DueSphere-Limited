"use client"

import type React from "react"

import { useState } from "react"
import Head from "next/head"
import styles from "./newsletter.module.css"

export default function NewsletterPage() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setStatus("success")
        setMessage("Thank you for subscribing! You'll receive our latest updates.")
        setEmail("")
      } else {
        const data = await response.json()
        setStatus("error")
        setMessage(data.error || "Failed to subscribe. Please try again.")
      }
    } catch (error) {
      setStatus("error")
      setMessage("An error occurred. Please try again later.")
    }
  }

  return (
    <>
      <Head>
        <title>Industry Insights | DueSphere Audit Insights Newsletter</title>
        <meta
          name="description"
          content="Subscribe to DueSphere Insights for industry trends, audit best practices, compliance updates, and security insights delivered to your inbox."
        />
        <meta name="keywords" content="DueSphere, audit insights, security newsletter, compliance updates, industry trends" />
        <meta property="og:title" content="DueSphere Insights Newsletter" />
        <meta
          property="og:description"
          content="Subscribe to DueSphere Insights for industry trends, audit best practices, compliance updates, and security insights."
        />
        <meta property="og:url" content="https://due-sphere-limited.vercel.app/newsletter" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="DueSphere Insights Newsletter" />
        <link rel="canonical" href="https://due-sphere-limited.vercel.app/newsletter" />
      </Head>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>DueSphere Insights</h1>
          <p className={styles.subtitle}>
            Subscribe to industry trends, audit best practices, and compliance updates curated for security and audit professionals.
          </p>

        <div className={styles.benefits}>
          <h2 className={styles.benefitsTitle}>What You'll Get:</h2>
          <ul className={styles.benefitsList}>
            <li>Industry security and compliance trends</li>
            <li>Audit best practices and methodologies</li>
            <li>Regulatory updates and requirement changes</li>
            <li>Case studies and lessons learned</li>
            <li>Expert insights on emerging risks</li>
            <li>DueSphere service announcements</li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className={styles.input}
              required
              disabled={status === "loading"}
            />
            <button type="submit" className={styles.button} disabled={status === "loading"}>
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </button>
          </div>

          {status === "success" && <p className={styles.successMessage}>{message}</p>}
          {status === "error" && <p className={styles.errorMessage}>{message}</p>}
        </form>

        <p className={styles.privacy}>
          We respect your privacy. Your email will only be used for DueSphere updates. You can unsubscribe at any time.
        </p>
      </div>
    </div>
    </>
  )
}
