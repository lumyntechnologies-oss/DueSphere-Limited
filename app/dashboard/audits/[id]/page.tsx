"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import Link from "next/link"
import styles from "./audit-detail.module.css"

interface Finding {
  id: string
  title: string
  severity: string
  category: string
  description: string
  recommendation?: string
  status: string
}

interface AuditReport {
  id: string
  executiveSummary?: string
  overallScore?: number
  riskLevel?: string
}

interface AuditRequest {
  id: string
  title: string
  description: string
  serviceType: string
  status: string
  priority: string
  requestedDate: string
  startDate?: string
  completedDate?: string
  budget?: number
  auditReport?: AuditReport
  findings: Finding[]
}

export default function AuditDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { isLoaded } = useUser()
  const [audit, setAudit] = useState<AuditRequest | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!isLoaded) return

    async function fetchAudit() {
      try {
        const response = await fetch(`/api/audits/${params.id}`)
        if (response.ok) {
          const data = await response.json()
          setAudit(data)
        } else if (response.status === 404) {
          setError("Audit not found")
        } else {
          setError("Failed to load audit")
        }
      } catch (err) {
        setError("An error occurred while loading the audit")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchAudit()
  }, [isLoaded, params.id])

  if (!isLoaded || loading) {
    return <div className={styles.loading}>Loading audit details...</div>
  }

  if (error || !audit) {
    return (
      <div className={styles.error}>
        <p>{error || "Audit not found"}</p>
        <Link href="/dashboard" className={styles.backButton}>
          Back to Dashboard
        </Link>
      </div>
    )
  }

  return (
    <div className={styles.auditDetail}>
      <Link href="/dashboard" className={styles.backLink}>
        ← Back to Dashboard
      </Link>

      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>{audit.title}</h1>
          <div className={styles.badges}>
            <span className={styles.badge}>{audit.serviceType}</span>
            <span className={`${styles.statusBadge} ${styles[`status-${audit.status}`]}`}>
              {audit.status}
            </span>
            <span className={`${styles.priorityBadge} ${styles[`priority-${audit.priority}`]}`}>
              {audit.priority}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.contentGrid}>
        {/* Details Section */}
        <div className={styles.detailsSection}>
          <h2 className={styles.sectionTitle}>Audit Details</h2>
          <div className={styles.detailsCard}>
            <div className={styles.detailRow}>
              <span className={styles.label}>Description</span>
              <p className={styles.value}>{audit.description}</p>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.label}>Service Type</span>
              <span className={styles.value}>{audit.serviceType}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.label}>Status</span>
              <span className={styles.value}>{audit.status}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.label}>Priority</span>
              <span className={styles.value}>{audit.priority}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.label}>Requested Date</span>
              <span className={styles.value}>{new Date(audit.requestedDate).toLocaleDateString()}</span>
            </div>
            {audit.budget && (
              <div className={styles.detailRow}>
                <span className={styles.label}>Budget</span>
                <span className={styles.value}>${audit.budget.toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>

        {/* Report Section */}
        {audit.auditReport && (
          <div className={styles.reportSection}>
            <h2 className={styles.sectionTitle}>Audit Report</h2>
            <div className={styles.reportCard}>
              {audit.auditReport.overallScore !== undefined && (
                <div className={styles.scoreSection}>
                  <div className={styles.scoreDisplay}>
                    <div className={styles.scoreCircle}>
                      <div className={styles.scoreValue}>{audit.auditReport.overallScore}</div>
                      <div className={styles.scoreLabel}>Score</div>
                    </div>
                  </div>
                  {audit.auditReport.riskLevel && (
                    <div className={styles.riskLevel}>Risk Level: {audit.auditReport.riskLevel}</div>
                  )}
                </div>
              )}
              {audit.auditReport.executiveSummary && (
                <div className={styles.summary}>
                  <h3>Executive Summary</h3>
                  <p>{audit.auditReport.executiveSummary}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Findings Section */}
      {audit.findings && audit.findings.length > 0 && (
        <div className={styles.findingsSection}>
          <h2 className={styles.sectionTitle}>Findings ({audit.findings.length})</h2>
          <div className={styles.findingsList}>
            {audit.findings.map((finding) => (
              <div key={finding.id} className={styles.findingCard}>
                <div className={styles.findingHeader}>
                  <h3 className={styles.findingTitle}>{finding.title}</h3>
                  <span className={`${styles.findingSeverity} ${styles[`severity-${finding.severity}`]}`}>
                    {finding.severity}
                  </span>
                </div>
                <div className={styles.findingBody}>
                  <p className={styles.findingDescription}>{finding.description}</p>
                  {finding.recommendation && (
                    <div className={styles.recommendation}>
                      <strong>Recommendation:</strong> {finding.recommendation}
                    </div>
                  )}
                </div>
                <div className={styles.findingFooter}>
                  <span className={styles.category}>{finding.category}</span>
                  <span className={`${styles.findingStatus} ${styles[`fstatus-${finding.status}`]}`}>
                    {finding.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!audit.auditReport && audit.status !== "completed" && (
        <div className={styles.emptyReport}>
          <p>Report will be available once the audit is completed.</p>
        </div>
      )}
    </div>
  )
}
