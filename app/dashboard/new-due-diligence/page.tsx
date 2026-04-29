"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import styles from "../new-audit/new-audit.module.css" // Reuse audit form styles

export default function NewDueDiligencePage() {
  const router = useRouter()
  const { isLoaded } = useUser()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    diligenceType: "organization",
    priority: "medium",
    organizationName: "",
    kraPin: "",
    businessPermit: "",
    directorCount: "",
    budget: "",
    documents: [] as string[],
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
      if (!formData.title || !formData.description || !formData.diligenceType) {
        setError("Please fill in all required fields")
        setLoading(false)
        return
      }

      const response = await fetch("/api/dues", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          diligenceType: formData.diligenceType,
          priority: formData.priority,
          organizationName: formData.organizationName || null,
          kraPin: formData.kraPin || null,
          businessPermit: formData.businessPermit || null,
          directorCount: formData.directorCount ? parseInt(formData.directorCount) : null,
          budget: formData.budget ? parseFloat(formData.budget) : null,
          documents: formData.documents,
        }),
      })

      if (response.ok) {
        const dueRequest = await response.json()
        router.push(`/dashboard/due-diligence/${dueRequest.id}`)
      } else {
        setError("Failed to create due diligence request. Please try again.")
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
        <h1 className={styles.title}>Request Due Diligence</h1>
        <p className={styles.subtitle}>Start due diligence for organization or new hire</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        {error && <div className={styles.errorMessage}>{error}</div>}

        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.label}>
            Request Title <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Due Diligence for ABC Corp"
            className={styles.input}
            disabled={loading}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="diligenceType" className={styles.label}>
            Type <span className={styles.required}>*</span>
          </label>
          <select
            id="diligenceType"
            name="diligenceType"
            value={formData.diligenceType}
            onChange={handleChange}
            className={styles.select}
            disabled={loading}
          >
            <option value="organization">Organization</option>
            <option value="new-hire">New Hire</option>
          </select>
        </div>

        {formData.diligenceType === "organization" && (
          <>
            <div className={styles.formGroup}>
              <label htmlFor="organizationName" className={styles.label}>
                Organization Name
              </label>
              <input
                type="text"
                id="organizationName"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleChange}
                placeholder="Full legal name of organization"
                className={styles.input}
                disabled={loading}
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="kraPin" className={styles.label}>KRA PIN</label>
                <input
                  type="text"
                  id="kraPin"
                  name="kraPin"
                  value={formData.kraPin}
                  onChange={handleChange}
                  placeholder="P051XXXXXXX"
                  className={styles.input}
                  disabled={loading}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="directorCount" className={styles.label}>Director Count</label>
                <input
                  type="number"
                  id="directorCount"
                  name="directorCount"
                  value={formData.directorCount}
                  onChange={handleChange}
                  placeholder="e.g., 3"
                  className={styles.input}
                  min="1"
                  disabled={loading}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="businessPermit" className={styles.label}>Business Permit #</label>
              <input
                type="text"
                id="businessPermit"
                name="businessPermit"
                value={formData.businessPermit}
                onChange={handleChange}
                placeholder="Permit number"
                className={styles.input}
                disabled={loading}
              />
            </div>
          </>
        )}

        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.label}>
            Description <span className={styles.required}>*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the scope, specific concerns, or context..."
            className={styles.textarea}
            rows={6}
            disabled={loading}
          />
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="priority" className={styles.label}>Priority</label>
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
            <label htmlFor="budget" className={styles.label}>Budget (Optional)</label>
            <input
              type="number"
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              placeholder="KES amount"
              className={styles.input}
              step="1000"
              min="0"
              disabled={loading}
            />
          </div>
        </div>

        <div className={styles.actions}>
          <button type="submit" className={styles.submitButton} disabled={loading}>
            {loading ? "Creating..." : "Create Due Diligence Request"}
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
