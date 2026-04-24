"use client"

import { useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs"
import Link from "next/link"
import styles from "./dashboard.module.css"

interface AuditRequest {
  id: string
  title: string
  serviceType: string
  status: string
  priority: string
  requestedDate: string
}

interface Stats {
  totalAudits: number
  pendingAudits: number
  completedAudits: number
  criticalFindings: number
}

export default function DashboardPage() {
  const { user, isLoaded } = useUser()
  const [audits, setAudits] = useState<AuditRequest[]>([])
  const [stats, setStats] = useState<Stats>({
    totalAudits: 0,
    pendingAudits: 0,
    completedAudits: 0,
    criticalFindings: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isLoaded || !user) return

    async function fetchData() {
      try {
        // First sync user
        await fetch("/api/auth/sync", { method: "POST" })

        // Then fetch audits
        const auditsRes = await fetch("/api/audits")
        if (auditsRes.ok) {
          const auditsData = await auditsRes.json()
          setAudits(auditsData)

          // Calculate stats
          const pending = auditsData.filter((a: AuditRequest) => a.status === "pending").length
          const completed = auditsData.filter((a: AuditRequest) => a.status === "completed").length
          const critical = auditsData.reduce((sum: number, a: AuditRequest) => sum + (a.serviceType === "security" ? 1 : 0), 0)

          setStats({
            totalAudits: auditsData.length,
            pendingAudits: pending,
            completedAudits: completed,
            criticalFindings: critical,
          })
        }
      } catch (error) {
        console.error("Failed to fetch data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [isLoaded, user])

  if (!isLoaded || !user) {
    return <div className={styles.loading}>Loading...</div>
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Welcome, {user.firstName}!</h1>
          <p className={styles.subtitle}>Manage your audit requests and view reports</p>
        </div>
        <Link href="/dashboard/new-audit" className={styles.newAuditButton}>
          + New Audit Request
        </Link>
      </div>

      {/* Stats Section */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{loading ? "..." : stats.totalAudits}</div>
          <div className={styles.statLabel}>Total Audits</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{loading ? "..." : stats.pendingAudits}</div>
          <div className={styles.statLabel}>Pending</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{loading ? "..." : stats.completedAudits}</div>
          <div className={styles.statLabel}>Completed</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{loading ? "..." : stats.criticalFindings}</div>
          <div className={styles.statLabel}>Critical</div>
        </div>
      </div>

      {/* Audits List */}
      <div className={styles.auditsSection}>
        <h2 className={styles.sectionTitle}>Your Audit Requests</h2>
        {loading ? (
          <div className={styles.emptyState}>Loading audits...</div>
        ) : audits.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No audits yet. Start by creating your first audit request.</p>
            <Link href="/dashboard/new-audit" className={styles.emptyStateButton}>
              Create Audit Request
            </Link>
          </div>
        ) : (
          <div className={styles.auditsTable}>
            <div className={styles.tableHeader}>
              <div className={styles.titleColumn}>Title</div>
              <div className={styles.typeColumn}>Service Type</div>
              <div className={styles.statusColumn}>Status</div>
              <div className={styles.priorityColumn}>Priority</div>
              <div className={styles.actionColumn}>Action</div>
            </div>
            {audits.map((audit) => (
              <div key={audit.id} className={styles.tableRow}>
                <div className={styles.titleColumn}>
                  <Link href={`/dashboard/audits/${audit.id}`} className={styles.auditLink}>
                    {audit.title}
                  </Link>
                </div>
                <div className={styles.typeColumn}>
                  <span className={styles.badge}>{audit.serviceType}</span>
                </div>
                <div className={styles.statusColumn}>
                  <span className={`${styles.statusBadge} ${styles[`status-${audit.status}`]}`}>
                    {audit.status}
                  </span>
                </div>
                <div className={styles.priorityColumn}>
                  <span className={`${styles.priorityBadge} ${styles[`priority-${audit.priority}`]}`}>
                    {audit.priority}
                  </span>
                </div>
                <div className={styles.actionColumn}>
                  <Link href={`/dashboard/audits/${audit.id}`} className={styles.viewButton}>
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
