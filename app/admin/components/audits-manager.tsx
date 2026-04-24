"use client"

import { useState, useEffect } from "react"
import styles from "./manager.module.css"

interface AuditRequest {
  id: string
  userId: string
  title: string
  description: string
  serviceType: string
  status: string
  priority: string
  requestedDate: string
  startDate?: string
  completedDate?: string
  budget?: number
  createdAt: string
  updatedAt: string
}

export default function AuditsManager() {
  const [audits, setAudits] = useState<AuditRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedAudit, setSelectedAudit] = useState<AuditRequest | null>(null)
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    fetchAudits()
  }, [])

  const fetchAudits = async () => {
    try {
      const response = await fetch("/api/audits/all")
      const data = await response.json()
      if (Array.isArray(data)) {
        setAudits(data)
      }
    } catch (error) {
      console.error("Error fetching audits:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteAudit = async (id: string) => {
    if (!confirm("Are you sure you want to delete this audit request?")) return

    try {
      const response = await fetch(`/api/audits/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setAudits(audits.filter((audit) => audit.id !== id))
        if (selectedAudit?.id === id) {
          setSelectedAudit(null)
          setEditMode(false)
        }
      } else {
        alert("Failed to delete audit")
      }
    } catch (error) {
      console.error("Delete audit error:", error)
      alert("Failed to delete audit")
    }
  }

  const handleUpdateAudit = async () => {
    if (!selectedAudit) return

    try {
      const response = await fetch(`/api/audits/${selectedAudit.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedAudit),
      })

      if (response.ok) {
        const data = await response.json()
        setAudits(audits.map((audit) => (audit.id === data.id ? data : audit)))
        setSelectedAudit(null)
        setEditMode(false)
      } else {
        alert("Failed to update audit")
      }
    } catch (error) {
      console.error("Update audit error:", error)
      alert("Failed to update audit")
    }
  }

  const handleCancel = () => {
    setSelectedAudit(null)
    setEditMode(false)
  }

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "pending":
        return styles.statusPending
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
        <h1 className={styles.title}>Audit Requests</h1>
        <p className={styles.subtitle}>Manage client audit requests</p>
      </div>

      <div className={styles.list}>
        {audits.length === 0 ? (
          <p className={styles.empty}>No audit requests yet.</p>
        ) : (
          audits.map((audit) => (
            <div
              key={audit.id}
              className={styles.card}
              onClick={() => !editMode && setSelectedAudit({ ...audit })}
            >
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>{audit.title}</h3>
                  <div className={styles.cardBadges}>
                    <span className={`${styles.cardCategory} ${getStatusStyle(audit.status)}`}>
                      {audit.status}
                    </span>
                    <span className={`${styles.cardCategory} ${getPriorityStyle(audit.priority)}`}>
                      {audit.priority}
                    </span>
                  </div>
                </div>
                <p className={styles.cardExcerpt}>
                  {audit.description.substring(0, 120)}
                  {audit.description.length > 120 ? "..." : ""}
                </p>
                <div className={styles.cardMeta}>
                  <span>{audit.serviceType}</span>
                  {audit.budget && <span>Budget: ${audit.budget.toLocaleString()}</span>}
                  <span className={styles.cardDate}>
                    {new Date(audit.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {selectedAudit && (
        <div className={styles.modal} onClick={() => handleCancel()}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={handleCancel}>
              ✕
            </button>
            <h2 className={styles.modalTitle}>
              {editMode ? "Edit Audit Request" : "Audit Request Details"}
            </h2>

            {editMode ? (
              <form
                className={styles.form}
                onSubmit={(e) => {
                  e.preventDefault()
                  handleUpdateAudit()
                }}
              >
                <div className={styles.formGroup}>
                  <label className={styles.label}>Title</label>
                  <input
                    type="text"
                    className={styles.input}
                    value={selectedAudit.title}
                    onChange={(e) =>
                      setSelectedAudit((prev) => (prev ? { ...prev, title: e.target.value } : null))
                    }
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Description</label>
                  <textarea
                    className={styles.textarea}
                    value={selectedAudit.description}
                    onChange={(e) =>
                      setSelectedAudit((prev) =>
                        prev ? { ...prev, description: e.target.value } : null
                      )
                    }
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Service Type</label>
                  <select
                    className={styles.select}
                    value={selectedAudit.serviceType}
                    onChange={(e) =>
                      setSelectedAudit((prev) =>
                        prev ? { ...prev, serviceType: e.target.value } : null
                      )
                    }
                  >
                    <option value="security">Security Audit</option>
                    <option value="compliance">Compliance Audit</option>
                    <option value="performance">Performance Audit</option>
                    <option value="code-quality">Code Quality Audit</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Status</label>
                  <select
                    className={styles.select}
                    value={selectedAudit.status}
                    onChange={(e) =>
                      setSelectedAudit((prev) =>
                        prev ? { ...prev, status: e.target.value } : null
                      )
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Priority</label>
                  <select
                    className={styles.select}
                    value={selectedAudit.priority}
                    onChange={(e) =>
                      setSelectedAudit((prev) =>
                        prev ? { ...prev, priority: e.target.value } : null
                      )
                    }
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Budget</label>
                  <input
                    type="number"
                    className={styles.input}
                    value={selectedAudit.budget || ""}
                    onChange={(e) =>
                      setSelectedAudit((prev) =>
                        prev ? { ...prev, budget: e.target.value ? parseFloat(e.target.value) : undefined } : null
                      )
                    }
                  />
                </div>

                <div className={styles.formActions}>
                  <button type="submit" className={styles.saveBtn}>
                    Update Audit
                  </button>
                  <button type="button" className={styles.cancelBtn} onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className={styles.serviceDetail}>
                  <h3>{selectedAudit.title}</h3>
                  <p>{selectedAudit.description}</p>

                  <div className={styles.modalMeta}>
                    <p>
                      <strong>Service Type:</strong> {selectedAudit.serviceType}
                    </p>
                    <p>
                      <strong>Status:</strong>{" "}
                      <span className={`${styles.statusBadge} ${getStatusStyle(selectedAudit.status)}`}>
                        {selectedAudit.status}
                      </span>
                    </p>
                    <p>
                      <strong>Priority:</strong>{" "}
                      <span className={`${styles.priorityBadge} ${getPriorityStyle(selectedAudit.priority)}`}>
                        {selectedAudit.priority}
                      </span>
                    </p>
                    {selectedAudit.budget && (
                      <p>
                        <strong>Budget:</strong> ${selectedAudit.budget.toLocaleString()}
                      </p>
                    )}
                    <p>
                      <strong>Requested:</strong>{" "}
                      {new Date(selectedAudit.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className={styles.formActions}>
                  <button className={styles.editBtn} onClick={() => setEditMode(true)}>
                    Edit Audit
                  </button>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDeleteAudit(selectedAudit.id)}
                  >
                    Delete Audit
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

