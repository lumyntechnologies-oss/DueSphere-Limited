"use client"

import { useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs"
import Link from "next/link"
import styles from "../dashboard.module.css"

interface DueDiligenceRequestList {
  id: string
  title: string
  diligenceType: string
  status: string
  priority: string
  requestedDate: string
  organizationName?: string
}

export default function DueDiligenceListPage() {
  const { user, isLoaded } = useUser()
  const [dues, setDues] = useState<DueDiligenceRequestList[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isLoaded || !user) return

    async function fetchDues() {
      try {
        await fetch("/api/auth/sync", { method: "POST" })
        const res = await fetch("/api/dues")
        if (res.ok) {
          const data = await res.json()
          setDues(data)
        }
      } catch (error) {
        console.error("Failed to fetch due diligence:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDues()
  }, [isLoaded, user])

  if (!isLoaded || loading) {
    return <div className={styles.loading}>Loading...</div>
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Due Diligence Requests</h1>
          <p className={styles.subtitle}>Track your background checks and organization reviews</p>
        </div>
        <Link href="/dashboard/new-due-diligence" className={styles.newAuditButton}>
          + New Request
        </Link>
      </div>

      {dues.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No due diligence requests yet.</p>
          <Link href="/dashboard/new-due-diligence" className={styles.emptyStateButton}>
            Create Due Diligence Request
          </Link>
        </div>
      ) : (
        <div className={styles.auditsTable}>
          <div className={styles.tableHeader}>
            <div className={styles.titleColumn}>Title</div>
            <div className={styles.typeColumn}>Type</div>
            <div className={styles.statusColumn}>Status</div>
            <div className={styles.priorityColumn}>Priority</div>
            <div className={styles.actionColumn}>Action</div>
          </div>
          {dues.map((due) => (
            <div key={due.id} className={styles.tableRow}>
              <div className={styles.titleColumn}>
                <Link href={`/dashboard/due-diligence/${due.id}`} className={styles.auditLink}>
                  {due.title}
                </Link>
              </div>
              <div className={styles.typeColumn}>
                <span className={styles.badge}>{due.diligenceType}</span>
                {due.organizationName && (
                  <span className={styles.orgName}>{due.organizationName}</span>
                )}
              </div>
              <div className={styles.statusColumn}>
                <span className={`${styles.statusBadge} ${styles[`status-${due.status}`]}`}>
                  {due.status}
                </span>
              </div>
              <div className={styles.priorityColumn}>
                <span className={`${styles.priorityBadge} ${styles[`priority-${due.priority}`]}`}>
                  {due.priority}
                </span>
              </div>
              <div className={styles.actionColumn}>
                <Link href={`/dashboard/due-diligence/${due.id}`} className={styles.viewButton}>
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
