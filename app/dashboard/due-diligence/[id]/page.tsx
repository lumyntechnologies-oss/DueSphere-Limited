"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import Link from "next/link"
import styles from "./due-diligence-detail.module.css"

// Import types from lib/db/schema.ts
import type { DueDiligenceRequest, DueDiligenceReport, DueDiligenceFinding, DueDiligenceDocument } from "@/lib/db/schema"

export default function DueDiligenceDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { isLoaded } = useUser()
  const [dueRequest, setDueRequest] = useState<DueDiligenceRequest | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!isLoaded) return

    async function fetchDue() {
      try {
        const response = await fetch(`/api/dues/${params.id}`)
        if (response.ok) {
          const data = await response.json()
          setDueRequest(data)
        } else if (response.status === 404) {
          setError("Due diligence request not found")
        } else {
          setError("Failed to load due diligence")
        }
      } catch (err) {
        setError("An error occurred while loading the due diligence")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchDue()
  }, [isLoaded, params.id])

  if (!isLoaded || loading) {
    return <div className={styles.loading}>Loading due diligence details...</div>
  }

  if (error || !dueRequest) {
    return (
      <div className={styles.error}>
        <p>{error || "Due diligence request not found"}</p>
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
          <h1 className={styles.title}>{dueRequest.title}</h1>
          <div className={styles.badges}>
            <span className={styles.badge}>{dueRequest.diligenceType}</span>
            <span className={`${styles.statusBadge} ${styles[`status-${dueRequest.status}`]}`}>
              {dueRequest.status.replace(/-/g, ' ')}
            </span>
            <span className={`${styles.priorityBadge} ${styles[`priority-${dueRequest.priority}`]}`}>
              {dueRequest.priority}
            </span>
            {dueRequest.riskRating && (
              <span className={`${styles.badge} ${styles[`risk-${dueRequest.riskRating}`]}`}>
                Risk: {dueRequest.riskRating}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className={styles.detailsSection}>
        <h2 className={styles.sectionTitle}>Request Details</h2>
        <div className={styles.detailsCard}>
          <div className={styles.detailRow}>
            <span className={styles.label}>Description</span>
            <p className={styles.value}>{dueRequest.description}</p>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.label}>Type</span>
            <span className={styles.value}>{dueRequest.diligenceType}</span>
          </div>
          {dueRequest.organizationName && (
            <div className={styles.detailRow}>
              <span className={styles.label}>Organization</span>
              <span className={styles.value}>{dueRequest.organizationName}</span>
            </div>
          )}
          {dueRequest.kraPin && (
            <div className={styles.detailRow}>
              <span className={styles.label}>KRA PIN</span>
              <span className={styles.value}>{dueRequest.kraPin}</span>
            </div>
          )}
          <div className={styles.detailRow}>
            <span className={styles.label}>Status</span>
            <span className={styles.value}>{dueRequest.status}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.label}>Phase</span>
            <span className={styles.value}>Phase {dueRequest.phase} of 5</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.label}>Priority</span>
            <span className={styles.value}>{dueRequest.priority}</span>
          </div>
          {dueRequest.budget && (
            <div className={styles.detailRow}>
              <span className={styles.label}>Budget</span>
              <span className={styles.value}>KES {dueRequest.budget.toLocaleString()}</span>
            </div>
          )}
        </div>
      </div>

      {/* Report Section */}
      {dueRequest.diligenceReport && (
        <div className={styles.reportSection}>
          <h2 className={styles.sectionTitle}>Due Diligence Report</h2>
          <div className={styles.reportCard}>
            {dueRequest.diligenceReport.riskRating && (
              <div className={styles.scoreSection}>
                <div className={styles.riskLevel}>Overall Risk: {dueRequest.diligenceReport.riskRating.toUpperCase()}</div>
              </div>
            )}
            {dueRequest.diligenceReport.executiveSummary && (
              <div className={styles.summary}>
                <h3>Executive Summary</h3>
                <p>{dueRequest.diligenceReport.executiveSummary}</p>
              </div>
            )}
            {dueRequest.diligenceReport.recommendations && dueRequest.diligenceReport.recommendations.length > 0 && (
              <div className={styles.recommendations}>
                <h3>Recommendations</h3>
                <ul>
                  {dueRequest.diligenceReport.recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Documents Section */}
      {dueRequest.documentUploads && dueRequest.documentUploads.length > 0 && (
        <div className={styles.findingsSection}>
          <h2 className={styles.sectionTitle}>Uploaded Documents ({dueRequest.documentUploads.length})</h2>
          <div className={styles.findingsList}>
            {dueRequest.documentUploads.map((doc: DueDiligenceDocument) => (
              <div key={doc.id} className={styles.findingCard}>
                <div className={styles.findingHeader}>
                  <h3 className={styles.findingTitle}>{doc.filename}</h3>
                  <span className={styles.badge}>{doc.documentType}</span>
                  <span className={styles[`verified-${doc.verified}`] || ''}>
                    {doc.verified ? "Verified" : "Pending"}
                  </span>
                </div>
                {doc.notes && (
                  <p className={styles.findingDescription}>{doc.notes}</p>
                )}
                <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer" className={styles.downloadLink}>
                  📄 View Document
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Findings Section */}
      {dueRequest.findings && dueRequest.findings.length > 0 && (
        <div className={styles.findingsSection}>
          <h2 className={styles.sectionTitle}>Risk Findings ({dueRequest.findings.length})</h2>
          <div className={styles.findingsList}>
            {dueRequest.findings.map((finding: DueDiligenceFinding) => (
              <div key={finding.id} className={styles.findingCard}>
                <div className={styles.findingHeader}>
                  <h3 className={styles.findingTitle}>{finding.title}</h3>
                  <span className={`${styles.findingSeverity} ${styles[`severity-${finding.riskLevel}`]}`}>
                    {finding.riskLevel}
                  </span>
                </div>
                <div className={styles.findingBody}>
                  <p className={styles.findingDescription}>{finding.description}</p>
                  {finding.evidence && (
                    <div className={styles.evidence}>
                      <strong>Evidence:</strong> {finding.evidence}
                    </div>
                  )}
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

      {!dueRequest.diligenceReport && dueRequest.status !== "completed" && (
        <div className={styles.emptyReport}>
          <p>Report will be available once due diligence is completed (Phase 5).</p>
        </div>
      )}
    </div>
  )
}
