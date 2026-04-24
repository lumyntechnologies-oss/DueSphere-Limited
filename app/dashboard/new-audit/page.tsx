"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import styles from "./new-audit.module.css"

export default function NewAuditPage() {
  const router = useRouter()
  const { isLoaded } = useUser()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    serviceType: "security",
    priority: "medium",
    budget: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Validate required fields
      if (!formData.title || !formData.description) {
        setError("Please fill in all required fields")
        setLoading(false)
        return
      }

      const response = await fetch("/api/audits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          serviceType: formData.serviceType,
          priority: formData.priority,
          budget: formData.budget ? parseFloat(formData.budget) : null,
        }),
      })

      if (response.ok) {
        const audit = await response.json()
        router.push(`/dashboard/audits/${audit.id}`)
      } else {
        setError("Failed to create audit request. Please try again.")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (!isLoaded) {
    return <div className={styles.loading}>Loading...</div>
  }

  return (
    <div className={styles.newAudit}>
      <div className={styles.header}>
        <h1 className={styles.title}>Request New Audit</h1>
        <p className={styles.subtitle}>Provide details about the audit you need</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        {error && <div className={styles.errorMessage}>{error}</div>}

        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.label}>
            Audit Title <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Q1 2024 Security Audit"
            className={styles.input}
            disabled={loading}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="serviceType" className={styles.label}>
            Service Type <span className={styles.required}>*</span>
          </label>
          <select
            id="serviceType"
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
            className={styles.select}
            disabled={loading}
          >
            <option value="security">Security Audit</option>
            <option value="compliance">Compliance Audit</option>
            <option value="performance">Performance Audit</option>
            <option value="code-quality">Code Quality Audit</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.label}>
            Description <span className={styles.required}>*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Provide detailed information about what you want audited..."
            className={styles.textarea}
            rows={6}
            disabled={loading}
          />
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="priority" className={styles.label}>
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className={styles.select}
              disabled={loading}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="budget" className={styles.label}>
              Budget (Optional)
            </label>
            <input
              type="number"
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              placeholder="Enter budget amount"
              className={styles.input}
              step="100"
              min="0"
              disabled={loading}
            />
          </div>
        </div>

        <div className={styles.actions}>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Audit Request"}
          </button>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={() => router.back()}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
