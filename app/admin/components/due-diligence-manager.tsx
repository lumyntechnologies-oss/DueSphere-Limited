"use client"

import { useState, useEffect } from "react"
import styles from "./manager.module.css"

interface DueDiligenceRequest {
  id: string
  userId: string
  title: string
  description: string
  diligenceType: string
  status: string
  priority: string
  organizationName?: string
  kraPin?: string
  phase: number
  requestedDate: string
  budget?: number
  createdAt: string
  updatedAt: string
  user: {
    id: string
    name: string
    email: string
  }
}

export default function DueDiligenceManager() {
  const [dues, setDues] = useState<DueDiligenceRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedDue, setSelectedDue] = useState<DueDiligenceRequest | null>(null)
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    fetchDues()
  }, [])

  const fetchDues = async () => {
    try {
      const response = await fetch("/api/dues/all")
      const data = await response.json()
      if (Array.isArray(data)) {
        setDues(data)
      }
    } catch (error) {
      console.error("Error fetching due diligence:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteDue = async (id: string) => {
    if (!confirm("Are you sure you want to delete this due diligence request?")) return

    try {
      const response = await fetch(`/api/dues/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setDues(dues.filter((due) => due.id !== id))
        if (selectedDue?.id === id) {
          setSelectedDue(null)
          setEditMode(false)
        }
      } else {
        alert("Failed to delete due diligence")
      }
    } catch (error) {
      console.error("Delete due diligence error:", error)
      alert("Failed to delete due diligence")
    }
  }

  const handleUpdateDue = async () => {
    if (!selectedDue) return

    try {
      const response = await fetch(`/api/dues/${selectedDue.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedDue),
      })

      if (response.ok) {
        const data = await response.json()
        setDues(dues.map((due) => (due.id === data.id ? data : due)))
        setSelectedDue(null)
        setEditMode(false)
      } else {
        alert("Failed to update due diligence")
      }
    } catch (error) {
      console.error("Update due diligence error:", error)
      alert("Failed to update due diligence")
    }
  }

  const handleCancel = () => {
    setSelectedDue(null)
    setEditMode(false)
  }

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "pending":
        return styles.statusPending
      case "document-review":
      case "in-progress":
        return styles.statusInProgress
      case "completed":
        return styles.statusCompleted
      case "cancelled":
        return styles.statusCancelled
      default:
        return ""
    }
  }

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case "low":
        return styles.priorityLow
      case "medium":
        return styles.priorityMedium
      case "high":
        return styles.priorityHigh
      default:
        return ""
    }
  }

  if (loading) {
    return <div className={styles.loading}>Loading...</div>
  }

  return (
    <div className={styles.manager}>
      <div className={styles.header}>
        <h1 className={styles.title}>Due Diligence Requests</h1>
        <p className={styles.subtitle}>Manage client background checks and organization reviews</p>
      </div>

      <div className={styles.list}>
        {dues.length === 0 ? (
          <p className={styles.empty}>No due diligence requests yet.</p>
        ) : (
          dues.map((due) => (
            <div
              key={due.id}
              className={styles.card}
              onClick={() => !editMode && setSelectedDue({ ...due })}
            >
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>{due.title}</h3>
                  <div className={styles.cardBadges}>
                    <span className={`${styles.cardCategory} ${getStatusStyle(due.status)}`}>
                      {due.status.replace(/-/g, ' ')}
                    </span>
                    <span className={`${styles.cardCategory} ${getPriorityStyle(due.priority)}`}>
                      {due.priority}
                    </span>
                  </div>
                </div>
                <p className={styles.cardExcerpt}>
                  {due.description.substring(0, 120)} {due.organizationName && `| ${due.organizationName}`}
                  {due.description.length > 120 ? "..." : ""}
                </p>
                <div className={styles.cardMeta}>
                  <span>{due.diligenceType} - Phase {due.phase}</span>
                  {due.kraPin && <span>KRA: {due.kraPin}</span>}
                  {due.budget && <span>Budget: KES {due.budget.toLocaleString()}</span>}
                  <span className={styles.cardDate}>
                    {new Date(due.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {selectedDue && (
        <div className={styles.modal} onClick={handleCancel}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={handleCancel}>
              ✕
            </button>
            <h2 className={styles.modalTitle}>
              {editMode ? "Edit Due Diligence Request" : "Due Diligence Details"}
            </h2>

            {editMode ? (
              <form
                className={styles.form}
                onSubmit={(e) => {
                  e.preventDefault()
                  handleUpdateDue()
                }}
              >
                <div className={styles.formGroup}>
                  <label className={styles.label}>Title</label>
                  <input
                    type="text"
                    className={styles.input}
                    value={selectedDue.title}
                    onChange={(e) =>
                      setSelectedDue((prev) => (prev ? { ...prev, title: e.target.value } : null))
                    }
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Description</label>
                  <textarea
                    className={styles.textarea}
                    value={selectedDue.description}
                    onChange={(e) =>
                      setSelectedDue((prev) => prev ? { ...prev, description: e.target.value } : null)
                    }
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Type</label>
                  <select
                    className={styles.select}
                    value={selectedDue.diligenceType}
                    onChange={(e) =>
                      setSelectedDue((prev) => prev ? { ...prev, diligenceType: e.target.value } : null)
                    }
                  >
                    <option value="organization">Organization</option>
                    <option value="new-hire">New Hire</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Status</label>
                  <select
                    className={styles.select}
                    value={selectedDue.status}
                    onChange={(e) =>
                      setSelectedDue((prev) => prev ? { ...prev, status: e.target.value } : null)
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="document-review">Document Review</option>
                    <option value="background-check">Background Check</option>
                    <option value="stakeholder">Stakeholder Engagement</option>
                    <option value="analysis">Analysis & Reporting</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Priority</label>
                    <select
                      className={styles.select}
                      value={selectedDue.priority}
                      onChange={(e) =>
                        setSelectedDue((prev) => prev ? { ...prev, priority: e.target.value } : null)
                      }
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Phase</label>
                    <input
                      type="number"
                      className={styles.input}
                      value={selectedDue.phase}
                      onChange={(e) =>
                        setSelectedDue((prev) => prev ? { ...prev, phase: parseInt(e.target.value) } : null)
                      }
                      min="1"
                      max="5"
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Budget</label>
                  <input
                    type="number"
                    className={styles.input}
                    value={selectedDue.budget || ""}
                    onChange={(e) =>
                      setSelectedDue((prev) =>
                        prev ? { ...prev, budget: e.target.value ? parseFloat(e.target.value) : undefined } : null
                      )
                    }
                  />
                </div>

                <div className={styles.formActions}>
                  <button type="submit" className={styles.saveBtn}>
                    Update Request
                  </button>
                  <button type="button" className={styles.cancelBtn} onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className={styles.serviceDetail}>
                  <h3>{selectedDue.title}</h3>
                  <p>{selectedDue.description}</p>

                  <div className={styles.modalMeta}>
                    <p><strong>Type:</strong> {selectedDue.diligenceType}</p>
                    {selectedDue.organizationName && <p><strong>Org:</strong> {selectedDue.organizationName}</p>}
                    {selectedDue.kraPin && <p><strong>KRA:</strong> {selectedDue.kraPin}</p>}
                    <p><strong>Status:</strong> <span className={`${styles.statusBadge} ${getStatusStyle(selectedDue.status)}`}>
                      {selectedDue.status}
                    </span></p>
                    <p><strong>Phase:</strong> {selectedDue.phase}/5</p>
                    <p><strong>Priority:</strong> <span className={`${styles.priorityBadge} ${getPriorityStyle(selectedDue.priority)}`}>
                      {selectedDue.priority}
                    </span></p>
                    {selectedDue.budget && <p><strong>Budget:</strong> KES {selectedDue.budget.toLocaleString()}</p>}
                    <p><strong>Requested:</strong> {new Date(selectedDue.createdAt).toLocaleString()}</p>
                    <p><strong>Client:</strong> {selectedDue.user.name} ({selectedDue.user.email})</p>
                  </div>
                </div>

                <div className={styles.formActions}>
                  <button className={styles.editBtn} onClick={() => setEditMode(true)}>
                    Edit
                  </button>
                  <button className={styles.deleteBtn} onClick={() => handleDeleteDue(selectedDue.id)}>
                    Delete
                  </button>
                  <button className={styles.cancelBtn} onClick={handleCancel}>
                    Close
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
